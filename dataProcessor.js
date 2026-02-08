require("dotenv").config();

const { workoutCalculator } = require("./workoutReader");
const { healthMetricsCounter } = require("./healthReader");

async function processFiles() {
  try {
    console.log(process.env.USER_NAME);
    console.log(process.env.WEEKLY_GOAL);

    const workoutData = await workoutCalculator("./data/workouts.csv");
    const healthEntries = await healthMetricsCounter("./data/health-metrics.json");

    console.log(`Processing data for: ${process.env.USER_NAME}`);
    console.log(`Workouts found: ${workoutData.totalWorkouts}`);
    console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
    console.log(`Health entries found: ${healthEntries}`);

    if (workoutData.totalMinutes >= Number(process.env.WEEKLY_GOAL)) {
      console.log("Weekly goal met");
    } else {
      console.log("Weekly goal not met");
    }
  } catch (error) {
    console.error(error.message);
  }
}

processFiles();
