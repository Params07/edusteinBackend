const crypto = require('crypto'); 
const { pool } = require('../db');

function generatePromoCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    

    const promoCode = []
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        promoCode.push(characters[randomIndex%characters.length]);
    }

    return promoCode.join('');
}

const isValidPromoCode = async (promoCode) => {
    try {
        const result = await pool.query('SELECT COUNT(id) FROM promocodes WHERE code = $1', [promoCode]);
       
        return result.rows[0].count > 0; 
    } catch (error) {
        console.log(error);
        return false; 
    }
}

const getPromoCode = async () => {
    let promoCode;
    do {
        promoCode = generatePromoCode(); 
    } while (await isValidPromoCode(promoCode)); 
    return promoCode;
}

module.exports = getPromoCode;

