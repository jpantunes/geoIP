CREATE TABLE geoip_blocks (
    network cidr,
    geoname_id bigint,
    registered_country_geoname_id bigint,
    represented_country_geoname_id bigint,
    is_anonymous_proxy bool,
    is_satellite_provider bool,
    postal_code varchar(8),
    latitude decimal(9,6),
    longitude decimal(9,6),
    accuracy_radius smallint
);

copy geoip_blocks from '/src/app/db_load/GeoLite2-City-Blocks-IPv4.csv' delimiter ',' csv header;
copy geoip_blocks from '/src/app/db_load/GeoLite2-City-Blocks-IPv6.csv' delimiter ',' csv header;

CREATE INDEX geoip_blocks_network_idx ON geoip_blocks USING gist (network inet_ops);

CREATE TABLE geoip_locations (
    geoname_id bigint,
    locale_code varchar(2),
    continent_code varchar(2),
    continent_name varchar(255),
    country_iso_code varchar(2),
    country_name varchar(255),
    subdivision_1_iso_code varchar(3),
    subdivision_1_name varchar(255),
    subdivision_2_iso_code varchar(3),
    subdivision_2_name varchar(255),
    city_name varchar(255),
    metro_code varchar(3),
    time_zone varchar(255),
    is_in_european_union bool
);

copy geoip_locations from '/src/app/db_load/GeoLite2-City-Locations-en.csv' delimiter ',' csv header encoding 'UTF8';

grant all on schema public to public;
grant all on schema public to postgres;
