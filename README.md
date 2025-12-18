# 🏋️ Fitness Challenge App

> 🌐 **[Try it live!](https://fitness-challenge-app.bernardolopez.me)**

A React-based fitness challenge tracking application where users can start challenges, track goals, compete with friends, and view leaderboards.

## 📋 Features

- **🏁 Start Challenges** - Browse and start new fitness challenges
- **💪 My Challenges** - Track your active challenges with progress indicators
- **🏆 Leaderboard** - See how you rank against other users
- **👥 Friends** - View your friends list
- **🎯 Goal Tracking** - Check off goals as you complete them
- **👥 Challenge Friends** - Invite friends to join your challenges

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download the repository

2. Install dependencies:

```bash
npm install
```

3. Build the application:

```bash
node build.js
```

## 🖥️ Running the App

### Option 1: Open HTML File Directly

Simply open `index.html` in your browser:

- Navigate to the project folder
- Double-click on `index.html`
- Or right-click → **Open with** → Select your browser

### Option 2: VS Code Live Server (Recommended)

1. Install the **Live Server** extension in VS Code:

   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X)
   - Search for "Live Server"
   - Install the extension by Ritwick Dey

2. Open the project in VS Code

3. Right-click on `index.html` in the file explorer

4. Select **"Open with Live Server"**

5. The app will open in your default browser at `http://127.0.0.1:5500`

### Option 3: Using Serve (for Testing)

```bash
npx serve -p 3000
```

Then open `http://localhost:3000` in your browser.

## 🏗️ Building the App

To rebuild after making changes to the source files:

```bash
node build.js
```

This bundles the React components from `src/` into `dist/bundle.js`.

## 🧪 Running Tests

### Install Playwright (first time only)

```bash
npx playwright install
```

### Run End-to-End Tests

```bash
npx playwright test
```

The tests will:

- Open a browser window (non-headless mode)
- Navigate through all app sections
- Highlight tested elements with ✅ badges
- Validate all components and interactions

### Test Coverage

The E2E tests cover:

- ✅ Start Component (title, challenges list, nav selection)
- ✅ Challenge Detail (title, description, duration, goals)
- ✅ Friends Modal (user selection, start challenge)
- ✅ My Challenges (list, progress indicators)
- ✅ Leaderboard (rankings, medals)
- ✅ My Friends (friends list)

## 📁 Project Structure

```
fitness-challenge-app/
├── index.html              # Main HTML file
├── build.js                # esbuild configuration
├── package.json            # Dependencies
├── playwright.config.js    # Test configuration
├── dist/
│   ├── bundle.js          # Compiled JavaScript
│   └── bundle.css         # Compiled CSS
├── src/
│   ├── main.jsx           # App entry point
│   ├── styles.css         # Global styles
│   ├── data/
│   │   └── initialData.js # Initial challenges & users data
│   └── components/
│       ├── FitnessApp.jsx/.css
│       ├── NavBar.jsx/.css
│       ├── Start.jsx/.css
│       ├── ChallengeCard.jsx/.css
│       ├── ChallengeDetail.jsx/.css
│       ├── MyChallenges.jsx/.css
│       ├── MyChallengeCard.jsx/.css
│       ├── Leaderboard.jsx/.css
│       ├── LeaderboardCard.jsx/.css
│       ├── MyFriends.jsx/.css
│       ├── MyFriendsCard.jsx/.css
│       ├── FriendsModal.jsx/.css
│       └── FriendsChallengeProgress.jsx/.css
└── tests/
    └── app-tests.spec.js   # Playwright E2E tests
```

## 🎮 How to Use

1. **Start a Challenge**: Go to Start Challenges → Click on any challenge
2. **Invite Friends**: Click "Challenge Friends" → Select friends → Start Challenge
3. **Track Progress**: Check off goals as you complete them
4. **View Progress**: See your challenges in My Challenges with color-coded progress
5. **Check Rankings**: View the Leaderboard to see top performers
6. **See Friends**: Browse your friends list in My Friends

## 🛠️ Technologies

- **React 19** - UI library
- **esbuild** - Fast JavaScript bundler
- **Playwright** - End-to-end testing
- **CSS3** - Styling with CSS variables
- **localStorage** - Data persistence

## 📝 License

ISC
