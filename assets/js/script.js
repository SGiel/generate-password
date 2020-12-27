// Assignment Code
var generateBtn = document.querySelector("#generate");
// User chosen length of password
var passwordLength = 0;

var passwordLengthPrmpt = function () {
  passwordLength = Number(window.prompt("Please enter a number between 8 and 128 to indicate your desired password length."));
  console.log("User chose a password length of " + passwordLength);
  return passwordLength;
};

// function to create array from designated UTF-8 unicode characters
var grabCharacters = function(firstChar,lastChar) {
  var alphaGrab = [];
  var start = firstChar.charCodeAt(0);
  var last = lastChar.charCodeAt(0);
  for (var i = start; i <= last; i++) {
    alphaGrab.push(String.fromCharCode(i)); 
  }
  return alphaGrab.join('');
}

// generates the Password based on criteria provided by user
var generatePassword = function () {
  
  // prompts for password length
  passwordLengthPrmpt();

  // checks to make sure password is a number between 8 and 128
  if (isNaN(passwordLength)) {
    window.alert ("You have not chosen a number. Please try again.");
    generatePassword();

  } else if (passwordLength<8) {
    window.alert ("The password length of " + passwordLength + " is too short. Please try again.");
      generatePassword();

  } else if (passwordLength>128) {
      window.alert ("The password length of " + passwordLength + " is too long. Please try again.");
      generatePassword();
  }
}; // end of generatePassword function

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var alphaUpperCase = [];
  var alphaLowerCase = [];
  var numbers = [];
  var specialCharacters = " !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  alphaUpperCase = grabCharacters("A","Z");
  console.log(alphaUpperCase + " is a " + typeof alphaUpperCase + " length " + alphaUpperCase.length);

  alphaLowerCase = grabCharacters("a","z");
  console.log(alphaLowerCase + " is a " + typeof alphaLowerCase + " length " + alphaLowerCase.length);

  numbers = grabCharacters("0","9");
  console.log(numbers + " is a " + typeof numbers + " length " + numbers.length);


  password = 'abcdefghijk';
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);