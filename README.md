# GitHub Activity Generator

A simple tool to generate GitHub activity patterns! Perfect for testing, demonstrations, or filling contribution gaps.

## 🎯 Features

- 📅 Generate commits for any date range
- 🔢 Control how many commits per day
- 📊 See live progress as commits are created
- 🔍 Test your patterns with dry-run mode
- ⏰ Random commit times for natural patterns
- 🗓️ Support for future dates

## 🚀 Getting Started (5 Minutes Setup)

### 1️⃣ Download & Setup

```bash
# Clone this repository
git clone https://github.com/ahmed-abdat/GitHub_Contribution_Generator.git

# Go to the project folder
cd GitHub_Contribution_Generator

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
bash
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
        startDate: "2024-01-01",    // Start date
        endDate: "2024-12-31",      // End date
        minCommitsPerDay: 1,        // Minimum daily commits
        maxCommitsPerDay: 5,        // Maximum daily commits
        totalCommits: 300           // Total commits to create
    }
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
PROGRESS_INTERVAL: 50
```

### Enable Future Dates
In `constants.js`:
```javascript
// Allow commits for future dates
ALLOW_FUTURE_DATES: true
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

- 🐛 Found a bug? [Open an issue](https://github.com/ahmed-abdat/GitHub_Contribution_Generator/issues)
- 💡 Have an idea? [Create a pull request](https://github.com/ahmed-abdat/GitHub_Contribution_Generator/pulls)
- ⭐ Like it? [Star the repo!](https://github.com/ahmed-abdat/GitHub_Contribution_Generator)

## 📝 License

MIT License - Feel free to use in your projects!
