const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const pool = require('./db');
const { sendEmail } = require('./emailsender');
const app = express();
const multer = require('multer')
require('dotenv').config();
const v8 = require('v8');
const port = process.env.PORT || 8000;
const upload = multer({ dest: 'uploads/' });
const corsOptions = {
  origin: 'https://66c650556eed050008c86371--clinquant-gumption-c90154.netlify.app',
  credentials: true, 
};
app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 



app.use(session({
  secret: process.env.SESSION_SECRET || 'akjdjfhdhfsjkdhfksjhfksj',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

const users = {
  admin: { password: 'password123' }
};
function authenticateAdmin(req, res, next) {
  
  if (req.session && req.session.user) {
   
    return next();
  }
  return res.status(401).send({ message: 'Unauthorized' });
}

// Routes
app.use('/data', require('./routes/data.js'));
app.use('/bootcamps', authenticateAdmin, require('./routes/bootCampRoutes'));

app.use('/registrations', authenticateAdmin, require('./routes/registrationRoutes'));
app.use("/payment", require("./routes/payment"));
app.use('/createExcel', require('./creatingExcel.js'));
app.use('/transaction',authenticateAdmin,require('./routes/transactionData'));
app.use('/dashboard',authenticateAdmin,require('./routes/dashboardData'));



app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('hshk')
  if (users[username] && users[username].password === password) {
    req.session.user = username;
    console.log(username)
    
    return res.status(200).send();
  }
  return res.status(401).send();
});
app.get('/admin',authenticateAdmin, (req, res) => {
  
    return res.status(200).send({message:'authorized'});
 
});
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); 
    res.json({ message: 'Logout successful' });
  });
});

app.get('/nav-items',authenticateAdmin, async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM nav_items ORDER BY id');
    console.log(results.rows)
    res.json(results.rows);
  } catch (error) {
    console.error('Error fetching nav items:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/send-email', authenticateAdmin, upload.array('files'), async (req, res) => {
  const { subject, message, to } = req.body;
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
      path: path.join(__dirname, 'uploads', file.filename)
    }));
  }
  try {
    await sendEmail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  } finally {
    files.forEach(file => {
      fs.unlink(path.join(__dirname, 'uploads', file.filename), err => {
        if (err) console.error(`Error deleting file ${file.filename}:`, err);
      });
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
