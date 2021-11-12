const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const sequelize = new Sequelize("fYv8Qy0H3i", "fYv8Qy0H3i", "QiVmfpnZ0u", {
    host: "remotemysql.com",
    dialect: "mysql"
});

const database = {};

database.Personajes = require("./Personajes.js")(sequelize, DataTypes);
database.Peliculas = require("./Peliculas.js")(sequelize, DataTypes);
database.Generos = require("./Generos.js")(sequelize, DataTypes);
database.generosXpelicula = require("./generosXpelicula")(sequelize, DataTypes);

async function getAllCharacters(querys) {
    let query = "SELECT Personajes.imagenUrl, Nombre FROM Personajes ";
    if (querys.movies != undefined)
        query += "inner join Peliculas on Personajes.idPelicula = " + querys.movies + " and Personajes.Active = 1";
    else
        query += " where Personajes.Active = 1";
    if (querys.name != undefined)
        query += " and Nombre = " + querys.name;
    if (querys.age != undefined)
        query += " and Edad = " + querys.age;
    return sequelize.query(query, { type: QueryTypes.SELECT })
        .then(function(data) {
            return data;
        })
}

async function addCharacter(newCharacter) {
    let res = await database.Peliculas.findAll({ where: { id: newCharacter.peliculaAsociada, Active: true } })
    if (res.length == 0)
        return 0;
    return database.Personajes.create({ imagenUrl: newCharacter.imagenUrl, Nombre: newCharacter.Nombre, Edad: newCharacter.Edad, Peso: newCharacter.Peso, Historia: newCharacter.Historia, idPelicula: newCharacter.peliculaAsociada })
        .then(function(data) {
            return data;
        })
}

async function replaceCharacter(id, character) {
    return database.Personajes.update({ imagenUrl: character.imagenUrl, Nombre: character.Nombre, Edad: character.Edad, Peso: character.Peso, Historia: character.Historia }, {
            where: {
                id: id,
                Active: true
            }
        })
        .then(function(response) {
            return response;
        })
}

async function patchCharacter(id, data) {
    let query = "";
    if (data.imagenUrl != undefined)
        query = "Update Personajes set imagenUrl = '" + data.imagenUrl + "'";
    if (data.Nombre != undefined)
        query.length == 0 ? query = "Update Personajes set Nombre = '" + data.Nombre + "'" : query += " , Nombre = '" + data.Nombre + "'";
    if (data.edad != undefined)
        query.length == 0 ? query = "Update Personajes set Edad = " + data.Edad : query += " , Edad = " + data.Edad;
    if (data.Peso != undefined)
        query.length == 0 ? query = "Update Personajes set Peso = " + data.Peso : query += " , Peso = " + data.Peso;
    if (data.Historia != undefined)
        query.length == 0 ? query = "Update Personajes set Historia = '" + data.Historia + "'" : query += " , Historia = '" + data.Historia + "'";
    if (query.length == 0)
        return false;
    query += " where id = " + id + " and Active = 1";
    let [results, affectedRows] = await sequelize.query(query);
    return affectedRows;
}

async function deleteCharacter(id) {
    return database.Personajes.update({ Active: false }, {
            where: {
                id: id,
                Active: true
            }
        })
        .then(function(response) {
            return response;
        })
}

async function getMovies(querys) {
    let query = "";
    let flag = false;
    if (querys.genre != undefined) {
        query = "SELECT imagenUrl, Titulo, Fecha FROM Peliculas inner join generosXpeliculas on Peliculas.id = generosXpeliculas.idPelicula where generosXpeliculas.idGenero = " + querys.genre;
        flag = true;
    } else {
        query = "SELECT imagenUrl, Titulo, Fecha FROM Peliculas where Active = true";
    }
    if (querys.name != undefined)
        query += " and Titulo = " + querys.name;
    if (querys.order != undefined)
        query += " Order by Titulo " + querys.order;
    return sequelize.query(query, { type: QueryTypes.SELECT })
        .then(function(data) {
            return data;
        })
}


async function addMovie(newMovie) {
    let res = [];
    for (let i = 0; i < newMovie.Genero.length; i++) {
        let obj = await database.Generos.findAll({ where: { id: newMovie.Genero[i] } })
        if (obj.length > 0)
            res.push(obj[0].dataValues)
    }
    if (res.length == 0)
        return 0;
    let movie = await database.Peliculas.create({ imagenUrl: newMovie.imagenUrl, Titulo: newMovie.Titulo, Fecha: newMovie.Fecha, Calificacion: newMovie.Calificacion })
    let flag = false;
    for (let i = 0; i < res.length; i++) {
        flag = await database.generosXpelicula.create({ idGenero: res[i].id, idPelicula: movie.dataValues.id })
    }
    return flag;
}

module.exports = {
    getAllCharacters,
    addCharacter,
    replaceCharacter,
    deleteCharacter,
    patchCharacter,
    getMovies,
    addMovie
}