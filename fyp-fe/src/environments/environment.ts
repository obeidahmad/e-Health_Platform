// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  meds: 'http://localhost:8080/med',
  appt: 'http://localhost:8081/appt',
  auth: 'http://localhost:8082',
  module_control: "http://localhost:8084/module",
  firebase: {
    apiKey: "AIzaSyBWK9Lxj2AGzTi-pDXgToHMTIH-c4IDG9k",
    authDomain: "e-dispensary-f803d.firebaseapp.com",
    projectId: "e-dispensary-f803d",
    storageBucket: "e-dispensary-f803d.appspot.com",
    messagingSenderId: "160543886984",
    appId: "1:160543886984:web:abfc20058abadef519593d"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
