// Assignment Code
var generateBtn = document.querySelector("#generate");

 // password initialized as an empty string with a length of 0
//password = '';
//passwordLength = 0;

// user prompt for password length
var passwordLengthPrmpt = function () {
  passwordLength = Number(window.prompt("Please enter a number between 8 and 128 to indicate your desired password length."));
  console.log("User chose a password length of " + passwordLength);

    // checks to make sure password is a number between 8 and 128 and if not, prompts again
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


// function to create string from designated UTF-8 unicode characters
var getCharacters = function(firstChar,lastChar) {

  var alphaGet = [];
  var start = firstChar.charCodeAt(0);
  var last = lastChar.charCodeAt(0);
  for (var i = start; i <= last; i++) {
    alphaGet.push(String.fromCharCode(i)); 
  }

  return alphaGet.join('');
}; // end of getCharacters function
// helpful code found at https://gist.github.com/mreigen/fdeafcc08a9e44d976bd6a8db468c496


// user prompted whether they would like to include any characters from a defined character set in password
var yesOrNoPrmpt = function(characterSet) {

  // includeChar is yes if characters are to be included
  var includeChar;

  var yOrN = window.prompt("Please indicate with a Y/N whether you would like to include " + characterSet + " in your password.");
  //console.log(typeof yOrN + " " + yOrN.toLowerCase());
  
  // checks if user entered a valid response, and if not, prompts again
  if (yOrN.toLowerCase() === 'y') {
    includeChar = true;
  } else if (yOrN.toLowerCase() === 'n') {
    includeChar = false;
  } else {
    window.alert("You have entered an incorrect choice.");
    return yesOrNoPrmpt(characterSet);
  }
  //console.log("IncludeChar " + includeChar);
  return includeChar;
}; // end of yesOrNoPrompt function


var getRandomNumber = function(min,max) {
  var num = Math.floor(Math.random()*(max - min +1)) + min;
  return num;
};


// generates the Password based on criteria provided by user
var generatePassword = function () {

  // password initialized as an empty string with a length of 0
  passwordArray = [];

  var specialChars = "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
  // console.log(specialChars + " is a " + typeof specialChars + " length " + specialChars.length);
  var alphaUpperCase = getCharacters("A","Z");
  // console.log(alphaUpperCase + " is a " + typeof alphaUpperCase + " length " + alphaUpperCase.length);
  var alphaLowerCase = getCharacters("a","z");
  console.log(alphaLowerCase + " is a " + typeof alphaLowerCase + " length " + alphaLowerCase.length);
  var numbers = getCharacters("0","9");
  console.log(numbers + " is a " + typeof numbers + " length " + numbers.length);
  
  // do not include characters unless user choses - so initialize to false
  var includeLowerCase = false;
  var includeUpperCase = false
  var includeSpecialChars = false;
  var includeNumbers = false;
  var includeAtleastOne = false;

  var charLocation = -1;
  var characterString = '';

  // prompts user for password length
  passwordLengthPrmpt();

  // prompts users for what type of characters to include, checking that at least one is chosen
  while (!includeAtleastOne) {

    // prompt user if they would like to include lower case letters in password
    includeLowerCase = yesOrNoPrmpt("lower case letters a to z");
    console.log("Include lower case = " + includeLowerCase);
    // prompt user if they would like to include upper case letters in password
    includeUpperCase = yesOrNoPrmpt("upper case letters A to Z");
    console.log("Include upper case = " + includeUpperCase);
    // prompt user if they would like to include numbers in password
    includeNumbers = yesOrNoPrmpt("numbers 0 to 9");
    console.log("Include numbers = " + includeNumbers);
    // prompt user if the would like to include special characters in password
    includeSpecialChars = yesOrNoPrmpt("special characters");
    console.log("Include special characters = " + includeSpecialChars);

    // check if at least one type of character was chosen, and if not, prompt user again
    if (includeLowerCase === false && includeUpperCase === false && includeNumbers === false &&
      includeSpecialChars === false ) {
        includeAtleastOne = false;
        window.alert("You must choose at least one type of character to include in your password. Please try again.");
    } else {
      includeAtleastOne = true;
    }

    console.log("includeAtleastOne = " + includeAtleastOne);

    if (includeLowerCase === true) {
      characterString += alphaLowerCase;
    }

    if (includeUpperCase === true) {
      characterString += alphaUpperCase;
    } 

    if (includeNumbers === true) {
      characterString += numbers;
    } 

    if (includeSpecialChars === true) {
      characterString += specialChars;
    }
    
  } // end of while !includeAtleastOne

  console.log("final characterString = " + characterString);

  // makes sure at least one of each type of character chosen is include in password
  // lower case, upper case, numbers and/or special characters
  // these are placed at beginning of password array - location to be randomized later
  if (includeLowerCase) {
    charLocation = getRandomNumber(0,alphaLowerCase.length-1);
    passwordArray.push(alphaLowerCase.charAt(charLocation));
    console.log("password 1st item = " + passwordArray + " using a random location of " + charLocation);
  }
  if (includeUpperCase) {
    charLocation = getRandomNumber(0,alphaUpperCase.length-1);
    //passwordBuild = passwordBuild.concat(alphaUpperCase.charAt(charLocation));
    passwordArray.push(alphaUpperCase.charAt(charLocation));
    console.log("password 1st item = " + passwordArray + " using a random location of " + charLocation);
  }
  if (includeNumbers) {
    charLocation = getRandomNumber(0,numbers.length-1);
    //passwordBuild = passwordBuild.concat(numbers.charAt(charLocation));
    passwordArray.push(numbers.charAt(charLocation));
    console.log("password 1st item = " + passwordArray + " using a random location of " + charLocation);
  }
  if (includeSpecialChars) {
    charLocation = getRandomNumber(0,specialChars.length-1);
    //passwordBuild = passwordBuild.concat(specialChars.charAt(charLocation));
    passwordArray.push(specialChars.charAt(charLocation));
    console.log("password 1st item = " + passwordArray + " using a random location of " + charLocation);
  }

  // grabs random characters from the full character string to fill rest of password array
  for (i=passwordArray.length + 1; i<=passwordLength; i++) {
    charLocation = getRandomNumber(0,characterString.length-1);
    console.log("new character to add from string is " + characterString.charAt(charLocation));
    passwordArray.push(characterString.charAt(charLocation));   
    console.log("password build = " + passwordArray + " using a random location of " + charLocation);
  }


  //console.log("user wants to include lower case = " + includeLowerCase);
  //console.log("user wants to include upper case = " + includeUpperCase);
  //console.log("user wants to include numbers = " + includeNumbers);
  //console.log("user wants to include special characters = " + includeSpecialChars);

  // makes sure to randomly grab at least one character from each character set user requested

  
}; // end of generatePassword function

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  
  password = 'abcdefghijk';
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);