// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAfd0sLT55S9gWkIc3h07eJnAXMcCo1Ge8",
    authDomain: "firecrmprod.firebaseapp.com",
    databaseURL: "https://firecrmprod.firebaseio.com",
    projectId: "firecrmprod",
    storageBucket: "firecrmprod.appspot.com",
    messagingSenderId: "40701286849"
  }
};
