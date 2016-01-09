var http = require('http'),
    url = require('url');

/**
 * Request helper
 * @param endpoint
 * @param params
 */
module.exports = function (endpoint, params) {

    /**
     * Base url
     * @type String
     */
    var baseUrl = 'api.9292.nl/0.1/';

    /**
     * Host
     * @type String
     */
    var host = 'api.9292.nl';

    /**
     * Desired language, available are: nl-NL and en-GB
     * @type String
     */
    var lang = 'en-GB';

    /**
     * Create the target for the request
     * @returns string
     */
    function target() {
        if (!params) {
            params = {}
        }
        params.lang = lang;
        return url.format({
            'protocol': 'https',
            'host': baseUrl,
            'pathname': endpoint,
            'query': params
        });
    }

    /**
     * Process the request
     * @param response
     * @param onSuccess
     * @param onError
     */
    function processor(response, onSuccess, onError) {
        var json = "";
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            json += chunk;
        });
        response.on('end', function () {
            try {
                var data = JSON.parse(json);
                if (data.exception) {
                    onError.call(null, data.exception);
                } else {
                    onSuccess.call(null, data);
                }
            } catch (e) {
                onError.call(null, e);
            }
        });
    }

    /**
     * Execute a request
     * @param onError
     * @param onSuccess
     */
    this.execute = function (onError, onSuccess) {
        var options = {
            'port': 80,
            'host': host,
            'path': target(),
            'method': 'GET',
            'headers': {}
        };

        var req = http.request(options, function (response) {
            processor(response, onSuccess, onError);
        });

        req.on('error', onError);

        return req.end();
    }
};