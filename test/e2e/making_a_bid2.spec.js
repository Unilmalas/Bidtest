describe('making a bid', function () {	
	it('logs in and creates new bid', function () {
		//ptor.get('#/');
		browser.driver.manage().deleteAllCookies();
        browser.ignoreSynchronization = false;
		
		// go to homepage
		browser.get('http://localhost:3000');
		
		// click login
		element(by.css('nav .login')).click();
		//browser.pause();
		
		// fill out and submit login form
		element(by.model('username')).sendKeys('some1');
		element(by.model('password')).sendKeys('pass');
		element(by.css('form .btn')).click();
		browser.sleep(2000);
		browser.waitForAngular();
		
		// click bids
		element(by.css('nav .bids')).click();
		browser.sleep(2000);
		browser.waitForAngular();	
		
		// submit a new bid on the bids page
		var price = 4571; // test price
		element(by.model('bidPrice')).sendKeys(price);
		element(by.css('form .btn')).click();
		browser.sleep(1000);
		browser.waitForAngular();
	
		
		// the user should now see its bid and the current highest bid adjusted
	});
});