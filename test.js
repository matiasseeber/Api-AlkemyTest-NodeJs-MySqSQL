const { Sequelize, DataTypes, QueryTypes } = require('sequelize');
const sequelize = new Sequelize("fYv8Qy0H3i", "fYv8Qy0H3i", "QiVmfpnZ0u", {
    host: "remotemysql.com",
    dialect: "mysql"
});

const database = {};

database.Generos = require("./src/model/Generos.js")(sequelize, DataTypes);

let res = [];
async function test() {
    let obj = await sequelize.query("Select * from Generos where id = 1");
    console.log(obj)
}

test()