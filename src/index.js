require('dotenv').config();
const express = require('express');

const sequelize = require('./config/db');


const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API de ecommerce funcionando ');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.sync({ force: false});
        console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    } catch (error) {
        console.log(`❌ Error al conectar a la base de datos: ${error}`);
    }
})

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
