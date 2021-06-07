String.prototype.trim = String.prototype.trim || function() {
   return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
 };

// BASE InputValidation Constructor
var InputValidation = function() {
  // empty
}

InputValidation.prototype.isStr = function (el) {
  if (!el) {
    throw Error('No el given! Err from isStr')
  }
  return typeof el === 'string'
}

InputValidation.prototype.returnValue = function() {
  return this.value;
}

InputValidation.prototype.isAliveAndExists = function(argum, fieldName) {
  if(!argum ||
     !this.isStr(argum) ||
     argum.trim() === '') 
    {
      throw Error('value in ' + fieldName + ' field is not good!!!')
    }
}

/*
##########################
#### Email Validation ####
##########################
*/
var EmailValidation = function(email) {
  this.isAliveAndExists(email, 'email');

  this.value = email
}

// Inheritance...
EmailValidation.prototype = Object.create(InputValidation.prototype);
// ... Inheritance

EmailValidation.prototype.validate = function() {
  
  var ema = this.value;
  
  if(!/^\w+@(\w|\d){2,}\.\w{2,4}$/i.test(ema)){
    return false;
  }
  
  return true;
}

/*
###############################
#### Email validation ends ####
###############################
*/

/*
#############################
#### Password Validation ####
#############################
*/
var PwdValidation = function(pwd) {
  this.isAliveAndExists(pwd, 'password');
  
  this.value = pwd
}

// Inheritance...
PwdValidation.prototype = Object.create(InputValidation.prototype);
// ...Inheritance

module.exports = EmailValidation;