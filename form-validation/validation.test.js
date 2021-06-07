const EmailValidation = require('./formValidation');

describe('Email validation and its methods', () => {
  
  const emailsToThrowErr = [
    '',
    {obj: 'yes'},
    5,
    undefined,
    ['array']
  ];
  const emailFalse1 = 'testEtBeni';
  
  const invalidEmails = [
    'artungokhan',
    'artungokhan@g.com',
    '#artun@gmail.com',
    'şüçiüğ@gmail.com',
    'artun@gmail.c'
  ];
  
  it('throws error for inappropriate email', () => {
    emailsToThrowErr.forEach(ema => {
      
      expect(() => {
        new EmailValidation(ema)
      }).toThrowError(new Error('value in email field is not good!!!'));
      
    });
  });
  
  it('returns false if it\'s an invalid email', () => {
    
    invalidEmails.forEach(ema => {
      const eValid = new EmailValidation(ema);

      expect(eValid.validate()).toBeFalsy();
    })
  });
  
  it('returns true if email is valid', () => {
    const validEmail = 'valid@gmail.com';
    
    const eValid = new EmailValidation(validEmail);
    
    expect(eValid.validate()).toBeTruthy();
  })
  
  it('returns the same input', () => {
    
    const eValid = new EmailValidation(emailFalse1);
    
    expect(eValid.returnValue()).toBe(emailFalse1);
  });
})