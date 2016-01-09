var Request = require('../request');

module.exports = {
    /**
     * Convenience wrapper for search
     * @param q
     * @param onError
     * @param onSuccess
     */
    query: function (q, onError, onSuccess) {
        return this.search({q: q}, onError, onSuccess);
    },

    /**
     * Search for a locations
     *
     * https://github.com/timvanelsloo/9292-api-spec/blob/master/docs/resources/locations.md
     * @param params
     * @param onError
     * @param onSuccess
     */
    search: function (params, onError, onSuccess) {
        var request = new Request('locations', params);
        return request.execute(onError, onSuccess);
    },

    /**
     * Find details of a single station
     * @param id
     * @param onError
     * @param onSuccess
     */
    get: function (id, onError, onSuccess) {
        var request = new Request('locations/' + id);
        return request.execute(onError, onSuccess);
    },

    /**
     * Fetch departure times
     *
     * https://github.com/timvanelsloo/9292-api-spec/blob/master/docs/resources/locations/departure-times.md
     *
     * @param id
     * @param onError
     * @param onSuccess
     */
    departureTimes: function (id, onError, onSuccess) {
        var request = new Request('locations/' + id + '/departure-times');
        return request.execute(onError, onSuccess);
    }
};
