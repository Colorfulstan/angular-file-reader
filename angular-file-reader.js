'use strict';
angular.module('tw.services.fileReader', []);

angular.module('tw.services.fileReader').factory('twFileReader', ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
	var FileReader = $window.FileReader;

	return {
		/**
		 * @param fileOrBlob
		 * @param [scope] default: $rootScope
		 * @returns {Promise<string>}
		 */
		readAsDataURL: function readAsDataURL(fileOrBlob, scope) {
			return read('AsDataURL', fileOrBlob, scope);
		},
		/**
		 * @param fileOrBlob
		 * @param [scope] default: $rootScope
		 * @returns {Promise<Array>}
		 */
		readAsArrayBuffer: function (fileOrBlob, scope) {
			return read('AsArrayBuffer', fileOrBlob, scope);
		},
		/**
		 * @param fileOrBlob
		 * @param [scope] default: $rootScope
		 * @param [encoding]
		 * @returns {Promise<string>}
		 */
		readAsText: function (fileOrBlob, scope, encoding) {
			return read('AsText', fileOrBlob, scope, encoding);
		}
	};

	/**
	 *
	 * @param method 'AsArrayBuffer' | 'AsDataURL' | 'AsText'
	 * @param fileOrBlob
	 * @param [scope]
	 * @param [encoding] only used when method = 'AsText'
	 * @returns {Promise<string | Array>} Array
	 */
	function read(method, fileOrBlob, scope, encoding) {
		scope = scope || $rootScope;

		// NOTE: AsBinaryString is deprecated / non-standard. AsArrayBuffer should be used instead
		var validMethods = ['AsArrayBuffer', 'AsDataURL', 'AsText'];
		if (validMethods.indexOf(method) === -1) { throw new TypeError('Invalid method given: ' + method + ' valid methods are: ' + validMethods.toString());}

		var methodName = 'read' + method;
		return $q(function (resolve, reject) {
			var reader = new FileReader();

			reader.onload = function onload() {
				scope.$apply(function () {
					resolve(reader.result);
				});
			};

			reader.onerror = function onerror() {
				scope.$apply(function () {
					reject(reader.error);
				});
			};

			if (method === 'AsText'){
				reader[methodName](fileOrBlob, encoding);
			} else {
				reader[methodName](fileOrBlob);
			}
		});
	}
}]);
