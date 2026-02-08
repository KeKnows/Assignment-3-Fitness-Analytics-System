const fs = require("fs").promises;

/**
 * Reads a JSON health data file and counts the number of health entries
 * @param {string} filePath - Path to the JSON file
 * @returns {Promise<number>} - Total number of health entries
 */
async function healthMetricsCounter(filePath) {
  try {
    // Read file asynchronously
    const data = await fs.readFile(filePath, "utf-8");

    // Parse JSON
    const jsonData = JSON.parse(data);

    // Validate data structure
    if (!Array.isArray(jsonData)) {
      throw new Error("Invalid JSON format: Expected an array of health entries");
    }

    // Count entries
    const totalEntries = jsonData.length;
    console.log(`Total health entries: ${totalEntries}`);

    return totalEntries;
  } catch (error) {
    // Handle different error cases
    if (error.code === "ENOENT") {
      console.error(`Error: File not found at path "${filePath}"`);
    } else if (error instanceof SyntaxError) {
      console.error("Error: Invalid JSON format");
    } else {
      console.error(`Error reading health data: ${error.message}`);
    }

    // Re-throw error so tests can catch it
    throw error;
  }
}

module.exports = { healthMetricsCounter };
