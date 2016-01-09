var locations = require('./endpoints/locations'),
    journeys = require('./endpoints/journeys');

module.exports = (function () {
    return {
        locations: locations,
        journeys: journeys
    }
})();