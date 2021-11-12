module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Peliculas", {
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
        Titulo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Fecha: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Calificacion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    })
}