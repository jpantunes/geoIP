# geoIP
 get geolocation information for IPv4 and IPv6 addresses using Maxmind's free database (https://dev.maxmind.com/geoip/geoip2/geoip2-city-country-csv-databases/)



## Stack
 - docker
 - postgres
 - nodejs
 - express
 - swagger


## Usage
curl http://localhost:10010/location/81.84.143.19

### output:
{"network":"81.84.140.0/22","city\_name":"Torre da Marinha","country\_name":"Portugal","country\_iso_code":"PT"}

## Running the app
### in docker
npm run start:docker 

### in local machine
npm start OR swagger project start

## Gotcha's
the Maxmind CSV files need to be placed on db_load and the createDB.sql script must be run manually to seed the database. 

## TODO
[] automatically create schema and seed the db with csv data
