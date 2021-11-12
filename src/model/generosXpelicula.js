module.exports = (sequelize, DataTypes) => {
    return sequelize.define("generosXpelicula", {
        idGenero: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        idPelicula: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    })
}