"use strict";
const account = require('./account.js');
const wallet = require('./wallet.js');
const prompt = require('prompt-sync')();

function getBalance(user){
    return(user[0].balance)
    // return("Testing")
}

function determineWallet(user){
   return(wallet.accounts.filter(walletHolder=> user[0].firstName == walletHolder.firstName)) 
}
function withdraw(user){
    let onPerson = determineWallet(user)
    console.log(`You have $${user[0].balance}\nHow much would you like to withdraw?\n1. $10\n2. $20\n3. $50\n4. 100`)
    switch(prompt().toLowerCase()){
        case '1':
            return(withdrawalAssurance(user,onPerson,10))
        case '2':
            return(withdrawalAssurance(user,onPerson,20))
        case '3':
            return(withdrawalAssurance(user,onPerson,50))
        case '4':
            return(withdrawalAssurance(user,onPerson,100))
        case 'q':
        case 'quit':
            return("Returning to main menu")
        default:
            console.log("we did not recognize your input.\nPlease try again or type (q)uit to return to main menu")


    // if (parseInt(withdrawalAmount) > user[0].balance){
    //     return("You don't have the funds for the amount you would like to withdraw.")
    // }
    // else if (!parseInt(withdrawalAmount) || parseInt(withdrawalAmount) > 4){ 
    //     return("You have entered an invalid selection\nreturning to main menu")
    // }
}
}

function withdrawalAssurance(user,userWallet,amount){
    if (amount > user[0].balance){
        return ("You do not have enough funds in your account to cover this withdrawal. Returning to main menu")
    }
    else{
        user[0].balance -= amount
        userWallet[0].balance += amount
        return(`You have $${user[0].balance} remaining in your account.\nYou have $${userWallet[0].balance} in your wallet after this withdrawal.`)
    }
}

function deposit(user) {
    let onPerson = determineWallet(user)
    console.log("Please enter the amount you are depositing")
    let depositAmount = parseInt(prompt('$'))

    if (depositAmount > 0){
        return(depositAssurance(user,onPerson,depositAmount))
    }
    else{
        return(depositAmount)
    }
}
function depositAssurance(user,userWallet, amount){
    if (amount > userWallet[0].balance){
        return ("You do not have enough funds on your person to cover this deposit. Returning to main menu")
    }
    else{
        user[0].balance += amount
        userWallet[0].balance -= amount
        return(`You have $${user[0].balance} in your account after this deposit.\nYou have $${userWallet[0].balance} remaining in your wallet.`)
    }
}


function validatePin(user){   
    let attempt = 0
    console.log('Please enter your PIN')
    let pinAttempt = prompt('')
    let successful = false
    while (!successful && attempt <= 2){
       if (user.filter(pinChecking => pinChecking.pin == pinAttempt).length != 0){
            successful = true;
            break;
        }   
        else if ((user.filter(pinChecking => pinChecking.pin == pinAttempt).length == 0) && attempt < 2){
            attempt++
            console.log(`Please enter your PIN\nYou have ${3 - attempt} tries left`)
            pinAttempt = prompt('')
        }
        else if ((user.filter(pinChecking => pinChecking.pin == pinAttempt).length == 0) && attempt >= 2){
            return(false)
        }
        else{  
            console.log("Unexpected input, closing down")
            process.exit()
        }
    }   
    return(successful)
}


module.exports = {getBalance, withdraw, deposit, validatePin}