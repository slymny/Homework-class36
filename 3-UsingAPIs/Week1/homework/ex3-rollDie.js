'use strict';
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Homework/tree/main/3-UsingAPIs/Week1#exercise-3-roll-a-die

- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollDie()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDie()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

function rollDie() {
  return new Promise((resolve, reject) => {
    // Compute a random number of rolls (3-10) that the die MUST complete
    const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
    console.log(`Die scheduled for ${randomRollsToDo} rolls...`);

    const rollOnce = (roll) => {
      // Compute a random die value for the current roll
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(`Die value is now: ${value}`);

      // Use callback to notify that the die rolled off the table after 6 rolls
      if (roll > 6) {
        reject(new Error('Oops... Die rolled off the table.'));
      }

      // Use callback to communicate the final die value once finished rolling
      if (roll === randomRollsToDo) {
        resolve(`Success! Die settled on ${value}.`);
      }

      // Schedule the next roll todo until no more rolls to do
      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), 500);
      }
    };

    // Start the initial roll
    rollOnce(1);
  });
}

function main() {
  rollDie()
    .then((msg) => console.log(msg))
    .catch((err) => console.log(err.message));
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}
module.exports = rollDie;

// In promises if the 'catch' catches an error it stops the success condition working after that. After an error occurs promise doesn't let the success message log. But without promise after the error message occurs, if the success message condition is met, it still log the success message.
