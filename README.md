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

```
READ full list of countries -> /api/countries
READ list of countries by language -> /api/countries/:lang (en/ru/by)
READ an existing country by its own name with language -> /api/countries/:lang/:name
CREATE new country -> send POST request to address /api/countries 
UPDATE an existing country by its own id -> send PUT request to address /api/countries/:id
DELETE an existing country by its own id -> send DELETE request to address /api/countries/one/:id

CREATE many countries -> send POST request to address /api/countries/all
DELETE all countries -> send DELETE request to address /api/countries/all
```

_The `name`, `shortName` and `lang` fields is mandatory and should be 'String'_

_The `id` field is filled in automatically_

Also you can read part of `Countries` using pagination. To do this, add the following parameters in the address bar:

```
Read first three countries -> /api/countries?page=1&limit=3

Read second four countries in english -> /api/countries/en?page=2&limit=4
```

If the `limit` parameter is undefined, it is automatically set to 5
