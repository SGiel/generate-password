// Assignment Code
var generateBtn = document.querySelector("#generate");
// User chosen length of password


// user prompt for password length
var passwordLengthPrmpt = function () {
  passwordLength = Number(window.prompt("Please enter a number between 8 and 128 to indicate your desired password length."));
  console.log("User chose a password length of " + passwordLength);
    // checks to make sure password is a number between 8 and 128
    if (isNaN(passwordLength)) {
    window.alert ("You have not chosen a number. Please try again.");
    return passwordLengthPrmpt();

    } else if (passwordLength<8) {
      window.alert ("The password length of " + passwordLength + " is too short. Please try again.");
      return passwordLengthPrmpt();

  } else if (passwordLength>128) {
      window.alert ("The password length of " + passwordLength + " is too long. Please try again.");
      return passwordLengthPrmpt();
  }
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
}; // end of grabCharacters function

// user prompt for character set to include
var yesOrNoPrmpt = function(characterSet) {

  var yOrN;
  // initially assumes a yes to include the character set
  var includeChar = true;

  YorN = window.prompt("Please indicate with a Y/N whether you would like to include " + characterSet + " in your password.");
  console.log(typeof YorN + " " + YorN.toLowerCase());
  
  if (YorN.toLowerCase() === 'y') {
    includeChar = true;
  } else if (YorN.toLowerCase() === 'n') {
    includeChar = false;
  } else {
    window.alert("You have entered an incorrect choice.");
    return yesOrNoPrmpt(characterSet);
  }
  return includeChar;
}; // end of yesOrNoPrompt function

// generates the Password based on criteria provided by user
var generatePassword = function () {
  var passwordLength = 0;
  var specialChars = " !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
  // console.log(specialChars + " is a " + typeof specialChars + " length " + specialChars.length);
  var alphaUpperCase = grabCharacters("A","Z");
  // console.log(alphaUpperCase + " is a " + typeof alphaUpperCase + " length " + alphaUpperCase.length);
  var alphaLowerCase = grabCharacters("a","z");
  // console.log(alphaLowerCase + " is a " + typeof alphaLowerCase + " length " + alphaLowerCase.length);
  var numbers = grabCharacters("0","9");
  // console.log(numbers + " is a " + typeof numbers + " length " + numbers.length);
  var includeLowerCase = false;
  var includeUpperCase = false
  var includeSpecialChars = false;
  var includeNumbers = false;
  var includeAtleastOne = false;

  // prompts for password length
  passwordLengthPrmpt();

  // prompts users for what type of characters to include, checking that at least one is chosen
  while (!includeAtleastOne) {

    // prompt user if they would like to include lower case letters in password
    includeLowerCase = yesOrNoPrmpt("lower case letters a to z");
    // prompt user if they would like to include upper case letters in password
    includeUpperCase = yesOrNoPrmpt("upper case letters A to Z");
    // prompt user if they would like to include numbers in password
    includeNumbers = yesOrNoPrmpt("numbers 0 to 9");
    // prompt user if the would like to include special characters in password
    includeSpecialChars = yesOrNoPrmpt("special characters");

    // check if at least one type of character was chosen, and if not, prompt user again
    if (includeLowerCase === false && includeUpperCase === false && includeNumbers === false &&
      includeSpecialChars === false ) {
        includeAtleastOne = false;
        window.alert("You must choose at least one type of character to include in your password. Please try again.");
    } else {
      includeAtleastOne = true;
    }
  } // end of while !includeAtleastOne

  console.log("user wants to include lower case = " + includeLowerCase);
  console.log("user wants to include upper case = " + includeUpperCase);
  console.log("user wants to include numbers = " + includeNumbers);
  console.log("user wants to include special characters = " + includeSpecialChars);

  

}; // end of generatePassword function

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  



  password = 'abcdefghijk';
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);