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
    'dummyemail',
    'dummyemail@g.com',
    '#dummy@gmail.com',
    'şüçiüğ@gmail.com',
    'dummyemail@gmail.c',
  ];
  
  it('throws error for inappropriate email', () => {
    emailsToThrowErr.forEach(ema => {
      
      expect(() => {
        new EmailValidation(ema)
      }).toThrowError(new Error('email alanını ya boş bıraktınız ya da String veri tıpı dışında bir veri tipi girdiniz!'));
      
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
    'a!-/$4As': ['En az bir özel işaret gerekli(_*= vb.)'],
    'ASDR56HJ': ['En az bir küçük harf gerekli'],
    'zx!@5': [
          'En az bir büyük harf gerekli',
          'En az bir özel işaret gerekli(_*= vb.)',
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
      }).toThrowError(new Error('password alanını ya boş bıraktınız ya da String veri tıpı dışında bir veri tipi girdiniz!'));
    })
  })
 
   
  it("should return an error as password is not long enough", () => {
    const pwds = [
      {
        pwd: "a.K5f8",
        floor: 7
      },
      {
        pwd: "a.K5f8a",
        floor: 8
      },
    ];

    pwds.forEach(p => {
      const res = new PwdValidation(p.pwd).validate(p.floor);

      expect(res[1]).toEqual(["Şifre en az " + p.floor + " karakterden oluşmalı"])
    });

  });

  it("should return an error as password is too long", () => {
    const pwds = [
      {
        pwd: "a.K5f8j4la5",
        ceil: 10
      },
      {
        pwd: "a.K5f8aK8Gcla",
        ceil: 12
      },
    ];

    pwds.forEach(p => {
      const res = new PwdValidation(p.pwd).validate(undefined, p.ceil);

      expect(res[1]).toEqual(["Şifre en fazla " + p.ceil + " karakterden oluşabilir"])
    });

  });

  it("should return an error as the password lacks a lowercase letter", () => {
    const res = new PwdValidation("A.56ANK").validate();

    expect(res[1]).toEqual(["En az bir küçük harf gerekli"]);
  });

  it("should return an error as the password lacks an uppercase letter", () => {
    const res = new PwdValidation("a.56ank").validate();

    expect(res[1]).toEqual(["En az bir büyük harf gerekli"]);
  });

  it("should return an error as the password lacks a number", () => {
    const res = new PwdValidation("a.Lank").validate();

    expect(res[1]).toEqual(["En az bir sayı gerekli(0-9)"]);
  });

  it("should return an error as the password lacks a special character", () => {
    const res = new PwdValidation("aLank5").validate();

    expect(res[1]).toEqual(["En az bir özel işaret gerekli(_*= vb.)"]);
  });

  it("should return an error as the password lacks a number and a lowercase letter", () => {
    const res = new PwdValidation("A.AALP").validate();

    expect(res[1]).toEqual(["En az bir küçük harf gerekli", "En az bir sayı gerekli(0-9)"])
  })

  it("shouldn'nt return an lowercase letter error as we disable it", () => {
    const res = new PwdValidation("A.56ANK").validate( undefined, undefined, false);

    expect(res).toBeTruthy();
  });

  it('returns true for valid pwds', () => {
    const pValid = new PwdValidation('Asdf45.');
    
    expect(pValid.validate()).toBeTruthy();
  })
})