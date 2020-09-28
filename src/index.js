import darklight from './dark-light'
import datetime from './date-time.js'
import geolocation from './geolocation.js'
import scripts from './scripts'
import share from './share'
import weather from './weather'

// The main purpose of this file is to aggregate the application source
// files together as a Webpack entrypoint. This allows Webpack to bundle
// them together in the `dist` directory it builds to contain the runtime
// bundle.
//
// Webpack implementation details:
// - `index.html` has been changed to include `./dist/main.js` since it
//   bundles all of the scripts above in one place.
// - The following packages have been added to `package.json` 
//   * dotenv-webpack - A Webpack plugin that lets dotenv & Webpack co-exist
//   * webpack - The Webpack app bundler
//   * webpack-cli - A command line interface for Webpack
// - All dotenv code has been moved to weather.js. See the comments there for
//   details regarding how environment variables are accessed & used.
//