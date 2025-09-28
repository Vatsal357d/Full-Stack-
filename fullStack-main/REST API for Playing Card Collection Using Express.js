// Import the Express framework
const express = require('express');

// Create an instance of the Express application
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// In-memory "database" (an array) to store the playing cards
let cards = [
    { id: 1, suit: 'Hearts', value: 'Ace' },
    { id: 2, suit: 'Diamonds', value: 'King' }
];
let nextId = 3; // To auto-increment card IDs

// --- API Endpoints ---

// @route   GET /cards
// @desc    Get all playing cards in the collection
app.get('/cards', (req, res) => {
    res.json(cards);
});

// @route   GET /cards/:id
// @desc    Get a single card by its ID
app.get('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    const card = cards.find(c => c.id === cardId);

    if (card) {
        res.json(card);
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

// @route   POST /cards
// @desc    Add a new card to the collection
app.post('/cards', (req, res) => {
    const { suit, value } = req.body;

    if (!suit || !value) {
        return res.status(400).json({ message: 'Both suit and value are required' });
    }

    const newCard = { id: nextId++, suit, value };
    cards.push(newCard);
    res.status(201).json(newCard);
});

// @route   DELETE /cards/:id
// @desc    Delete a card from the collection by its ID
app.delete('/cards/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    const initialLength = cards.length;

    cards = cards.filter(c => c.id !== cardId);

    if (cards.length < initialLength) {
        res.status(200).json({ message: `Card with ID ${cardId} deleted successfully` });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`🃏 Card collection API server running on http://localhost:${PORT}`);
});
