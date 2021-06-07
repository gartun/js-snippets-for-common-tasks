const { 
  EmailValidation,
  PwdValidation
  } = require('./formValidation');

describe('Email validation and its methods', () => {
  
  const emailsToThrowErr = [
    '',
    {obj: 'yes'},
    5,
    undefined,
    ['array'],
    '       '
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
});

describe('Password validation and its methods', () => {
  
  const InvalidPwds = {
    'Acgh2': ['Şifre en az 6 karakterden oluşmalı'],
    'zxcvbn6m': ['En az bir büyük harf gerekli'],
    'sAdftgyi': ['En az bir sayı gerekli(0-9)'],
    'a!-/$4As': ['Geçersiz Karakter(_*= vb.)'],
    'ASDR56HJ': ['En az bir küçük harf gerekli'],
    'zx!@5': [
          'En az bir büyük harf gerekli',
          'Geçersiz Karakter(_*= vb.)',
          'Şifre en az 6 karakterden oluşmalı'
         ],
    'AECF': [
          'En az bir küçük harf gerekli',
          'En az bir sayı gerekli(0-9)',
          'Şifre en az 6 karakterden oluşmalı'
      ]
  };
  
  const InvalPwdsArr = Object.keys(InvalidPwds);
  
  const pwdsToThrowErrs = [
    '',
    634,
    undefined,
    {pwd: 'Asdrxsa6'},
    '       '
  ];
  
  it('throws an error if pwd is inappropriate', () => {
    
    pwdsToThrowErrs.forEach(p => {
      expect(() => {
        new PwdValidation(p)
      }).toThrowError(new Error('value in password field is not good!!!'));
    })
  })
  
  it('returns an array with its first element being zero if password is not valid', () => {
    
    InvalPwdsArr.forEach(iP => {
      const pValid = new PwdValidation(iP);
      
      expect(pValid.validate()).toContain(0);
    })
  });
  
  it('returns correct reasons why pwd is invalid', () => {
    
    InvalPwdsArr.forEach(iP => {
      const pValid = new PwdValidation(iP);
      
      const res = pValid.validate();
      
      expect(res[1]).toEqual(InvalidPwds[iP])
    })
  })
  
  it('returns true for valid pwds', () => {
    const pValid = new PwdValidation('Asdf45');
    
    expect(pValid.validate()).toBeTruthy();
  })
})