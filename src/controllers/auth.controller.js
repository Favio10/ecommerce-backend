const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({msg: 'Todos los campos son obligatorios.'});
        }

        const userExist = await User.findOne({ where: {email}});
        if (userExist) {
            return res.status(400),json({ msg: 'El usuario ya se encuentra registrado.'});
        }

        const newUser = await User.create({ name, email, password, role });
        res.status(201).json({ 'Usuario creado': newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor.' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario por email
        const user = await User.findOne({ where: {email}});
        if (!user) {
            return res.status(400).json({ msg: ' Usuario no encontrado'});
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta'});
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ msg: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error en el servidor.' });   
    }
};