const express = require('express');
const mongoose = require('mongoose');
const app = express();
const historyRoutes = require('./routes/historyRoutes');

mongoose.connect('mongodb://localhost:27017/calculator', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.static('public'));
app.use('/api/history', historyRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
