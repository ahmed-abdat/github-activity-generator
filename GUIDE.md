# 📘 Complete Guide to GitHub Contribution Generator

##�� Table of Contents
- [Initial Setup](#-initial-setup)
- [Configuration Guide](#-configuration-guide)
- [Running the Script](#-running-the-script)
- [Troubleshooting](#-troubleshooting)
- [Advanced Usage](#-advanced-usage)

## 🚀 Initial Setup

### Prerequisites
- Node.js installed on your computer
- Git installed and configured
- A GitHub account
- A GitHub repository

### First-Time Setup
1. **Clone the Repository**
   ```bash
   # Clone this repository
   git clone https://github.com/ahmed-abdat/GitHub_Contribution_Generator.git
   cd GitHub_Contribution_Generator

   # Install dependencies
   npm install

   # Configure Git (if not already done)
   git config user.name "ahmed-abdat"
   git config user.email "your.github@email.com"
   ```

## ⚙️ Configuration Guide

### Current Configurations
The `config.js` file contains two preset configurations:

```javascript
// Test Mode (Quick Test)
test: {
    startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    minCommitsPerDay: 1,
    maxCommitsPerDay: 3,
    totalCommits: 10
}

// 2023 Configuration
year2023: {
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    minCommitsPerDay: 1,
    maxCommitsPerDay: 4,
    totalCommits: 200
}
```

## 🏃‍♂️ Running the Script

### Basic Usage
bash
# Test run (10 commits in last 7 days)
node index.js test

# 2023 configuration (200 commits)
node index.js year2023

# Push changes to GitHub
git push origin main
```

### Verifying Results
1. Visit your GitHub profile: https://github.com/ahmed-abdat
2. Check the contribution graph
3. You should see new green squares for the configured dates

## 🔧 Troubleshooting

### Common Issues and Solutions

1. **Module Not Found Errors**
   ```bash
   npm install
   ```

2. **Git Push Fails**
   ```bash
   git pull origin main
   git push origin main
   ```

3. **No Commits Showing**
   - Check if your Git email matches your GitHub email
   - Verify the dates in your configuration
   - Make sure you've pushed to the correct repository

## 🎓 Advanced Usage

### Creating Custom Configurations

1. **Open `config.js`**
2. **Add your configuration:**
   ```javascript
   customConfig: {
       startDate: '2023-06-01',    // Start from June 2023
       endDate: '2023-12-31',      // End in December 2023
       minCommitsPerDay: 2,        // At least 2 commits per day
       maxCommitsPerDay: 6,        // Up to 6 commits per day
       totalCommits: 300           // Total of 300 commits
   }
   ```
3. **Run with your custom config:**
   ```bash
   node index.js customConfig
   ```

### Understanding the Process
- The script creates a `data.txt` file to track changes
- Each commit gets a random time during its assigned day
- Commits are distributed randomly but evenly
- No day gets more than `maxCommitsPerDay` commits
- Days are selected randomly within your date range

## 📝 Notes
- Keep configurations realistic for natural-looking patterns
- The script ensures commits are spread across unique days
- Each run will create different random patterns
- Changes are permanent and will affect your GitHub statistics

## ⚠️ Important Reminders
- Use responsibly and ethically
- Keep configurations reasonable
- This tool is for educational purposes
- Fake contributions may violate GitHub's terms
```