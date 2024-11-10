const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
require('dotenv').config();

const storedBcryptHash = process.env.PASSWORD;

const isValid = async (username, password) => {
    try {
       
        const regeneratedSHA = crypto.createHash('sha256').update(username).digest('hex');
        
        
        const combinedPassword = password + regeneratedSHA;
        
       
        const result = await bcrypt.compare(combinedPassword, storedBcryptHash);

       
        return result;
    } catch (error) {
        console.error('Error comparing password:', error);
        return false;  
    }
};

module.exports = isValid;
