// Assignment Code
var generateBtn = document.querySelector("#generate");

// user prompt for password length
var getPasswordLength = function () {
  var passLength = 0;

  passLength = Number(window.prompt("Please enter a number between 8 and 128 to indicate your desired password length."));

    // checks to make sure password is a number between 8 and 128 and if not, prompts again
    if (isNaN(passLength)) {
    window.alert ("You have not chosen a number. Please try again.");
    return getPasswordLength();

    } else if (passLength<8) {
      window.alert ("The password length of " + passLength + " is too short. Please try again.");
      return getPasswordLength();

  } else if (passLength>128) {
      window.alert ("The password length of " + passLength + " is too long. Please try again.");
      return getPasswordLength();
  }
  return passLength;
}; // end of getPasswordLength function


// user prompted whether they would like to include any characters from a defined character set in password
var getYesOrNo = function(characterSet) {

  // includeChar is yes if characters are to be included
  var includeChar;

  var yOrN = window.prompt("Please indicate with a Y/N whether you would like to include " + characterSet + " in your password.");
  
  // checks if user entered a valid response, and if not, prompts again
  if (yOrN.toLowerCase() === 'y') {
    includeChar = true;
  } else if (yOrN.toLowerCase() === 'n') {
    includeChar = false;
  } else {
    window.alert("You have entered an incorrect choice.");
    return getYesOrNo(characterSet);
  }
  return includeChar;
}; // end of getYesOrNo function

var userChoice = {
  passwordLength: getPasswordLength(),
  includeLowerCase: getYesOrNo("lower case letters a to z"),
  includeUpperCase: getYesOrNo("upper case letters A to Z"),
  includeNumbers: getYesOrNo("numbers 0 to 9"),
  includeSpecialChars: getYesOrNo("special characters")
};

// function to create string from designated UTF-8 unicode characters
var getCharacters = function(firstChar,lastChar) {

  var alphaGet = [];
  var start = firstChar.charCodeAt(0);
  var last = lastChar.charCodeAt(0);
  for (var i = start; i <= last; i++) {
    // pushes string 1 character at a time from the unicode characters onto end of alphaGet.
    // Starts at firstChar specified and ends at lastChar specified
    // firstChar and lastChar must be the start end and characters of a complete string 
    // from unicode characters to include
    alphaGet.push(String.fromCharCode(i)); 
  }

  return alphaGet.join('');
}; // end of getCharacters function
// helpful code found at https://gist.github.com/mreigen/fdeafcc08a9e44d976bd6a8db468c496


var getRandomNumber = function(min,max) {
  var num = Math.floor(Math.random()*(max - min +1)) + min;
  return num;
};


// adds a random character to the passwordArray from a character string chosen by user
var passwordBuild = function(characterSet,passwordArray) {
  charLocation = getRandomNumber(0,characterSet.length-1);
  //passwordBuild = passwordBuild.concat(numbers.charAt(charLocation));
  passwordArray.push(characterSet.charAt(charLocation));
  console.log("password item = " + passwordArray + " using a random location of " + charLocation);
};


// generates the Password based on criteria provided by user
var generatePassword = function () {
  console.log("userChoice before while loop ");
  console.log(userChoice);
  // password initialized as an empty string with a length of 0
  passwordArray = [];

  // 4 strings of characters that can be used in password
  var specialChars = "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
  var alphaUpperCase = getCharacters("A","Z");
  var alphaLowerCase = getCharacters("a","z");
  var numbers = getCharacters("0","9");
  
  // initialize
  var includeAtleastOne = false;
  var charLocation;
  var characterString = '';

  // prompts users for what type of characters to include, checking that at least one is chosen
  while (!includeAtleastOne) {

    console.log("user info after while loop ");
    console.log(userChoice);

    // creates start of password array with at least one character from each of the user
    // chosen character strings: a to z;  A to Z; 0 to 9; and/or special characters
    // these are placed at beginning of password array - location of characters to be randomized later
    if (userChoice.includeLowerCase === true) {
      characterString += alphaLowerCase;
      passwordBuild(alphaLowerCase, passwordArray);
    }

    if (userChoice.includeUpperCase === true) {
      characterString += alphaUpperCase;
      passwordBuild(alphaUpperCase, passwordArray);
    } 

    if (userChoice.includeNumbers === true) {
      characterString += numbers;
      passwordBuild(numbers, passwordArray);
    } 

    if (userChoice.includeSpecialChars === true) {
      characterString += specialChars;
      passwordBuild(specialChars, passwordArray);
    }

    // check if at least one type of character was chosen, and if not, prompt user again
    if (userChoice.includeLowerCase === false && userChoice.includeUpperCase === false && userChoice.includeNumbers === false &&
      userChoice.includeSpecialChars === false ) {
        userChoice.includeAtleastOne = false;
        window.alert("You must choose at least one type of character to include in your password. Please try again.");
        userChoice.includeLowerCase = getYesOrNo("lower case letters a to z");
        userChoice.includeUpperCase = getYesOrNo("upper case letters A to Z");
        userChoice.includeNumbers = getYesOrNo("numbers 0 to 9");
        userChoice.includeSpecialChars = getYesOrNo("special characters");
    } else {
      includeAtleastOne = true;
    }

    console.log("final character string: " + characterString);

  } // end of while !includeAtleastOne

  // fills in rest of password array with random characters from full characterString chosen by user
  for (i=passwordArray.length + 1; i<=userChoice.passwordLength; i++) {
    charLocation = getRandomNumber(0,characterString.length-1);
    passwordBuild(characterString, passwordArray);
  }

  console.log("final password = " + passwordArray);

  // randomize items in the array since the first few items were included in a non-random fashion
  //function shuffle(array) {

  //}
  
}; // end of generatePassword function

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  
  password = 'abcdefghijk';
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword());