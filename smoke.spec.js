// smoke.spec.js

describe('smoke test', function () {

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
    
    describe('custom equality matcher for version', function() {

      beforeEach(function() {
        jasmine.addCustomEqualityTester(function partial(first, second) {
            if (typeof first == 'string' && typeof second == 'string') {
              return first.indexOf(second) === 0;
            }
        });
      });
      
      it('should be 2.0.0', function () {
        expect(jasmine.version).toEqual('2.0.0');
      });
      
    });
    
});