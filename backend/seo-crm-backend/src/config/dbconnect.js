// MongoDB Connection
const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://acedatabasedev:Dev23434342@cluster0.o0gpy.mongodb.net/ace-digital-solutions';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));