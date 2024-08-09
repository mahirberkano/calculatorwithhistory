const Calculation = require('../models/calculation');

exports.getHistory = async (req, res) => {
    const history = await Calculation.find().sort({ createdAt: -1 });
    res.json(history);
};

exports.addCalculation = async (req, res) => {
    const { expression, result } = req.body;
    const calculation = new Calculation({ expression, result });
    await calculation.save();
    res.status(201).json(calculation);
};

exports.clearHistory = async (req, res) => {
    try {
        await Calculation.deleteMany({});
        res.status(204).send(); // No Content status
    } catch (error) {
        res.status(500).send('Server error');
    }
};
