const dummy = (blogs) => {
	blogs.reduce((sum, item) => {
		return sum.likes + item.likes;
	}, 0);
};

module.exports = {
	dummy
};
