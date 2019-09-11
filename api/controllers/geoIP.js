'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var Pool = require('pg').Pool;

var pool = new Pool({
	host: 'localhost',
	port: 5432,	
	database: 'postgres',	
	user: 'postgres',
	password: '',
	});

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
    getLocation: getLocation
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function getLocation(req, res, next) {
    var ip = req.swagger.params.ip.value || '1.1.1.1'

    pool.query('SELECT network, city_name, country_name, country_iso_code FROM geoip_blocks INNER JOIN geoip_locations ON geoip_blocks.geoname_id = geoip_locations.geoname_id WHERE network >>= $1::inet', [ip], (error, results) => {
        if (error) {
            next(error)
        } else {
            return res.json({
                network: results.rows[0].network,
                city_name: results.rows[0].city_name,
                country_name: results.rows[0].country_name, 
                country_iso_code: results.rows[0].country_iso_code                 
            })
        }
    })
};