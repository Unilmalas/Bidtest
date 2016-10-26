exports.config = {
	framework: 'mocha',
	specs: [
		//'test/e2e/**/*.spec.js'
	],
	multiCapabilities: [{
		browserName: 'chrome',
		sharedTestFiles: true,
		maxInstances: 2,
		'specs': ['test/e2e/**/making_a_bid.spec.js']
	}, {
		browserName: 'chrome',
		sharedTestFiles: true,
		maxInstances: 2,
		'specs': ['test/e2e/**/making_a_bid.spec.js']
	}],
	mochaOpts: {
		enableTimeouts: false
	}/*,
	onPrepare: function () {
		require('./server');
	}*/
}