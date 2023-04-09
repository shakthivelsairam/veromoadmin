Veromo Adminimiser
===

## Requirements
- Node.js [^6.2.2] (prefer using NVM [mac](https://github.com/creationix/nvm)|[windows](https://github.com/coreybutler/nvm-windows))
- Git [^2.16.1](https://git-scm.com/downloads) (with Git Bash installed on Windows machines)
- SSH key [configured](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/)

## Setup
 - nodejs `nvm use 6.2`
 - gulp-cli `npm install -g gulp-cli@^2.0.1`
 - bower `npm install -g bower@^1.8.2`
 - Map `127.0.0.1 local.app.veromo.com.au` in your `/etc/hosts`
 
## Install
 - `npm install`
 - `bower install`

## Development:
 - `gulp` to start watchers and server
 - Browse `http://local.app.veromo.com.au:3000`

For local aviator development (local.api.veromo.com.au) see [Veromo/aviator](https://github.com/Veromo/aviator)

### Endpoints
 To reference the `staging` endpoint for authentication and ajax requests:
 - Add key `va.dev.environmentPreference` and value `stg` to your localStorage under `local.app.veromo.com.au`

## Gulp tasks
* `gulp` to watch and compiles files, and launch browser sync server
* `gulp serve:dist` to launch a server on your optimized application
* `gulp build` to build an optimized version of your application in `/dist`
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

# References
- git branching -> http://confluence.veromo.com/x/BQEo
- nvm -> http://confluence.veromo.com/x/loCPAQ

## Style guide
 - [github.com/johnpapa/angular-styleguide](https://github.com/johnpapa/angular-styleguide/tree/master/a1)
 - [cssguidelin.es](http://cssguidelin.es/)

Please use `jsDocs` commenting to define and describe functions APIs
```
/**
 * Check a string against the valid types array.
 * @param typeToCheck 'string'
 * @returns {boolean}
 */
function validateType(typeToCheck) {
    return ValidOnceFormTypes.indexOf( typeToCheck ) >= 0;
}
```

Angular Services are `UpperCamelCase`. Variables and functions are `lowerCamelCase`.
