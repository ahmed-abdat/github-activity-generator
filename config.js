const moment = require("moment");

/**
 * Configuration presets for different commit patterns
 * Each configuration must include:
 * - startDate: Start date for commits (YYYY-MM-DD)
 * - endDate: End date for commits (YYYY-MM-DD)
 * - minCommitsPerDay: Minimum commits per day
 * - maxCommitsPerDay: Maximum commits per day
 * - totalCommits: Total number of commits to generate
 */
const config = {
  // Test configuration (last 7 days, few commits)
  test: {
    startDate: moment().subtract(7, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    minCommitsPerDay: 1,
    maxCommitsPerDay: 3,
    totalCommits: 10,
  },

  // Full year configuration (spread across the year)
  year2023: {
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    minCommitsPerDay: 1,
    maxCommitsPerDay: 4,
    totalCommits: 200,
  },
};

module.exports = config;
