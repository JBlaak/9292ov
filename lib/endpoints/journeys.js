var Request = require('../request');

module.exports = {

    /**
     * Plan your journey
     *
     * https://github.com/timvanelsloo/9292-api-spec/blob/master/docs/resources/journeys.md
     *
     * @param params
     * @param onError
     * @param onSuccess
     */
    plan: function (params, onError, onSuccess) {
        var request = new Request('journeys', params);
        return request.execute(onError, onSuccess);
    }
};
