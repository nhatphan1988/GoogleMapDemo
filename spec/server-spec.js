var request = require('request');

describe("Hello World", function () {
	it("should respond with hello world", function(done) {
	  request("http://localhost:8000", function(error, response, body){
	    expect(body).toEqual("Hello World");
	    done();
	  });
	});
});