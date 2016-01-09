var expect = require('expect'),
    moment = require('moment');
var journeys = require('../../lib/endpoints/journeys');

describe('journeys', function () {
    describe('plan', function () {
        it('should be able to plan', function (done) {
            /* Given */
            var myTrip = {
                'before': 1,
                'after': 5,
                'sequence': 1,
                'byBus': true,
                'bySubway': true,
                'byTram': true,
                'byTrain': true,
                'interchangeTime': 'standard',
                'dateTime': moment().format('YYYY-MM-DDTHHmm'),
                // 'searchType': .... Documentation unclear
                'from': 'station-amsterdam-centraal',
                'to': 'station-enschede'
            };

            /* When */
            journeys.plan(myTrip, function (e) {
                throw e;
            }, function (result) {
                /* Then */
                expect(result.journeys).toExist();
                done()
            })
        })
    });
});
    
