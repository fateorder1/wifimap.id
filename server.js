const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Hubungkan ke MongoDB
mongoose.connect('mongodb://localhost:27017/markerDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Buat skema dan model Marker
const markerSchema = new mongoose.Schema({
    id: String,
    lat: Number,
    lng: Number,
});
const Marker = mongoose.model('Marker', markerSchema);

// API untuk mendapatkan marker
app.get('/markers', async (req, res) => {
    const markers = await Marker.find();
    res.json(markers);
});

// API untuk menambahkan marker
app.post('/markers', async (req, res) => {
    const newMarker = new Marker(req.body);
    await newMarker.save();
    res.json(newMarker);
});

// API untuk menghapus marker
app.delete('/markers/:id', async (req, res) => {
    await Marker.deleteOne({ id: req.params.id });
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
