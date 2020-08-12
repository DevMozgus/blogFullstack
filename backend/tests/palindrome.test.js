const test = require('../utils/for_testing').dummy;

test('dummy returns 1', () => {
	const blogs = [];

	const result = test.dummy(blogs);
	expect(result).toBe(1);
});
