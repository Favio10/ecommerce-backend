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
};

// obtener todos los productos
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// obtener un producto por id
exports.getProductsById = async (req, res) => {
    try {
        const {id} = req. params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({msg: "Producto no encontrado"});
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};


// actualizar un producto
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock, imageUrl } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        await product.update({ name, description, price, stock, imageUrl });
        res.json({ msg: 'Producto actualizado', product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

// eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado' });
        }

        await product.destroy();
        res.json({ msg: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};