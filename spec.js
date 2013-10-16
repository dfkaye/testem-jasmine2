
describe('jasmine', function () {

    it('should find jasmine', function () {
        expect(jasmine).toBeDefined();
    
    });
    
    it('should run async with done', function (done) {
    
        setTimeout(function() {
            expect(jasmine).toBeDefined();
            done();
         }, 500);
    
    });    
});