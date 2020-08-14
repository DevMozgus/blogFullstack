const dummy = (posts) => {
	let likes = posts.map((post) => post.likes);

	likes = likes.reduce((sum, item) => sum + item);
	//console.log(likes);
	return likes;
};

module.exports.dummy = dummy;
