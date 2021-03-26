/**
 * npx localhost -p 8080;
 * npx mocha-headless-chrome -f http://localhost:8080/tests/specs/index.html
 */
const localhost = require('localhost')('./');

const {runner} = require('mocha-headless-chrome');

const options = {
	file: 'http://localhost:8080/tests/specs/index.html',
	width: 800,
	height: 600,
	timeout: 120000,
};

localhost.listen(8080, async () => {
	try {
		const {result} = await runner(options);
		if (result.stats.failures) {
			throw 'Tests Failed';
		}
	} catch (e) {
		console.error(e);
		process.exit(1);
	} finally {
		localhost.close();
	}
});

