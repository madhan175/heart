const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample JSON data (replace with your actual data)
let heartData = [
    { id: 1, name: 'Heart Rate', value: 72 },
    { id: 2, name: 'Blood Pressure', value: '120/80' },
];

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Heart Backend API!');
});

// Get all data
app.get('/api/data', (req, res) => {
    res.json(heartData);
});

// Get data by ID
app.get('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = heartData.find(d => d.id === id);
    if (!item) return res.status(404).json({ message: 'Data not found' });
    res.json(item);
});

// Add new data
app.post('/api/data', (req, res) => {
    const newData = req.body;
    heartData.push(newData);
    res.status(201).json(newData);
});

// Update data by ID
app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    let item = heartData.find(d => d.id === id);
    if (!item) return res.status(404).json({ message: 'Data not found' });
    Object.assign(item, updatedData);
    res.json(item);
});

// Delete data by ID
app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    heartData = heartData.filter(d => d.id !== id);
    res.status(204).send();
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});