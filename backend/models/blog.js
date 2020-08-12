const mongoose = require('mongoose');
const config = require('../utils/config');

const url = config.MONGODB_URI;
mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB', err.message);
	});

const blogSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
});

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Blog', blogSchema);
