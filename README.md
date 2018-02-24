# Firestore Query Browser

This project is hosted at [https://firestore-query-browser.firebaseapp.com/](https://firestore-query-browser.firebaseapp.com/).

## Usage

1. Get the your Firebase Project's config from the [Firebase Console](ttps://console.firebase.google.com/). The config should looks like this:
```json
{
  apiKey: "AIzaSyCzpisEJhHYFR09Rh48NAQX6g3gwG2v2U0",
  authDomain: "firestore-query-browser.firebaseapp.com",
  databaseURL: "https://firestore-query-browser.firebaseio.com",
  projectId: "firestore-query-browser",
  storageBucket: "firestore-query-browser.appspot.com",
  messagingSenderId: "567385024694"
}
```
2. Go to [https://firestore-query-browser.firebaseapp.com/](https://firestore-query-browser.firebaseapp.com/), click on 'New', paste the config and click on 'Add App'

3. Optionally, you can add `firestore-query-browser.firebaseapp.com/` to your Authorized domains in the [Firebase Console](ttps://console.firebase.google.com/) --> Authentication --> Sign-In-Methods --> Authorized domains

4. Insert a path and a query (or click on one of the Examples below)
5. click 'fetch' and find the results below.

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.1. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

