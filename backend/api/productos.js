const express = json => require('express');
const router = express.Router();

router.get('/productos', (req, res) => {
    const productos = [
        { id: 1, nombre: 'Notebook Pro 15"', precio: 1200000, categoria: 'Tecnología', imagen: 'https://via.placeholder.com/250' },
        { id: 2, nombre: 'Auriculares Inalámbricos', precio: 85000, categoria: 'Audio', imagen: 'https://via.placeholder.com/250' },
        { id: 3, nombre: 'Mouse Gamer RGB', precio: 45000, categoria: 'Accesorios', imagen: 'https://via.placeholder.com/250' },
        { id: 4, nombre: 'Teclado Mecánico', precio: 95000, categoria: 'Accesorios', imagen: 'https://via.placeholder.com/250' },
        { id: 5, nombre: 'Monitor 24" Full HD', precio: 350000, categoria: 'Tecnología', imagen: 'https://via.placeholder.com/250' }
    ];
    res.json(productos);
});

module.exports = router;