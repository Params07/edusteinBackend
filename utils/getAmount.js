const ApplyDiscount=(promocode,amount)=>{
    if(DISCOUNT_TYPES.FLAT == promocode.discount_type){
      return amount - promocode.discount_value ;
    }else if(DISCOUNT_TYPES.PERCENTAGE == promocode.discount_type){
     return amount - amount*promocode.discount_value/100;
    }else{
     let discount = amount*promocode.discount_value/100;
     if(discount<promocode.max_discount){
         return amount -discount;
     }
     return amount-promocode.max_discount;
    }
 }

 const DISCOUNT_TYPES = {
    FLAT: 'flat',
    PERCENTAGE: 'percentage',
    UPTO_PERCENTAGE: 'upto_and_percentage'
  };
  const PROMO_TYPES = {
    PARTICULAR_BOOTCAMP: 'for_particular_bootcamp',
    ANYONE: 'anyone',
    PARTICULAR_USERS: 'valid_for_particular_users',
    PARTICULAR_USER_AND_BOOTCAMP:'valid_for_bootcamp_and_user'
  };

module.exports = {ApplyDiscount,DISCOUNT_TYPES,PROMO_TYPES};