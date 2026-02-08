const fs = require("fs");
const csv = require("csv-parser");

/**
 * Reads a CSV workout file, counts workouts, and calculates total minutes
 * @param {string} filePath - Path to the CSV file
 * @returns {Promise<{ totalWorkouts: number, totalMinutes: number }>}
 */
function workoutCalculator(filePath) {
  return new Promise((resolve, reject) => {
    const workouts = [];

    // Handle file not found or read errors
    const stream = fs.createReadStream(filePath).on("error", (error) => {
      if (error.code === "ENOENT") {
        reject(new Error(`Workout file not found at path "${filePath}"`));
      } else {
        reject(new Error(`Error reading workout file: ${error.message}`));
      }
    });

    stream
      .pipe(csv())
      .on("data", (row) => {
        workouts.push(row);
      })
      .on("end", () => {
        try {
          let totalMinutes = 0;

          // Basic for loop to calculate total minutes
          for (let i = 0; i < workouts.length; i++) {
            const minutes = Number(workouts[i].minutes);
            if (isNaN(minutes)) {
              throw new Error("Invalid workout data: minutes must be a number");
            }
            totalMinutes += minutes;
          }

          const totalWorkouts = workouts.length;

          console.log(`Total workouts: ${totalWorkouts}`);
          console.log(`Total minutes: ${totalMinutes}`);

          resolve({
            totalWorkouts,
            totalMinutes,
          });
        } catch (error) {
          reject(new Error(`Error processing workout data: ${error.message}`));
        }
      });
  });
}

module.exports = { workoutCalculator };
