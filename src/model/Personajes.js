module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Personaje", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        imagenUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Edad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Peso: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Historia: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        idPelicula: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}