require("dotenv").config();
const { Sequelize } = require("sequelize");

// ======================== Models requires
const pokemonDefiner = require("./models/Pokemon");
const typeDefiner = require("./models/Type");

// ======================== Sequelize
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    {
        logging: false,
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    }
);

// ======================== Models definers
pokemonDefiner(sequelize);
typeDefiner(sequelize);
const { Pokemon, Type, PokemonTypes } = sequelize.models;

// ======================== Models relations
Pokemon.belongsToMany(Type, { through: "PokemonsTypes" });
Type.belongsToMany(Pokemon, { through: "PokemonsTypes" });

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize,
};
