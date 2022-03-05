"use strict";

const ATM = require('./atm.js');
const account = require('./account.js');
const prompt = require('prompt-sync')();


// switch(user){
//     case 'help':
//         console.log("Please enter the first name of the primary account holder")
//         break;
//     case (account.accounts.filter(accountHolder => accountHolder.firstName == user) == true):
//         checkPin(user);
//         break;
//     default:
//         console.log("We were ")
// }

function mainMenu(user, mainLoop = true) {
    console.log("Please enter the number corresponding to the operation you would like to perform\n1. Check Balance\n2. Withdraw\n3. Deposit\n4. Quit")
        switch (prompt('').toLowerCase()) {
            case '1':
                console.log(`You have $${(ATM.getBalance(user))} in your account.\nWould you like to continue?`)
                mainLoop = (/y|yes/gi.test(prompt('').toLowerCase()) ? true:false)
                break;
            case '2':
                console.log(`${ATM.withdraw(user)}\nWould you like to continue?`)
                mainLoop = (/y|yes/gi.test(prompt('').toLowerCase()) ? true:false)
                break;
            case '3':
                console.log(`${ATM.deposit(user)}\nWould you like to continue?`)
                mainLoop = (/y|yes/gi.test(prompt('').toLowerCase()) ? true:false)
                break;
            case 'q':
            case 'quit':
            case '4':
                return("Thank you for using Shenanigans ATM service!\n we hope to see you again!\n")
            default:
                console.log("\nWe didn't quite catch that\nPlease try again using one of the provided commands\n")
                break;

        }
    if (mainLoop){
        return(mainMenu(user))
    }
    else{
        return("Thank you for using Shenanigans ATM service!\n we hope to see you again!\n")
    }

}

function entry(exists = false, user = prompt('').toLowerCase()) {
    let accountHolder = (account.accounts.filter(nameOnAccount => nameOnAccount.firstName.toLowerCase() == user))
    if (accountHolder.length != 0) {
        let successfulLogin = ATM.validatePin(accountHolder)
        if (successfulLogin) {
            console.log("PIN ACCEPTED")
            return(mainMenu(accountHolder))
        }
        else {
            return ("You have exceeded your maximum amount of PIN attempts\nPlease contact Customer support at 7-436-264-4267\n")
        }
    }
    else if (/q|quit/gi.test(user)){
        goInfinite = false;
        return("Thank you for using Shenanigans ATM service!\n we hope to see you again!")
    }
    else {
        return ("We don't have that name on record\nIf you feel this is an error please reach out to our help line at 7-436-264-4267\n")
    }
}


let goInfinite = true;
while (goInfinite) {
    console.log("What is your name?")
    console.log(entry());
}