/**
 * 9292 Library to work with NodeJS
 * 
 * @author  Joris Blaak <joris.blaak@gmail.com>
 * 
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT 
 * WARRANTY OF ANY KIND. ONLY OUR CLIENTS FOR CUSTOM SOFTWARE 
 * ARE ENTITLED TO A LIMITED WARRANTY UP TO SIX WEEKS AFTER 
 * COMPLETION OR DEPLOYMENT. SEE OUR ARTICLE 5 OF OUR GENERAL  
 * TERMS AND CONDITIONS FOR MORE INFORMATION ON OUR WARRANTY.  
 */
var _9292ov = function() {

	var self = this;

	/**
	 * Base url
	 * @type String
	 */
	this.base_url = 'api.9292.nl/0.1/';

	/**
	 * Host
	 * @type String
	 */
	this.host = 'api.9292.nl';

	/**
	 * Desired language, available are: nl-NL and en-GB
	 * @type String
	 */
	this.lang = 'en-GB';

	/**
	 * Request helper 
	 * @return void
	 */
	this.request = new function() {

		/**
		 * The callback for on('error', callback)
		 * @param  object e 
		 * @return void   
		 */
		this.error = function(e) {
			console.log('Request throws an error: ' + e.message);
		}

		/**
		 * GET request
		 * @param  String   endpoint 
		 * @param  Object   params 
		 * @param  Function callback with the result
		 * @return void
		 */
		this.get = function(endpoint, params, callback) {

			//Add the lang
			params.lang = self.lang;

			var url = require('url');

			var urlObj = {
				'protocol': 'https',
				'host': self.base_url,
				'pathname': endpoint,
				'query': params
			};

			var options = {
				'port': 80,
				'host': self.host,
				'path': url.format(urlObj),
				'method': 'GET',
				'headers': {

				}
			};

			var http = require('http');
			var req = http.request(options, function(res) {
				var data = '';
				res.setEncoding('utf8');
				res.on('data', function (chunk) {
				    data += chunk;
				});
				res.on('end', function() {
					console.log(data);
					try {
						res.result = eval('(' + data + ')');
					} catch(e) {
						self.request.error(e);
						res.result = null;
					}
					callback.apply(self, [res]);
				});
			});

			req.on('error', self.request.error);
			req.end();
		}

	}

	/**
	 * Plan a journey
	 * @return void
	 */
	this.journeys = new function() {

		/**
		 * Plan a journey, for params and response see:
		 *
		 * https://github.com/timvanelsloo/9292-api-spec/blob/master/docs/resources/journeys.md
		 * 
		 * @param  Object   params   
		 * @param  Function callback 
		 * @return void
		 */
		this.plan = function(params, callback) {
			self.request.get('journeys', params, function(res) {
				callback.apply(self, [
					res.result
					]);
			});
		} 

	}

	/**
	 * Locations namespace
	 * @return void
	 */
	this.locations = new function() {

		/**
		 * Search using all the options and response for info see: 
		 * 
		 * https://github.com/timvanelsloo/9292-api-spec/blob/master/docs/resources/locations.md
		 * 
		 * @param  Object   params        
		 * @param  Function callback 
		 * @return void
		 */
		this.search = function(params, callback) {
			self.request.get('locations', params, function(res) {
				callback.apply(self, [
					res.result
					]);
			});
		}	

		/**
		 * Search using a simple query
		 * @param  String   q        
		 * @param  Function callback 
		 * @return void
		 */
		this.query = function(q, callback) {
			self.locations.search({ 'q': q }, callback);
		}

		/**
		 * Get a station
		 * @param  String   id      
		 * @param  Function callback
		 * @return void
		 */
		this.get = function(id, callback) {
			self.request.get('locations/' + id, {}, function(res) {
				callback.apply(self, [
					res.result
					]);
			});
		}

		/**
		 * Get departure times for a location
		 *
		 * Response: https://github.com/timvanelsloo/9292-api-spec/blob/master/docs/resources/locations/departure-times.md
		 * 
		 * @param  String   id       
		 * @param  Function callback 
		 * @return void
		 */
		this.departureTimes = function(id, callback) {
			self.request.get('locations/' + id + '/departure-times', {}, function(res) {
				callback.apply(self, [
					res.result
					]);
			});
		}

	}

}

/**
 * Get new instance of _9292ov
 * 
 * Add as module:
 *
 * http://stackoverflow.com/questions/5625569/include-external-js-file-in-node-js-app
 * @type function
 */
module.exports.get9292 = function() {
	return new _9292ov();
};