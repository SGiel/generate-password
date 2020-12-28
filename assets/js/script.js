// Assignment Code
var generateBtn = document.querySelector("#generate");

// function to get password length 8-128 from user via a window prompt 
var getPasswordLength = function () {
  var passLength;

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


// user confirm whether they would like to include any characters from a defined character set in password
var getConfirm = function(characterSet) {

  var includeChar = window.confirm("Please select OK if you would like to include " + characterSet + " in your password.");
  
  return includeChar;
}; // end of getConfirm function


// function to create string from designated UTF-8 unicode characters
var getCharacters = function(firstChar,lastChar) {

  var alphaGet = [];
  var start = firstChar.charCodeAt(0);
  var last = lastChar.charCodeAt(0);
  for (var i = start; i <= last; i++) {
    // pushes string 1-character at a time from the unicode characters onto end of alphaGet.
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

// concatenates string2 onto the end of string 1 
var concatStrings = function(string1,string2) {
  string1 += string2;
  return string1;
}

// adds a single random character to the passwordArray from a character string chosen by user
var buildPassword = function(characterSet,passwordArray) {
  var charLocation;
  charLocation = getRandomNumber(0,characterSet.length-1);
  passwordArray.push(characterSet.charAt(charLocation));
  //console.log("password item = " + passwordArray + " using a random location of " + charLocation);
};


//Fisher-Yates shuffle to randomly shuffle array items
var shuffle = function(anArray) {
  var t;
  for (let i = anArray.length - 1; i >0; i--) {
    let j = Math.floor(Math.random()*(i + 1)); // random index from 0 to i

    // swap elements anArray[i] and anArray[j]
    t = anArray[i];
    anArray[i] = anArray[j];
    anArray[j] = t;

  }
}; // end of Fisher-Yates shuffle


// generates the Password based on criteria provided by user
var generatePassword = function () {
 
  //final password string returned from generatePassword
  var passwordStr = '';

  // password initialized as an empty string with a length of 0
  var passwordArray = [];
  var passwordLength = getPasswordLength();
  var includeLowerCase;
  var includeUpperCase;
  var includeNumbers;
  var includeSpecialChars;
  var includeAtleastOne;
  
  // 4 strings of characters that can be used in password
  var specialChars = "!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
  var alphaUpperCase = getCharacters("A","Z");
  var alphaLowerCase = getCharacters("a","z");
  var numbers = getCharacters("0","9");
  // characterString is the full concatenated string of all characters to be allowed in password
  var characterString = '';

  // prompts users for what type of characters to include, checking that at least one is chosen
  while (!includeAtleastOne) {

    includeLowerCase = getConfirm("lower case letters a to z");
    includeUpperCase = getConfirm("upper case letters A to Z");
    includeNumbers = getConfirm("numbers 0 to 9");
    includeSpecialChars = getConfirm("special characters");

    // if user wants to includeLowerCase then add lower case characters to character string
    // and add a single random lower case letter to password array so we have at least 1
    if (includeLowerCase === true) {
      characterString = concatStrings(characterString,alphaLowerCase);
      buildPassword(alphaLowerCase, passwordArray);
    }

    // if user wants to include upper case then add upper case characters to character string
    // and add a single random upper case letter to password array so we have at least 1
    if (includeUpperCase === true) {
      characterString = concatStrings(characterString,alphaUpperCase);
      buildPassword(alphaUpperCase, passwordArray);
    } 

    // if user wants to include numbers then add numbers 0 to 9 to character string
    // and add a single random number to password array so we have at least 1
    if (includeNumbers === true) {
      characterString = concatStrings(characterString,numbers);
      buildPassword(numbers, passwordArray);
    } 

    // if user wants to include special characters then add to character string
    // and add a single special character to password array so we have at least 1
    if (includeSpecialChars === true) {
      characterString = concatStrings(characterString,specialChars);
      buildPassword(specialChars, passwordArray);
    }

    // check if at least one type of character was chosen, and if not, prompt user again
    if (includeLowerCase === false && includeUpperCase === false && includeNumbers === false &&
      includeSpecialChars === false ) {
        includeAtleastOne = false;
        window.alert("You must choose at least one type of character to include in your password. Please try again.");
    } else {
      includeAtleastOne = true;
    }
  } // end of while !includeAtleastOne

  // fills in rest of password array with random characters from full characterString chosen by user
  for (i=passwordArray.length + 1; i<=passwordLength; i++) {
    buildPassword(characterString, passwordArray);
  }

  //console.log("password before shuffle = " + passwordArray);

  // randomly shuffle items in the array since the first few items were be included 
  // in a non-random fashion since we needed at least one of each character type chosen
  shuffle(passwordArray);
  //console.log("password after shuffle = " + passwordArray);


  passwordStr = passwordArray.join('');
  return passwordStr;
  
}; // end of generatePassword function

// Write password to the #password input
function writePassword() {
  var password = generatePassword();

  var passwordText = document.querySelector("#password");

  passwordText.value = password;

};

// Add event listener to generate button
// note that writePassword passed the whole function and not the executed function writePassword()
generateBtn.addEventListener("click", writePassword);