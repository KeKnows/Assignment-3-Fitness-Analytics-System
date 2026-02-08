const { healthMetricsCounter } = require("./healthReader");

describe("healthMetricsCounter", () => {
  test("reads valid JSON file and counts entries", async () => {
    const result = await healthMetricsCounter("./data/health-metrics.json");
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });

  test("throws an error when file is missing", async () => {
    await expect(
      healthMetricsCounter("./data/missing-health.json")
    ).rejects.toThrow();
  });
});
