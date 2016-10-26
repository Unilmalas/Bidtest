describe('making a bid', function () {
	/*var ptor;

	beforeEach(function() {
		ptor = protractor.getInstance('http://localhost:3000');
		ptor.ignoreSynchronization = true;
	});*/
	
	it('logs in and creates new bid', function () {
		//ptor.get('#/');
		browser.driver.manage().deleteAllCookies();
        browser.ignoreSynchronization = false;
		
		// go to homepage
		browser.get('http://localhost:3000');
		
		// create a new browser instance
		//var browser2 = browser.forkNewDriverInstance(true);
		//var element2 = browser2.element;
		
		// click login
		element(by.css('nav .login')).click();
		//browser.pause();
		
		// fill out and submit login form
		element(by.model('username')).sendKeys('bernie');
		element(by.model('password')).sendKeys('pass');
		element(by.css('form .btn')).click();
		browser.sleep(2000);
		browser.waitForAngular();
		
		// login on second browser session
		// click login
		//element2(by.css('nav .login')).click();
		//browser.pause();
		
		// fill out and submit login form
		//element2(by.model('username')).sendKeys('some1');
		//element2(by.model('password')).sendKeys('pass');
		//element2(by.css('form .btn')).click();
		//browser2.sleep(2000);
		//browser2.waitForAngular();
		
		// click bids
		element(by.css('nav .bids')).click();
		browser.sleep(2000);
		browser.waitForAngular();
		// click bids browser 2
		//element2(by.css('nav .bids')).click();
		//browser2.sleep(2000);
		//browser2.waitForAngular();		
		
		// submit a new bid on the bids page
		var price = 4570; // test price
		element(by.model('bidPrice')).sendKeys(price);
		element(by.css('form .btn')).click();
		browser.sleep(1000);
		browser.waitForAngular();
		
		// submit a new bid on the bids page
		//price = 4511; // test price
		//element2(by.model('bidPrice')).sendKeys(price);
		//element2(by.css('form .btn')).click();
		//browser2.sleep(1000);
		//browser2.waitForAngular();	
		
		// the user should now see its bid and the current highest bid adjusted
	});
});