/**
 * Example search
 *
 * @author  Joris Blaak <joris.blaak@gmail.com>
 * 
 * THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT 
 * WARRANTY OF ANY KIND. ONLY OUR CLIENTS FOR CUSTOM SOFTWARE 
 * ARE ENTITLED TO A LIMITED WARRANTY UP TO SIX WEEKS AFTER 
 * COMPLETION OR DEPLOYMENT. SEE OUR ARTICLE 5 OF OUR GENERAL  
 * TERMS AND CONDITIONS FOR MORE INFORMATION ON OUR WARRANTY. 
 */
var ov = require('../9292.js').get9292();

ov.locations.query('enschede', function(result) {
	console.log(result);
});