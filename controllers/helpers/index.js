const validationProuductData = (amount, category, name, price) => {
   if(amount == undefined || category == undefined || name == undefined || price == undefined){
      return false;
   }
   else if(amount.length <= 0 || category.length <= 0 || name.length <= 0 || price.length <= 0){
      return false;
   }
   else{
      return true;
   }
}

const validationEmployeesData = (name, password, isADM) => {
   if(name == undefined || password == undefined || isADM == undefined){
      return false;
   }
   else if(name.length <= 0 || password.length <= 0 || isADM.length == 0){
      return false;
   }
   else{
      return true;
   }
}
   
module.exports = {
   validationProuductData, 
   validationEmployeesData
}