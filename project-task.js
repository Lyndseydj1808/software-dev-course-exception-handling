/*
Scenario:
You’ve been hired to help a local pet shelter digitize its animal adoption records. The program is meant to:
  
  Allow users to enter an animal type and adoption fee.
  
  Add the animal and fee to a list.
  
  Retrieve the adoption fee for a specific animal when requested.

However, the initial developer left the program in a buggy state, with missing exception-handling logic
and some errors in the implementation. Your job is to fix it!



Instructions
Start by Understanding the Errors:
Run the program and observe the exceptions that occur. Document what the exceptions are and where they happen.

Write Exception Handling Code:
Use try/catch blocks to handle the errors so the program doesn’t crash when incorrect input or unexpected situations occur.

Test and Debug:
Test the program with valid and invalid inputs to confirm that exceptions are handled gracefully
and the program continues running as intended.
*/


// Will need to import / install readline-sync if not done so already within project dir: npm install readline-sync 
const readlineSync = require('readline-sync');

// Initial Code with Bugs (modified to use readline-sync)
let animals = [];
let fees = [];
function addAnimal(name, fee) {
    if (!name.trim() || fee < 0) {//user validation to trim input
        throw new Error("Invalid animal name or adoption fee!");
    }
    animals.push(name.trim());
    fees.push(fee);
}
function getAdoptionFee(animalName) {
    let index = animals.indexOf(animalName);
    if (index === -1) {
        throw new Error("Animal not found in records!");
    }
    return fees[index];
}
// Main program
console.log("Welcome to the Pet Shelter System");
while (true) {
    let action = readlineSync.question("Choose an action: 'add', 'fee', or 'exit': ").toLowerCase();
    if (action === "exit") {
        console.log("Goodbye!");
        break;
    }
    else if (action === "add") {
        let animal = '';
        //user validation for blank name
        while (true) {
            animal = readlineSync.question("Enter the animal's name: ").trim();
            if (animal) {
                break;
            } else {
                console.log("Animal name cannot be blank. Please enter a valid name.");
            }
        }

        let fee = parseInt(readlineSync.questionInt("Enter the adoption fee: "));//user validation to make sure a number is entered.
        
        //try/catch block to handle blank input exception gracefully.
        try{
        addAnimal(animal, fee);
        console.log(`${animal} added with a fee of $${fee}.`);
        } catch (error) {
            console.error(`Error adding animal: ${error.message}`)
        }

    } else if (action === "fee") {
        let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ");

        //try/catch block to handle animal not in records exception gracefully
        try{
            const adoptionFee = getAdoptionFee(animal);
            console.log(`${animal}'s adoption fee is $${getAdoptionFee(animal)}.`);
        } catch (error) {
            console.log(`Error accessing animal: ${error.message}`);
        }
    } else {
        console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
    }
}



/*
Problems to Solve

Invalid Input Errors:
  What happens if the user provides a negative adoption fee or leaves the name blank?
  Original code for negative adoption fee: throws error Invalid name or adoption fee! and stops the program
  Updated code for negative adoption fee: Error adding animal: Invalid animal name or adoption fee! loops back to choose an action and program continues to run.
  Original code for blank name: allows for a blank name to be entered.
  Updated code for blank name: Throws error 'Animal name cannot be blank. Please enter a valid name and prompts user for new entry.
  

  What happens if the user tries to find the fee for an animal that hasn’t been added?
  original: error: animal not found in records! and stops program
  updated: Error accessing animal: Animal not found in records! Program continues and loops back to choose an action.

Code Flow Problems:
  What happens if the program throws an exception? Does the rest of the code continue running?
  Original: No, it stops the program
  Updated: The code keeps running and loops back to choose an action.

Structured Exception Handling:
  Add try/catch blocks to handle the above errors gracefully.
*/
