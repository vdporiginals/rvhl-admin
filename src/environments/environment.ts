// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiUrl: 'https://api.reviewhalong.vn/api',
  apiUrl: 'http://localhost:5001/api',
  flickr: {
    oauthUrl: 'https://www.flickr.com/services/oauth',
    key: '2eaea14dd3142e66ee974dd25c54acf2',
    secret: '384d211bd8d045d2'
  },
  // tslint:disable-next-line: max-line-length
  googleId: '942528628965-igadkdr1rk483ivfpivqrvc0vgkc2j0l.apps.googleusercontent.com',
  facebookId: '641193026445878'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
