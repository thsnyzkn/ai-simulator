# HexaAISimulator

A React Native application that demonstrates AI simulation capabilities using Expo and Firebase integration. The project showcases the implementation of real-time data synchronization using Firestore and serverless computing with Firebase Cloud Functions.

## Technology Stack

- React Native with Expo
- TypeScript
- Firebase (Firestore & Cloud Functions)
- Custom hooks and components
- Clean architecture with separation of concerns

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Expo CLI

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd HexaAISimulator
```

2. Install dependencies for the main project:
```bash
npm install
```

3. Install dependencies for Firebase Functions:
```bash
cd functions
npm install
cd ..
```

## Running the Application

1. Start the Expo development server:
```bash
npx expo start
```

2. Run the Firebase Functions locally (in a separate terminal):
```bash
cd functions
npm run serve
```

## Project Structure

The project follows a clean and modular architecture:

- `/src` - Main application source code
  - `/assets` - Static assets and images
  - `/components` - Reusable React components
  - `/hooks` - Custom React hooks for state management
  - `/navigation` - Navigation configuration
  - `/screens` - Main application screens
  - `/services` - Firebase and generation service integration
  - `/types` - TypeScript type definitions

- `/functions` - Firebase Cloud Functions implementation
- `/assets` - Expo assets (icons, splash screen)

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android
- `npm run ios` - Start the app on iOS
- `npm run web` - Start the app in web browser.
