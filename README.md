# MizMan - Holistic Life Balance Tracker

**A high-performance life-tracking app that merges spiritual discipline, physical health, mental wellbeing, and financial growth into a unified "Master Score".**

---

## 🎯 The Mission

Most habit trackers are fragmented. You need 5 different apps to track Namaz, Gym, and Portfolio. **MizMan** unifies them to provide a **Holistic Discipline Score** that shows your true life balance.

---

## ✨ Features

### The Big Five Modules

1. **🌙 Spirit** - Namaz & Quran tracking with progressive streak system
2. **💪 Body** - Gym/Fitness consistency tracking
3. **🧠 Mind** - Screen Time monitoring and digital minimalism
4. **📈 Wealth** - Manual investment ledger (Stocks, MF, Pension, Crypto)
5. **📊 Master Dashboard** - Unified view with radar chart showing balance across all pillars

### Key Highlights

- **Master Streak System** - Tracks your overall consistency across all modules
- **Weekend Wealth Review** - Deliberate UI choice to avoid daily market anxiety
- **Manual Entry Philosophy** - Mindful intentionality over automation
- **Premium UI/UX** - Modern design with gradients, animations, and dark mode
- **Privacy First** - No bank APIs, 100% user-controlled data

---

## 🛠️ Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **UI Components**: Custom components with Expo Linear Gradient
- **Icons**: Expo Vector Icons (Ionicons)
- **State Management**: React Context (to be implemented)
- **Data Persistence**: AsyncStorage (to be implemented)

---

## 📂 Project Structure

```
mizman/
├── src/
│   ├── screens/
│   │   ├── Dashboard/      # Master dashboard with ring progress
│   │   ├── Spirit/         # Namaz & Quran tracking
│   │   ├── Body/           # Fitness tracking
│   │   ├── Mind/           # Screen time monitoring
│   │   ├── Wealth/         # Investment ledger
│   │   └── Analytics/      # Progress reports
│   ├── components/         # Reusable UI components
│   ├── navigation/         # Tab & stack navigators
│   ├── constants/          # Theme, colors, typography
│   ├── types/              # TypeScript interfaces
│   ├── contexts/           # React Context providers
│   └── utils/              # Helper functions
├── assets/                 # Images, fonts, icons
└── App.tsx                 # Root component
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app (for testing on physical device)

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platform
npm run ios      # iOS Simulator
npm run android  # Android Emulator
npm run web      # Web Browser
```

### Development

1. Scan the QR code with Expo Go (Android) or Camera app (iOS)
2. The app will hot-reload as you make changes
3. Press `r` in the terminal to manually reload

---

## 🎨 Design Philosophy

### Mindful Wealth Management

Unlike other finance apps, MizMan uses **manual weekly updates** instead of automated bank connections. This forces users to:

- Actually look at their investment progress
- Make conscious financial decisions
- Avoid daily market anxiety
- Turn finance into a mindful Sunday ritual

### The Master Score Algorithm

The Master Score (0-100%) is calculated based on:

- **Spirit**: Daily Namaz completion + Quran reading
- **Body**: Workout consistency
- **Mind**: Screen time vs. focus time ratio
- **Wealth**: Portfolio growth trend (weekly)

Each pillar contributes equally to create a balanced life score.

---

## 🗺️ Roadmap

### Phase 1 (Current)

- [x] Project setup with Expo
- [x] Navigation structure
- [x] Master Dashboard UI
- [x] Module placeholder screens
- [ ] Spirit module implementation
- [ ] Body module implementation

### Phase 2

- [ ] Mind module with screen time integration
- [ ] Wealth module with investment tracking
- [ ] Analytics with charts and heatmaps
- [ ] Data persistence with AsyncStorage

### Phase 3

- [ ] Streak recovery system
- [ ] Weekly/Monthly PDF reports
- [ ] Progressive theme evolution (Bronze → Gold)
- [ ] Push notifications for reminders

### Phase 4

- [ ] Cloud sync (optional)
- [ ] Social features (leaderboards)
- [ ] Advanced analytics
- [ ] Export data functionality

---

## 📱 Screenshots

_(Coming soon)_

---

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

---

## 📄 License

MIT License - feel free to use this for your own projects

---

## 💡 For Antigravity Community

### Why Manual Over Automated?

In a world of automation, **manual intentionality** is a feature, not a bug. By requiring users to manually update their investments every Sunday, we're not being lazy—we're being deliberate. This creates a weekly ritual that forces reflection and conscious engagement with one's financial health.

### The Tech Behind the Beauty

- **Custom SVG Ring Progress** - Built from scratch using react-native-svg
- **Gradient System** - Expo Linear Gradient for premium aesthetics
- **Type-Safe Navigation** - Full TypeScript support with proper typing
- **Modular Architecture** - Easy to extend with new modules

---

**Built with ❤️ for a balanced life**
