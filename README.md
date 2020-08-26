[![Mentioned in awesome-firebase](https://awesome.re/mentioned-badge.svg)](https://github.com/jthegedus/awesome-firebase)

# Firestore Query Browser

![Overview](https://github.com/rechenberger/firestore-query-browser/raw/master/docs/overview.jpg)

## Features

- Multiple projects
- Easy account switching: "Does this query run as user XYZ?"
- Querying with the standard JS query syntax for easy copying & pasting between firestore query browser & your app
- Query history
- Create documents in single or batch mode
- Set / Update / Delete single documents
- Set / Update / Delete all documents matching a query
- Export documents as CSV or JSON

## Live Demo

Checkout our live demo at [https://firestore-query-browser.firebaseapp.com/](https://firestore-query-browser.firebaseapp.com/).

Just add the default application & start querying the 🦕

## Usage

### Adding your app

1. Get the your Firebase Project's config from the [Firebase Console](ttps://console.firebase.google.com/). The config should looks like this:
```js
{
  apiKey: "AIzaSyCzpisEJhHYFR09Rh48NAQX6g3gwG2v2U0",
  authDomain: "firestore-query-browser.firebaseapp.com",
  databaseURL: "https://firestore-query-browser.firebaseio.com",
  projectId: "firestore-query-browser",
  storageBucket: "firestore-query-browser.appspot.com",
  messagingSenderId: "567385024694"
}
```
2. Go to [https://firestore-query-browser.firebaseapp.com/](https://firestore-query-browser.firebaseapp.com/), paste the config and click on 'Add App'
3. Optionally, you can add `firestore-query-browser.firebaseapp.com/` to your Authorized domains in the [Firebase Console](ttps://console.firebase.google.com/) --> Authentication --> Sign-In-Methods --> Authorized domains
4. Insert a path and a query (or click on one of the Examples below)
5. Click 'fetch' and find the results below.

### Create an admin user
Because firestore query browser does not use a service account it is limited by your security rules. An easy solution is to create an admin account via password authentication. Add the following code to your firestore.rules and replace `[YOUR ADMIN UID]` with the corresponding id:

```
// Admin has access to every document
match /{document=**} {
    allow read, write: if request.auth.uid == '[YOUR ADMIN UID]'
}
```
Then login to firestore query browser with your admin account.

## Advanced usage

### Dates
Strings that match an ISO datetime regex will be transformed into a date object before saving them to the firestore. For example: 
```json
{
  "time": "2019-01-01T14:12:34.567Z"
}
```

If you want to query a date use `new Date()` around it:

```js
ref
  .where('created', '>=', new Date('2020-08-12T00:00'))
```

### Deleting a key
To delete a key in a document update it with `__del__` as value. For example:
```json
{
  "oldThing": "__del__"
}
```

### Timing
Do you wonder how long your queries take? Just open the developer console in your browser. Every time you query something the query browser logs the time to the console: `get: 317.427978515625ms`


### Work with results in the browser console (lodash)
Sometimes you want to work with the results of your query. Firestore query browser adds the results of your latest query to document.result. Further it exposes lodash so you could write something like this in your developer tools console:
```js
_.map(result, doc => doc.info)
```

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli). Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

