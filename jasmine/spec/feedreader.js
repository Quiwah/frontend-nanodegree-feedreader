/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This first test tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL definedand that the URL is not empty.
         */
        allFeeds.forEach(function(value){
            it('has a URL', function() {
                expect(value.url).toBeDefined();
                expect(value.url.length).not.toBe(0);
            });
            /* This test loops through each feed in the allFeeds object
            * and ensures it has a name defined and that the name is not empty.
            */
            it('has a URL', function() {
                expect(value.name).toBeDefined();
                expect(value.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        let body = document.body;
        // This test ensures the menu element is hidden by default.
        it('is hidden', function() {
            expect(body).toHaveClass('menu-hidden');
        });
        // This test ensures the menu changes visibility when the menu icon is clicked.
        // The menu display when clicked.
        it('becomes visible', function() {
            $('.menu-icon-link').trigger('click');
            expect(body).not.toHaveClass('menu-hidden');
            // The menu hide when clicked again.
            $('.menu-icon-link').trigger('click');
            expect(body).toHaveClass('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        // This test ensures when the loadFeed function is called and completes its work...
        beforeEach(function (done) {
            loadFeed(0, done);
        });
        // ...there is at least a single .entry element within the .feed container.
        it('at least one entry is in the feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        let oldFeed;
        /* This test ensures when a new feed is loaded by the loadFeed function
         * that the content actually changes.
         */
        beforeEach(function(done) {
            //first loading
            loadFeed(0, function() {
                oldFeed = $('.feed').html();
                //second loading
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('changes', function(done) {
            let newFeed = $('.feed').html();
            //compare the two feeds
            expect(oldFeed).not.toEqual(newFeed);
            done();
        });
    });
}());
