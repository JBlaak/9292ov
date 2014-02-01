/**
 * Example planning of a journey
 *
 * @author  Joris Blaak <joris.blaak@gmail.com>
 * 
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT 
 * WARRANTY OF ANY KIND. ONLY OUR CLIENTS FOR CUSTOM SOFTWARE 
 * ARE ENTITLED TO A LIMITED WARRANTY UP TO SIX WEEKS AFTER 
 * COMPLETION OR DEPLOYMENT. SEE OUR ARTICLE 5 OF OUR GENERAL  
 * TERMS AND CONDITIONS FOR MORE INFORMATION ON OUR WARRANTY. 
 */
var ov = require('../lib/9292.js').get9292();

var params = {
	'before': 1,
	'after': 5,
	'sequence': 1,
	'byBus': true,
	'bySubway': true,
	'byTram': true,
	'byTrain': true,
	'interchangeTime': 'standard', 
	'dateTime': '2014-01-05T1809', //yyyy-MM-ddTHHmm
	// 'searchType': .... Documentation unclear
	'from': 'station-amsterdam-centraal',
	'to': 'station-enschede'
};

ov.journeys.plan(params, function(result) {
	console.log(result);
});
