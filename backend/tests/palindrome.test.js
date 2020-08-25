//const test = require('../utils/for_testing').dummy;

const dummy = (posts) => {
	let likes = posts.map((post) => post.likes);

	likes = likes.reduce((sum, post) => sum + post);
	return likes;
};

const favouritePost = (posts) => {
	posts = posts.map((blog) => blog.likes);

	//let post = posts.reduce((max, curr) => Math.max(max, curr), 0);
	let post = Math.max(...posts);
	post = posts.findIndex((blog) => blog == post);
	return blogs[post];
};

const mostBlogs = (posts) => {
	const blogAuthors = [];

	const isUniqueAuthor = (author) => {
		blogAuthors.filter((exisingAuthor) => exisingAuthor.hasOwnProperty(author));
	};

	for (i = 0; i < posts.length; i++) {
		if (!isUniqueAuthor(posts[i].author)) {
			let currentAuthor = posts[i].author;
			blogAuthors[currentAuthor] = 0;
			posts.map((post) => (post.author === currentAuthor ? (blogAuthors[currentAuthor] += 1) : 0));
		}
	}
	const authorsBlogCount = Object.values(blogAuthors);
	let topAuthor = Math.max(...authorsBlogCount);
	topAuthor = Object.keys(blogAuthors).find((author) => blogAuthors[author] === topAuthor);
	return topAuthor;
};

const mostLikes = (posts) => {
	const blogAuthors = [];

	const isUniqueAuthor = (post) => {
		return blogAuthors.find((author) => author.author === post) ? true : false;
	};

	for (i = 0; i < posts.length; i++) {
		if (!isUniqueAuthor(posts[i].author)) {
			const author = {};
			author.author = posts[i].author;
			author.likes = posts[i].likes;

			blogAuthors.push(author);
		} else {
			repeatedAuthor = blogAuthors.findIndex((val) => val.author === posts[i].author);
			blogAuthors[repeatedAuthor].likes += posts[i].likes;
		}
	}
	let mostLiked = blogAuthors.map((author) => author.likes);
	mostLiked = Math.max(...mostLiked)
	mostLiked = blogAuthors.findIndex((val) => val.likes == mostLiked);
	mostLiked = blogAuthors	[mostLiked];
	return mostLiked.author;
};

const blogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
];

describe('blog likes', () => {
	test('Sum of all blog likes', () => {
		const result = dummy(blogs);
		expect(result).toBe(36);
	});

	test('Highest likes blog', () => {
		const result = favouritePost(blogs);
		expect(result).toEqual(blogs[2]);
	});

	test('Most liked Author', () => {
		const result = mostLikes(blogs);
		expect(result).toEqual(blogs[2].author);
	});
}); 

//console.log('Expect Canonical string reduction: ', favouritePost(blogs));
//console.log('Expect Robert C: ', mostBlogs(blogs));
//console.log(mostLikes(blogs));
