# Build an E-Commerce App with React Native and Stripe

This app is the result of the React Native School course ["Build an E-Commerce App with React Native and Stripe"](https://www.reactnativeschool.com/build-an-e-commerce-app-with-react-native-and-stripe).

Throughout this course you learn to build an both a mobile app, using React Native, that runs on iOS and Android and allows a user to purchase deserts through it. Not only do you build a mobile app but also the server API to support the app, using Next.js.

This app incorporates:

- A global shopping cart (using [Zustand](https://github.com/pmndrs/zustand))
- Stripe for secure and easy checkout
- User accounts following industry best practices
- State and API management
- And more! Browse the source code to learn more about it.

## How to Run the App

After cloning the repo you'll have two directories - `server` and `mobile`.

### Server

Before anything else, you'll need a Stripe account and will need to [copy your public and secret keys](https://stripe.com/docs/keys).

- Install dependencies: `yarn`
- Copy `.env.template` to `.env` and add the necessary values.
- Start the server: `yarn dev`

### Mobile App

You'll need the [React Native CLI](https://reactnative.dev/docs/environment-setup) installed in order to run this app.

- Install dependencies: `yarn`
- Instal iOS native depencies: `npx pod-install`
- Copy `.env.template` to `.env` and add the necessary values.
  - **Note:** If you're running the app on a physical device or Android emulator you'll need to use your machine's IP address in place of `localhost` for the `API_URL` in your environment file.
- Run on iOS: `yarn ios`
- Run on Android: `yarn android`

---

Questions, comments, issues? Please open an issue.
