var expect = require('expect');
var locations = require('../../lib/endpoints/locations');

describe('locations', function () {
    describe('query', function () {
        it('should generate a valid response when searching for Enschede', function (done) {
            /* Given */
            var query = 'Enschede';

            /* When */
            locations.query(query, function (e) {
                throw e;
            }, function (result) {
                /* Then */
                expect(result.locations).toExist();
                done()
            })
        });
    });

    describe('search', function () {
        it('should generate a valid response when searching for Enschede', function (done) {
            /* Given */
            var query = 'Enschede';

            /* When */
            locations.search({
                'q': query
            }, function (e) {
                throw e;
            }, function (result) {
                /* Then */
                expect(result.locations).toExist();
                done()
            })
        });

        it('should return an empty list when nothing is returned', function (done) {
            /* Given */
            var query = 'GibberishInputWhichShouldNotHaveAResponse';

            /* When */
            locations.search({
                'q': query
            }, function (e) {
                throw e;
            }, function (result) {
                /* Then */
                expect(result.locations).toExist();
                expect(result.locations.length).toBe(0);
                done()
            })
        });
    });

    describe('get', function () {
        it('should find a single station', function (done) {
            /* Given */
            var station = 'enschede';

            /* When */
            locations.get(station, function (e) {
                throw e;
            }, function (result) {
                /* Then */
                expect(result.location).toExist();
                done()
            })
        })
    });

    describe('departureTimes', function () {
        it('should find the departure times', function (done) {
            /* Given */
            var station = 'station-amsterdam-centraal';

            /* When */
            locations.departureTimes(station, function (e) {
                throw e;
            }, function (result) {
                /* Then */
                expect(result.location).toExist();
                expect(result.tabs).toExist();
                done()
            })
        })
    })
});