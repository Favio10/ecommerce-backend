const Product = require('../models/Product'); 

//aca creo un nuevo proyecto
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, imageUrl } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            stock,
            imageUrl,
        });

        res.status(201).json({ msg: 'Producto creado', product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
}