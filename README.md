# Andrey Shamrey

## This repo was created for use backend in travel-app task

### To work on a local server, clone this repo and follow the instructions below.

## NPM commands

#### Initialization
`> npm install`

#### Server start
`> npm run dev` to start with dev-mode 

or

`> npm run start`

--- 

### Also you can start the server by following [this](https://travel-app-back-113.herokuapp.com/) link 

__For Countries:__
```
READ full list of countries -> /api/countries
READ an existing country by its own name -> /api/countries/:name
CREATE new country -> send POST request to address /api/countries 
UPDATE an existing country by its own id -> send PUT request to address /api/countries/:id
DELETE an existing country by its own id -> send DELETE request to address /api/countries/one/:id

CREATE many countries -> send POST request with array of countries to address /api/countries/all
DELETE all countries -> send DELETE request to address /api/countries/all
```
 - _The `shortName` field is mandatory and should be 'String'_
 - _The `timeDifference` field is mandatory and should be 'Number'_
 - _The `latlng` field is mandatory and should ne 'Array' with coordinates of country_
 - _The `capitalCoord` field is mandatory and should ne 'Array' with coordinates of country's capital_
 - _The `currency` field is mandatory and must contain `code`, `name` and `symbol` fields that represent information about the currency of the country_
 - _The `mainPlace` field is mandatory and must contain `image` field with link to image and `en` `ru` and `be` fields that contain `name` and `description` fields_
 - _The `video` field is mandatory and should be 'String'_
 - _The `info` field is mandatory and must contain `en` `ru` and `be` fields that contain `name`, `capital` and `description` fields_
 - _The `id` field is filled in automatically_

__For Persons:__
```
READ full list of persons -> /api/persons
READ full list of persons (without photo) -> /api/persons/withoutPhoto
READ an existing person by its own nickname -> /api/persons/full/:name
READ an existing person by its own nickname and password -> /api/persons/one/:name/:pass
CREATE new person -> send POST request to address /api/persons
UPDATE an existing person by its own id -> send PUT request to address /api/persons/:id
UPDATE same fields of an existing person by it own id -> send PATCH request to address /api/persons/:id
DELETE an existing person by its own id -> send DELETE request to address /api/persons/:id
```
 - _The `nickname` field is mandatory, unique and should be 'String'_
 - _The `pass` field is mandatory and should be 'String' with length between 8 and 20_
 - _The `photo` field should be 'String' in base64 data_
 - _The `id` field is filled in automatically_

__For Places:__
```
READ full list of places -> /api/places
READ an existing places by country -> /api/places/:country
CREATE new place -> send POST request to address /api/places
UPDATE an existing place by its own id -> send PUT request to address /api/places/:id
UPDATE same fields of an existing place by it own id -> send PATCH request to address /api/places/:id
DELETE an existing place by its own id -> send DELETE request to address /api/places/one/:id

CREATE many places -> send POST request with array of places to address /api/places/all
DELETE all places -> send DELETE request to address /api/places/all
```
 - _The `country` field is mandatory and should be 'String'_
 - _The `image` field is mandatory and should be 'String'_
 - _The `rating` field should be 'Number'_
 - _The `personsId` field should be 'Array' which contain ID's of persons who rated the place_
 - _The `info` field is mandatory and must contain `en` `ru` and `be` fields that contain `name` and `description` fields_
 - _The `id` field is filled in automatically_

Also you can read part of data using pagination. To do this, add the following parameters in the address bar:

```
Read second three countries -> /api/countries?page=2&limit=3

Read first seven persons -> /api/persons?page=1&limit=7

Read first five places in Australia -> /api/places/Australia?page=1
```

If the `limit` parameter is undefined, it is automatically set to 5
