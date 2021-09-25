String.prototype.trim = String.prototype.trim || function() {
   return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
 };

// BASE InputValidation Constructor
var InputValidation = function() { /* empty */ }

InputValidation.prototype.isStr = function (el) {
  if (!el) {
    throw Error('Fonksiyona herhangi bir argüman verilmedi! isStr fonksiyonunda karşılaşılan hata...')
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
      throw Error(fieldName + ' alanını ya boş bıraktınız ya da String veri tıpı dışında bir veri tipi girdiniz!')
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

PwdValidation.prototype.validate = function(
  floor,
  ceil, 
  isLowerCaseNeeded, 
  isUpperCaseNeeded, 
  isNumNeeded,
  isSpecialCharNeeded
  ) {
  
  if(
      typeof floor !== "number" &&
      typeof floor !== "undefined"
    ) throw Error(
      "Taban sayı limiti uygulanmasını istiyorsanız bu argüman sayı türünde olmalı; \
       eğer asgari karakter limiti koymak istemiyorsanınz bu argümanı boş bırakmalısınız\n\n\
       Taban limitsiz Ör: new PwdValidation('a.K5').validate(, 10) \n\
       Taban limiti 6 olan Ör: new PwdValidation('a.K5k6').validate(6, 10)"
       );

  if(
      typeof ceil !== "number" &&
      typeof ceil !== "undefined"
    ) throw Error(
      "Tavan sayı limiti uygulanmasını istiyorsanız bu argüman sayı türünde olmalı; \
       eğer asgari limit koymak istemiyorsanınz bu argümanı boş bırakmalısınız\n\n\
       Tavan limitsiz Ör: pValid.validate(6) \n\
       Tavan limiti 12 olan Ör: pValid.validate(6, 12)"
      );

  if(
      typeof isLowerCaseNeeded !== "boolean" &&
      typeof isLowerCaseNeeded !== "undefined"
    ) throw Error(
      "Parolada en az bir küçük harf olsun istiyorsanız argümanı boş bırakabilirsiniz;\n\
       bu limiti uygulamak istiyorsanız argümana false değeri vermelisiniz.\n\n\
       Küçük harf kontrolü yok: new PwdValidation(\"AK59F.\").validate(6, 10, false)\n\
       Küçük harf kontrolü var: new PwdValidation(\"ak59F.\").validate(6, 10)"
      )  
    
  if(
      typeof isUpperCaseNeeded !== "boolean" &&
      typeof isUpperCaseNeeded !== "undefined"
    ) throw Error(
      "Parolada en az bir büyük harf olsun istiyorsanız argümanı boş bırakabilirsiniz;\n\
       bu limiti uygulamak istemiyorsanız argümana false değeri vermelisiniz.\n\n\
       Büyük harf kontrolü yok: new PwdValidation(\"ak59.j\").validate(6, 10, , false)\n\
       Büyük harf kontrolü var: new PwdValidation(\"AK59f.\").validate(6, 10)"
      )

  if(
      typeof isNumCaseNeeded !== "boolean" &&
      typeof isNumCaseNeeded !== "undefined"
    ) throw Error(
      "Parolada en az bir sayı olsun istiyorsanız argümanı boş bırakabilirsiniz;\n\
       bu limiti uygulamak istemiyorsanız argümana false değeri vermelisiniz.\n\n\
       Sayıya gerek yok: new PwdValidation(\"akA.fj\").validate(6, 10, , , false)\n\
       Büyük harf kontrolü var: new PwdValidation(\"AK59.j\").validate(6, 10)"
      )

  if(
      typeof isSpecialCharNeeded !== "boolean" &&
      typeof isSpecialCharNeeded !== "undefined"
    ) throw Error(
      "Parolada en az bir özel işaret(.-*_) olsun istiyorsanız argümanı boş bırakabilirsiniz;\n\
       bu kısıtlamayı uygulamak istemiyorsanız argümana false değeri vermelisiniz.\n\n\
       Özel işarete gerek yok: new PwdValidation(\"ak59Fj\").validate(6, 10, , , , false)\n\
       En az bir özel işaret gerekli: new PwdValidation(\"aK59F.\").validate(6, 10)"
      )

  var isLowerCaseNeeded = isNeeded(isLowerCaseNeeded)
  var isUpperCaseNeeded = isNeeded(isUpperCaseNeeded)
  var isNumNeeded = isNeeded(isNumNeeded)
  var isSpecialCharNeeded = isNeeded(isSpecialCharNeeded)

  var pwd = this.value;
  
  var errors = [];
  
  if (isLowerCaseNeeded && !/[a-z]/.test(pwd)) {
    errors.push('En az bir küçük harf gerekli');
  }

  if (isUpperCaseNeeded && !/[A-Z]/.test(pwd)) {
    errors.push('En az bir büyük harf gerekli');
  }

  if (isNumNeeded && !/\d/.test(pwd)) {
    errors.push('En az bir sayı gerekli(0-9)');
  }

  if (isSpecialCharNeeded && !/\W/.test(pwd)) {
    errors.push('En az bir özel işaret gerekli(_*= vb.)');
  }

  if (floor && pwd.length < floor) {
    errors.push('Şifre en az ' + floor + ' karakterden oluşmalı');
  }
  
  if (ceil && pwd.length > ceil) {
    errors.push("Şifre en fazla " + ceil + " karakterden oluşabilir")
  }

  return errors.length === 0 ? true : [0, errors];
}

function isNeeded(limit) {
  return (limit === undefined || limit !== false);
}

module.exports = {
  EmailValidation,
  PwdValidation
}