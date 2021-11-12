const { Console } = require("console");
const dao = require("../model/dao.js");

const getAll = function(req, res) {
    dao.getAllCharacters(req.query)
        .then(function(personajes) {
            if (personajes.length == 0)
                res.status(404).json({ err: 404, msg: "No se pudo encontrar ese recurso" });
            else
                res.status(200).json(personajes);
        })
        .catch(function() {
            res.status(500).json({ err: 500, msg: "no se pudo conectar a la base de datos" })
        })
}

const addOne = function(req, res) {
    if (!req.body.imagenUrl || !req.body.Nombre || !req.body.Edad ||
        !req.body.Peso || !req.body.Historia || !req.body.peliculaAsociada) {
        res.json({ msg: "Todos los campos deben ser completados (imagenUrl, Nombre, Edad, Peso, Historia, peliculaAsociada(id))" })
        return
    }
    dao.addCharacter(req.body)
        .then(function(response) {
            if (response == 0)
                res.status(404).json({ err: 404, msg: "Esa pelicula no existe" });
            else
                res.status(200).json({ msg: "Registro añadido a la base de datos exitosamente. Id del personaje: " + response.id });
        })
        .catch(function(err) {
            console.log(err)
            res.status(500).json({ err: 500, msg: "no se pudo conectar a la base de datos" })
        })
}

const replace = function(req, res) {
    if (!req.body.imagenUrl || !req.body.Nombre || !req.body.Edad || !req.body.Peso || !req.body.Historia) {
        res.json({ msg: "Todos los campos deben ser completados (imagenUrl, Nombre, Edad, Peso, Historia)" })
        return
    }
    dao.replaceCharacter(req.params.id, req.body)
        .then(function(response) {
            if (response == 0) {
                res.status(404).json({ err: 404, msg: "No fue encontrado el registro" });
                return
            }
            res.status(200).json({ msg: "Se pudo actualizar el registro de forma exitosa" });
        })
        .catch(function() {
            res.status(500).json({ err: 500, msg: "No se pudo conectar con el servidor" });
        })
}

const patch = function(req, res) {
    dao.patchCharacter(req.params.id, req.body)
        .then(function(response) {
            if (response == 0)
                res.status(404).json({ err: 404, msg: "No fue encontrado el registro" });
            else
                res.status(200).json({ msg: "Se pudo actualizar el registro de forma exitosa" });
        })
        .catch(function() {
            res.status(500).json({ err: 500, msg: "No se pudo conectar con el servidor" });
        })
}

const deleteCharacter = function(req, res) {
    dao.deleteCharacter(req.params.id)
        .then(function(response) {
            if (response == 0)
                res.status(404).json({ err: 404, msg: "No fue encontrado el registro" });
            else
                res.status(200).json({ msg: "Se elimino el registro de forma exitosa" });
        })
        .catch(function() {
            res.status(500).json({ err: 500, msg: "No se pudo conectar con el servidor" });
        })
}

module.exports = {
    addOne,
    getAll,
    replace,
    deleteCharacter,
    patch
};