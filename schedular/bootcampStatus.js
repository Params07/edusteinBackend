const {pool} = require('../db');

const bootcampStatus = async () => {
    try {
        const result = await pool.query('   ');
        console.log(`${result.rowCount} bootcamp(s) updated.`);
    } catch (error) {
        console.error('Error updating bootcamp status:', error);
    }
};

module.exports = bootcampStatus;
