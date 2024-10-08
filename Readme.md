# Expense Sharing App

This is a mobile application built with React Native and Expo that allows users to create and manage shared expenses among groups of people.

## Features

- Create and manage events for shared expenses
- Add participants to events
- Set custom expense amounts and split percentages
- Support for recurring payments (monthly or annually)
- View and edit event details

## Tech Stack

- React Native
- Expo
- TypeScript
- React Query for state management and API calls
- Axios for HTTP requests
- React Native Reanimated for animations
- Tailwind CSS (via NativeWind) for styling

## Project Structure

- `app/`: Contains the main screens and navigation logic
- `components/`: Reusable React components
- `services/`: API service functions
- `types/`: TypeScript type definitions

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/expense-sharing-app.git
   cd expense-sharing-app
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Start the Expo development server:
   ```
   npx expo start
   ```

## Local Execution

To run the app on your local machine:

1. Make sure you have Node.js and npm (or yarn) installed on your computer.

2. Install Expo CLI globally:
   ```
   npm install -g expo-cli
   ```

3. Install the Expo Go app on your iOS or Android device.

4. After starting the Expo development server (step 3 in Getting Started), you'll see a QR code in your terminal.

5. On Android, open the Expo Go app and scan the QR code.
   On iOS, use the built-in Camera app to scan the QR code, then tap the banner that appears.

6. The app should now load on your device. Any changes you make to the code will be reflected in real-time.

## API Integration

The app uses a backend API for data persistence. The `eventService` in `services/event.service.ts` handles all API calls related to events.


