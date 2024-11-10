const { isNumber } = require('razorpay/dist/utils/razorpay-utils');
const { pool } = require('../db');
const validator = require('validator');

const getPromocodes = async(email,bootcampId,promocodeId)=>{
    console.log(bootcampId,email,typeof(promocodeId),promocodeId == null);
    if(promocodeId == null || promocodeId == undefined){
        promocodeId = -1;
    }
    if (bootcampId == null || bootcampId == undefined || !isNumber(bootcampId) || bootcampId ==0 || email == null || !validator.isEmail(email) ) {
       
      return { error: "invalid fields" }
    }

    try {
        const result = await pool.query(`SELECT pc.code ,pc.id,pc.discount_value,pc.max_discount,pc.discount_type
    FROM promocodes AS pc 
    WHERE ${promocodeId != -1 ?`pc.id = ${promocodeId} AND `:''} pc.is_active = true  AND
        (SELECT COUNT(id) 
        FROM registrations 
        WHERE   
        email = $1
          AND promocode_id = pc.id) = 0
        AND (
            CASE 
                WHEN pc.promo_type = 'anyone' THEN TRUE
                WHEN pc.promo_type = 'for_particular_bootcamp' THEN 
                    (SELECT COUNT(id) 
                    FROM promobootcamps 
                    WHERE promo_code_id = pc.id 
                      AND bootcamp_id = $2) != 0
                WHEN pc.promo_type = 'valid_for_particular_users' THEN 
                    (SELECT COUNT(id) 
                    FROM promousers 
                    WHERE promo_code_id = pc.id 
                      AND user_email = $3) != 0
                WHEN pc.promo_type = 'valid_for_bootcamp_and_user' THEN 
                    (SELECT COUNT(id) 
                    FROM promobootcamps 
                    WHERE promo_code_id = pc.id 
                      AND bootcamp_id = $4) != 0 
                    AND
                    (SELECT COUNT(id) 
                    FROM promousers 
                    WHERE promo_code_id = pc.id 
                      AND user_email = $5) != 0
                ELSE FALSE
            END
        );
  
    `,[email,bootcampId,email,bootcampId,email]);
    
   
      return result.rows;
      } catch (error) {
        console.error(error,'error occured');
        return {erorr:error}
      }
    }

    

module.exports = getPromocodes;