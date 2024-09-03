# Rick And Morty Hub Backend API

**This Node.js API provides endpoints to interact with the Rick and Morty universe, including fetching characters, locations, and allowing users to favorite characters**


## Table of contents
- [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps](#steps)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Technologies](#technologies)
- [License](#license)


## Installation

### Prerequisites
- Nodejs(20.17)
- MongoDB

### Steps
1. Clone the repository.
2. Enter the repository.
3. Install the necessary packages using **npm install**.
4. Use **npm run dev** to run the project in the development mode.
5. Run **npm run build** to run build the project using required dependencies.
6. Run **npm run start** to run the project in production mode.


## Configuration

For Running this project to run we would need to setup the .env file and the mongodb database with the required fields

- ### **Env file (.env.development OR .env.production)**
```
## MonogDB Database variables

UNAME=
PASSWORD=
DB_RNM=
DB_USER=

JWT_SECRET=
JWT_REFRESH_SECRET=
```

- ### MongoDB Database

This project uses 2 databases
- **Database 1** &rarr; Storing Character and Locations information
```
Collection and Fields (Data type of Each field)

1) characters
    id: number
    name: string
    status: string (Filterable)
    species: string (Filterable)
    type: string
    gender: string (Filterable)
    image: string
    last_location: Object
        name: string
        location: string


2) locations
    id: number
    name: string
    type: string
    dimension: string
    last_known: number[]


```

- **Database 2** &rarr; Storing User information
```
Collection and Fields (Data type of Each field)

1) users
    id: BSON
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date

```

## Usage

This Project is used as an API Backend for providing the data to the RicknMorty Hub Frontend. It is also used to provide endpoints to the frontend to save the user data to database during login and registration.


## Endpoints

- Character endpoints.
    1. /api/characters &rarr; Takes query parameter **page**
    2. /api/character/:id &rarr; Takes param character id
    3. /api/character/filter &rarr; Takes query param **page** and a json data with filters

- Location endpoints
    1. /api/locations &rarr; Takes the query parameter **page**
    2. /api/location/:id &rarr; Takes the param location id.


- User endpoints
    1. /api/auth/register &rarr; Takes a json data with  user fields
    2. /api/auth/login &rarr; Takes a json datao with username and password



## Authentication

This project uses JWT Authentication. Needs to verify the access token to use the character and location endpoints.


## Technologies

- Nodejs
- JWT
- MongoDB
- Mongoose

## License

This project is licensed under the MIT License.