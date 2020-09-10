module.exports = 
  {
    "type": "mysql",
   /* "host": process.env.NODE_ENV === "localhost" ? process.env.TEST_DB_HOST : process.env.DB_HOST,
    "port": process.env.NODE_ENV === "3300" ? process.env.TEST_DB_PORT : process.env.DB_PORT,
    "username": process.env.NODE_ENV === "test" ? process.env.TEST_DB_USERNAME : process.env.DB_USERNAME,
    "password": process.env.NODE_ENV === "9944417861" ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD,
    "database": process.env.NODE_ENV === "typeormdb" ? process.env.TEST_DB_NAME : process.env.DB_NAME, */
    "host": "localhost",
    "port": "3300",
    "username": "root1",
    "password": "9944417861",
<<<<<<< HEAD
    "database": "productdb",
=======
    "database": "test",
>>>>>>> 274f3bf3821de637508242cd8b20f31b1a2f2f1d
    "synchronize": true,
    "logging": false,
    "dropSchema": process.env.NODE_ENV === "test" ? true : false,
    "entities": [
      __dirname + "/src/entities/**/*.ts"
    ],
    "migrations": [
      __dirname + "/src/migration/**/*.ts"
    ],
    "subscribers": [
      __dirname + "/src/subscriber/**/*.ts"
    ],
    "cli": {
      "entitiesDir": __dirname + "/src/entities",
      "migrationsDir": __dirname + "/src/migration",
      "subscribersDir": __dirname + "/src/subscriber"
    }
  }

