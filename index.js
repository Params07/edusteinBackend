  const express = require('express');
  const cors = require('cors');
  const bodyParser = require('body-parser');
  const path = require('path');
  const session = require('express-session');
  const MemoryStore = require('memorystore')(session);
  const multer = require('multer');
  const helmet = require('helmet');
  const xssClean = require('xss-clean');
  const rateLimit = require('express-rate-limit');
  const { body, validationResult } = require('express-validator');
  const winston = require('winston');
  require('dotenv').config();
  const {pool} = require('./db.js');
  const { sendEmail } = require('./emailsender.js');
  const {createTable} = require('./utils/createingTables.js')
  const jobAssigner = require('./schedular/jobs.js')
  const bootcampStatus = require('./schedular/bootcampStatus.js');
const  isValid  = require('./isValidUser.js');

 
  const app = express();
  const port = process.env.PORT || 5000;


  if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
      origin: ['http://localhost:3001', 'https://edustein007.netlify.app'],
      credentials: true,
    };
    app.use(cors(corsOptions));
  };
  



  
  app.use(express.static(path.join(__dirname,"build")))
  app.set('trust proxy', 1);

  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(xssClean());
  app.use(session({
    cookie: {
      maxAge: 86400000, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: process.env.NODE_ENV ==='production'?'None': 'lax', 
      httpOnly: true
    },
    store: new MemoryStore({
      checkPeriod: 86400000  
    }),
    resave: false,
    saveUninitialized: true, 
    secret: process.env.SESSION_SECRET || 'default_secret',
    name: 'sessionId',
  }));

  // Logging Configuration
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  // job assigning for bootcamp status 

  jobAssigner(5000,'once',bootcampStatus)

  // Rate Limiting for /login
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: 'Too many login attempts, please try again later.',
  });

  // File Upload Configuration with Security
  const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|pdf|docx/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      if (mimetype && extname) {
        return cb(null, true);
      }
      cb(new Error('Error: File type not allowed'));
    },
  });

   createTable();

  function authenticateAdmin(req, res, next) {
    
    if ( req.session.user === process.env.USER_NAME ) {
      
      return next();
    }
    return res.status(401).send({ message: 'Unauthorized' });
  }

  // Routes localhost:3000/bootcamps
  try {
    app.use('/bootcamps', authenticateAdmin, require('./routes/bootCampRoutes.js'));
  app.use('/data', require('./routes/data.js'));
  app.use('/registrations', authenticateAdmin, require('./routes/registrationRoutes.js'));
  app.use("/payment", require("./routes/payment.js"));
  app.use('/createExcel',authenticateAdmin, require('./creatingExcel.js'));
  app.use('/transaction', authenticateAdmin, require('./routes/transactionData.js'));
  app.use('/dashboard', authenticateAdmin, require('./routes/dashboardData.js'));
  app.use('/refundInitiator',authenticateAdmin,require('./routes/refundInitiator.js'));
  app.use('/promocode',authenticateAdmin,require('./routes/promocodeRoutes.js'));
  } catch (error) {
     console.log(error)
  }
  

app.post('/login',loginLimiter, 
  body('username').isString().trim().notEmpty(),
  body('password').isString().trim().notEmpty(),
  async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
    
      const isPasswordValid = await isValid(username, password);
      
      if (isPasswordValid && process.env.USER_NAME === username) {
       
        req.session.user = username;
        return res.status(200).send();
      }

      
      return res.status(401).send('Invalid credentials');
      
    } catch (error) {
      
      console.error('Login error:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
);

     
  
  
  app.get('/admin', authenticateAdmin, (req, res) => {
    return res.status(200).send({ message: 'Authorized' });
  });

  app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        logger.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.clearCookie('sessionId'); 
      res.json({ message: 'Logout successful' });
    });
  });

  app.get('/nav-items', authenticateAdmin, async (req, res) => {
    try {
      const results = await pool.query('SELECT * FROM nav_items ORDER BY position');
      res.json(results.rows);
    } catch (error) {
      logger.error('Error fetching nav items:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.post('/send-email',  authenticateAdmin,upload.array('files'), async (req, res) => {
    const { subject, message, to,startDelay } = req.body;
    const files = req.files;
    if (!subject || !message || !to) {
      return res.status(400).send('Subject, message, and recipients are required');
    }
    const mailOptions = {
      to: JSON.parse(to),
      subject: subject,
      html: message,
    };
    if (files && files.length > 0) {
      mailOptions.attachments = files.map(file => ({
        filename: file.originalname,
        oldfilename:file.filename,
        path: path.join(__dirname, 'uploads', file.filename)
      }));
    }
    try {
      jobAssigner(startDelay,'once',sendEmail,mailOptions)
      
      res.status(200).send('Email sent successfully');
    } catch (error) {
      logger.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } finally {
    
    }
  });



  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }); 
  app.listen(port, () => {
    console.log(`Serv running on por ${port}`);
  });
 