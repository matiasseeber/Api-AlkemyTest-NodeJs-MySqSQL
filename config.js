const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize("fYv8Qy0H3i", "fYv8Qy0H3i", "QiVmfpnZ0u", {
    host: "remotemysql.com",
    dialect: "mysql"
});

const database = {}

database.Personajes = require("./src/model/Personajes.js")(sequelize, DataTypes);
database.Peliculas = require("./src/model/Peliculas.js")(sequelize, DataTypes);
database.Generos = require("./src/model/Generos.js")(sequelize, DataTypes);
database.generosXpelicula = require("./src/model/generosXpelicula")(sequelize, DataTypes);

database.Personajes.belongsTo(database.Peliculas, { foreignKey: "idPelicula" });
database.Peliculas.hasMany(database.Personajes, { foreignKey: "id" });

database.generosXpelicula.belongsTo(database.Peliculas, { foreignKey: "idPelicula" });
database.Peliculas.hasMany(database.generosXpelicula, { foreignKey: "id" });
database.generosXpelicula.belongsTo(database.Generos, { foreignKey: "idGenero" });
database.Generos.hasMany(database.generosXpelicula, { foreignKey: "id" });

sequelize.sync()

/*

Username: fYv8Qy0H3i

Database name: fYv8Qy0H3i

Password: QiVmfpnZ0u

Server: remotemysql.com

Port: 3306
*/