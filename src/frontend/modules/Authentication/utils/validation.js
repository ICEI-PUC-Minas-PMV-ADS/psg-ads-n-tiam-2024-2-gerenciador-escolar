export const validateEmailFormat = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };
  
  export const validateEmailLength = (email) => email.length <= 254;
  
  export const isEmailNotEmpty = (email) => email.trim() !== '';
  
  export const validateNoInvalidCharacters = (email) => {
    const regexInvalidChars = /[!#\$%\^&\*\(\)<>]/;
    return !regexInvalidChars.test(email);
  };
