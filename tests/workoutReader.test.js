const { workoutCalculator } = require("./workoutReader");

describe("workoutCalculator", () => {
  test("reads valid CSV file and returns expected data structure", async () => {
    const result = await workoutCalculator("./data/workouts.csv");

    expect(result).toHaveProperty("totalWorkouts");
    expect(result).toHaveProperty("totalMinutes");
    expect(typeof result.totalWorkouts).toBe("number");
    expect(typeof result.totalMinutes).toBe("number");
  });

  test("throws an error when file is missing", async () => {
    await expect(
      workoutCalculator("./data/missing-workouts.csv")
    ).rejects.toThrow();
  });
});// Test your workoutReader.js module here
