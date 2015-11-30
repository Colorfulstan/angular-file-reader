angular-file-reader
===================

Provides access to FileReader api in angular

### Get it
```sh
$ npm install angular-file-reader
```

### Use it
* Include in your html
  * `<script src="node_modules/angular-file-reader/angular-file-reader.js"></script>`
* Add module to your module's dependencies
  * `angular.module('myModule', ['tw.services.fileReader'])`
* Inject `twFileReader`
```js
angular.module('app').controller('MyController', ['twFileReader', function(twFileReader) {
  ...
  twFileReader.readAsDataURL(someFile).then(function(dataURL) {
    // do something with dataURL
  });
}]);
```
