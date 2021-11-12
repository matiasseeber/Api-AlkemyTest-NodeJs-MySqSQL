module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Generos", {
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
        }
    })
}