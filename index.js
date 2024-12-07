const moment = require("moment");
const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");
const config = require("./config");
const CONSTANTS = require("./constants");

// File path configuration
const FILE_PATH = path.join(__dirname, "data.txt");

/**
 * Configuration validation
 */
function validateConfig(selectedConfig) {
  const required = [
    "startDate",
    "endDate",
    "minCommitsPerDay",
    "maxCommitsPerDay",
    "totalCommits",
  ];

  // Check required fields
  for (const field of required) {
    if (!(field in selectedConfig)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  // Validate date range
  const start = moment(selectedConfig.startDate);
  const end = moment(selectedConfig.endDate);
  const now = moment();

  if (!start.isValid() || !end.isValid()) {
    throw new Error("Invalid date format. Use YYYY-MM-DD");
  }

  if (end.isBefore(start)) {
    throw new Error("End date cannot be before start date");
  }

  // Future date validation
  if (!CONSTANTS.ALLOW_FUTURE_DATES) {
    if (start.isAfter(now)) {
      throw new Error(
        "Start date cannot be in the future when ALLOW_FUTURE_DATES is false"
      );
    }
    if (end.isAfter(now)) {
      throw new Error(
        "End date cannot be in the future when ALLOW_FUTURE_DATES is false"
      );
    }
  }

  // Validate commit numbers
  if (selectedConfig.minCommitsPerDay > selectedConfig.maxCommitsPerDay) {
    throw new Error("minCommitsPerDay cannot be greater than maxCommitsPerDay");
  }
  if (selectedConfig.totalCommits < 1) {
    throw new Error("totalCommits must be at least 1");
  }

  // Warning for future dates
  if (start.isAfter(now) || end.isAfter(now)) {
    console.log(
      "\n⚠️  Warning: Using future dates. Commits might not show up immediately on GitHub."
    );
    console.log(
      "   GitHub only shows contributions for dates up to the current date.\n"
    );
  }
}

/**
 * Date and time utilities
 */
function getRandomDates(startDate, endDate, numberOfDates) {
  if (!startDate || !endDate || numberOfDates < 0) {
    throw new Error("Invalid parameters for getRandomDates");
  }

  const start = moment(startDate);
  const end = moment(endDate);
  const daysAvailable = end.diff(start, "days") + 1;

  // Create array of all possible dates
  const allDates = [];
  const currentDate = start.clone();
  while (currentDate.isSameOrBefore(end)) {
    allDates.push(currentDate.format("YYYY-MM-DD"));
    currentDate.add(1, "day");
  }

  // Shuffle dates using Fisher-Yates algorithm
  for (let i = allDates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allDates[i], allDates[j]] = [allDates[j], allDates[i]];
  }

  return allDates.slice(0, numberOfDates);
}

function getRandomTime() {
  return {
    hour: Math.floor(Math.random() * CONSTANTS.HOURS_IN_DAY),
    minute: Math.floor(Math.random() * CONSTANTS.MINUTES_IN_HOUR),
    second: Math.floor(Math.random() * CONSTANTS.SECONDS_IN_MINUTE),
  };
}

/**
 * File operations
 */
function initializeFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "0");
      console.log("📝 Created tracking file");
    }
  } catch (error) {
    throw new Error(`Failed to initialize file: ${error.message}`);
  }
}

function updateFileContent(filePath) {
  try {
    const count = parseInt(fs.readFileSync(filePath)) + 1;
    fs.writeFileSync(filePath, count.toString());
    return count;
  } catch (error) {
    throw new Error(`Failed to update file: ${error.message}`);
  }
}

/**
 * Progress tracking
 */
class ProgressBar {
  constructor(total) {
    this.total = total;
    this.current = 0;
  }

  update(value) {
    this.current = value;
    if (
      this.current % CONSTANTS.PROGRESS_INTERVAL === 0 ||
      this.current === this.total
    ) {
      const percentage = (this.current / this.total) * 100;
      console.log(
        `✅ Progress: ${percentage.toFixed(1)}% (${this.current}/${
          this.total
        } commits)`
      );
    }
  }
}

/**
 * Main commit creation function
 */
async function createCommits(
  configType = CONSTANTS.DEFAULT_CONFIG,
  dryRun = false
) {
  try {
    // Get and validate configuration
    const selectedConfig = config[configType];
    if (!selectedConfig) {
      throw new Error(
        `Invalid config type: ${configType}. Available types: ${Object.keys(
          config
        ).join(", ")}`
      );
    }
    validateConfig(selectedConfig);

    // Initialize
    const git = simpleGit();
    initializeFile(FILE_PATH);
    const progress = new ProgressBar(selectedConfig.totalCommits);

    console.log("\n🚀 Starting commit generation:");
    console.log(
      `📅 Date Range: ${selectedConfig.startDate} to ${selectedConfig.endDate}`
    );
    console.log(`📊 Total commits planned: ${selectedConfig.totalCommits}`);
    if (dryRun) console.log("🔍 DRY RUN - No commits will be created\n");

    // Get random dates
    const commitDates = getRandomDates(
      selectedConfig.startDate,
      selectedConfig.endDate,
      selectedConfig.totalCommits
    );

    let commitCount = 0;

    // Create commits for each date
    for (const date of commitDates) {
      if (commitCount >= selectedConfig.totalCommits) break;

      const commitsToday =
        Math.floor(
          Math.random() *
            (selectedConfig.maxCommitsPerDay -
              selectedConfig.minCommitsPerDay +
              1)
        ) + selectedConfig.minCommitsPerDay;

      for (
        let i = 0;
        i < commitsToday && commitCount < selectedConfig.totalCommits;
        i++
      ) {
        if (!dryRun) {
          // Update file and create commit
          updateFileContent(FILE_PATH);
          const time = getRandomTime();
          const commitDate = moment(date).set(time).format();

          await git.add(".");
          await git.commit(`Update contribution ${commitCount + 1}`, {
            "--date": commitDate,
          });
        }

        commitCount++;
        progress.update(commitCount);
      }
    }

    console.log(
      `\n🎉 Successfully ${
        dryRun ? "simulated" : "created"
      } ${commitCount} commits`
    );
    if (!dryRun) console.log("📤 Now run: git push origin main");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const configType = args[0] || CONSTANTS.DEFAULT_CONFIG;
const dryRun = args.includes("--dry-run");

// Run the script
createCommits(configType, dryRun);
