const router = require('express').Router();

const Mesa = require('../../models/mesa.model');

router.get('/', async (req, res) => {
    const mesas = await Mesa.find().populate('comensales');
    res.json(mesas);
});

router.post('/', async (req, res) => {
    try {
        const newMesa = await Mesa.create(req.body);
        res.json(newMesa);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/agregar', async (req, res) => {
    const { comensalId, mesaId } = req.body;

    const mesa = await Mesa.findById(mesaId);

    mesa.comensales.push(comensalId);
    await mesa.save();

    res.json(mesa);
});

// router.post('/agregar', async (req, res) => {
//     const { comensalId, mesaId } = req.body;

//     const mesa = await Mesa.updateOne({ _id: mesaId }, {
//         $push: { mesas: comensalId }
//     });

//     res.json(mesa);
// });

module.exports = router;