const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const markerSchema = new mongoose.Schema({
    id: String,
    lat: Number,
    lng: Number,
});

const Marker = mongoose.model('Marker', markerSchema);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const markers = await Marker.find();
        res.status(200).json(markers);
    } else if (req.method === 'POST') {
        const newMarker = new Marker(req.body);
        await newMarker.save();
        res.status(201).json(newMarker);
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
        await Marker.deleteOne({ id });
        res.status(204).end();
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
