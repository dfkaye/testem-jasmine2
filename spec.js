describe('jasmine', function () {

    it('should find jasmine', function () {
        expect(jasmine).toBeDefined();
    
    });
    
    it('should run async with done', function (done) {
    
        var t = 500;
        var x = (+new Date());
        
        setTimeout(function() {
            y = (+new Date()) - x;
            expect(y >= t).toBe(true);
            done();
         }, t);
    });    
});