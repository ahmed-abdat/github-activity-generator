# GitHub Activity Generator

A simple tool to generate GitHub activity patterns! Perfect for testing, demonstrations, or filling contribution gaps.

## 🎯 Features

- 📅 Generate commits for any date range
- 🔢 Control how many commits per day
- 📊 See live progress as commits are created
- 🔍 Test your patterns with dry-run mode
- ⏰ Random commit times for natural patterns
- 🗓️ Support for future dates

## ⚙️ How It Works

The tool works in a simple but effective way:

1. **Configuration**: The `config.js` file defines commit patterns (dates, frequency, etc.)
2. **Execution**: When you run `index.js`:
   - It reads your chosen pattern from `config.js`
   - Calculates commit dates and times
   - Creates a small change in `data.txt`
   - Makes a commit with a timestamp
3. **Randomization**: Each commit gets a random time during the day for natural-looking patterns
4. **Progress Tracking**: Shows real-time progress as commits are created
5. **Safety**: Includes dry-run mode to preview changes without making actual commits

## 🚀 Getting Started (2 Minutes Setup)

### 1️⃣ Download & Setup

```bash
# Clone this repository
git clone https://github.com/ahmed-abdat/github-activity-generator.git

# Go to the project folder
cd github-activity-generator

# Install required packages
npm install
```

### 2️⃣ Quick Test

```bash
# Create 10 test commits
node index.js

# Push to GitHub
git push origin main
```

That's it! Check your GitHub profile - you should see new contributions.

## 📖 Available Patterns

### 1. Test Pattern (Default)

- Creates 10 commits in the last 7 days

```bash
node index.js
```

### 2. Full Year Pattern

- Creates 200 commits across 2023

```bash
node index.js year2023
```

### 3. Try Without Making Real Commits

```bash
node index.js year2023 --dry-run
```

## ✨ Create Your Own Pattern

1. Open `config.js`
2. Add your pattern:

```javascript
const config = {
  myPattern: {
    startDate: "2024-01-01", // Start date
    endDate: "2024-12-31", // End date
    minCommitsPerDay: 1, // Minimum daily commits
    maxCommitsPerDay: 5, // Maximum daily commits
    totalCommits: 300, // Total commits to create
  },
};
```

3. Use it:

```bash
node index.js myPattern
```

## ⚙️ Customize Settings

### Show Progress More/Less Often

In `constants.js`:

```javascript
// Show progress every 50 commits
PROGRESS_INTERVAL: 50;
```

### Enable Future Dates

In `constants.js`:

```javascript
// Allow commits for future dates
ALLOW_FUTURE_DATES: true;
```

## 🔍 Troubleshooting

### Commits Not Showing on GitHub?

1. Check your Git email matches GitHub:

```bash
git config user.email
```

2. Make sure it matches your GitHub email

### Push Failed?

Try this:

```bash
git pull origin main
git push origin main
```

### Module Errors?

```bash
npm install
```

## 📁 Project Structure

```
.
├── index.js      # Main script
├── config.js     # Commit patterns
├── constants.js  # Settings
└── .gitignore    # Git ignore rules
```

## 🤝 Need Help?

- 🐛 Found a bug? [Open an issue](https://github.com/ahmed-abdat/github-activity-generator/issues)
- 💡 Have an idea? [Create a pull request](https://github.com/ahmed-abdat/github-activity-generator/pulls)
- ⭐ Like it? [Star the repo!](https://github.com/ahmed-abdat/github-activity-generator)

## 📝 License

MIT License - Feel free to use in your projects!
