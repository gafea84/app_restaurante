const router = require('express').Router();

const Comensal = require('../../models/comensal.model');

router.get('/', async (req, res) => {
    // Recuperar todos los comensales de la BD y responder con ellos en formato JSON
    try {
        const comensales = await Comensal.find().populate('mesa');
        res.json(comensales);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/nombres', async (req, res) => {
    const comensales = await Comensal.find();
    // const result = [];
    // for (let comensal of comensales) {
    //     result.push(comensal.nombre_completo);
    // }
    const result = comensales.map(c => c.nombre_completo);
    res.json(result);
});

router.get('/misma-mesa/:comensalId', async (req, res) => {
    const comensal = await Comensal.findById(req.params.comensalId);
    const comensales = await comensal.mismaMesa();
    res.json(comensales);
});

router.get('/alergias', async (req, res) => {
    const comensales = await Comensal.findByAlergia('marisco');
    res.json(comensales);
});

router.get('/visitas', async (req, res) => {
    const result = await Comensal.orderByNumVisitas();
    res.json(result);
});

router.post('/', async (req, res) => {
    try {
        const comensal = await Comensal.create(req.body);
        res.json(comensal);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put('/:comensalId', async (req, res) => {
    const { comensalId } = req.params;

    const comensal = await Comensal.findByIdAndUpdate(comensalId, req.body, { new: true });

    res.json(comensal);
});

router.delete('/:comensalId', async (req, res) => {
    const { comensalId } = req.params;

    const comensal = await Comensal.findByIdAndDelete(comensalId);
    // const comensal = await Comensal.findOneAndDelete({ telefono: '999192912' });

    res.json(comensal);
});

module.exports = router;