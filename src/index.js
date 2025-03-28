require('dotenv').config();
const express = require('express');

const sequelize = require('./config/db');
const productRoutes = require('./routes/product.routes');
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API de ecommerce funcionando ');
});


app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
        await sequelize.sync({ force: false});
        console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    } catch (error) {
        console.log(`❌ Error al conectar a la base de datos: ${error}`);
    }
})



