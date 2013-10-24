// version.spec.js

describe('jasmine version', function() {

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