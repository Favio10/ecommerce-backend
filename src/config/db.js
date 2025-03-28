require('dotenv').config();
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
    }
);

sequelize
.authenticate()
.then(() => {
    console.log("✅ Conexión a PostgreSQL exitosa")
})
.catch((err) => console.log("❌ Error de conexión a PostgreSQL", err)
)

module.exports = sequelize;