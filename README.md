testem-jasmine2
===============

Quick hack to configure [testem](https://github.com/airportyh/testem) to launch 
with jasmine2.  

*Note: does not hack on jasmine-node, as that's a separate project with its own 
jasmine-lib version.*

*Note to self: send pull request to toby once jasmine2 is stabilized*

1. install or update testem

        npm install -g testem
        npm update -g testem

2. acquire standalone jasmine 2 release zip file at 
    [https://github.com/pivotal/jasmine/tree/master/dist](https://github.com/pivotal/jasmine/tree/master/dist)

  or use the jasmine-2.0.0 files on this repo.

3. cd to your global <code>npm/node_modules/testem</code> directory.

  Yes, we're going to hack testem - forgive me.

4. <code>mkdir ./public/testem/jasmine2</code>

5. copy these files from the jasmine-2.0.0 <code>/lib</code> directory, to 
  <code>public/testem/jasmine2</code>:

        boot.js
        console.js
        jasmine.css
        jasmine.js
        jasmine-favicon.png
        jasmine-html.js
  
6. create <code>jasmine2runner.mustache</code> from the following source and 
   save to <code>./testem/views</code> dir

    or copy from the jasmine2runner.mustache also on this repo:
    
        <!DOCTYPE html>
        <html>
        <head>
          <title>Test'em with jasmine2</title>
          <script src="/testem/jasmine2/jasmine.js"></script>
          <script src="/testem/jasmine2/jasmine-html.js"></script>
          <script src="/testem/jasmine2/boot.js"></script>
          
          <!-- testem must wait for the jasmine 2 boot file -->
          <script src="/testem.js"></script>
    
          {{#scripts}}<script src="{{src}}"{{#attrs}} {{&.}} {{/attrs}}></script>{{/scripts}}
    
          <link rel="stylesheet" href="/testem/jasmine2/jasmine.css">
    
          {{#styles}}<link rel="stylesheet" href="{{.}}">{{/styles}}
        </head>
        <body></body>
        </html>

7. add a <code>templateFile</code> entry in the <code>renderRunnerPage()</code> 
    method in <code>./testem/lib/server.js</code>:

        
        , renderRunnerPage: function(err, files, res){
          var config = this.config
          var framework = config.get('framework') || 'jasmine'
          var css_files = config.get('css_files')
          var templateFile = { 
            jasmine: 'jasminerunner'
            
            , 'jasmine2': 'jasmine2runner'  // <--- ADD THIS LINE
            
            , qunit: 'qunitrunner'
        ...

8. create a smoke test spec file in your project, or use the 
    <code>smoke.spec.js</code> in this repo:

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
    
9. create testem.json in your project, listing your (or jasmine 2's) specs:

        {
          "framework": "jasmine2",
          "src_files" : [
            "smoke.spec.js",
            "introduction.spec.js",
            "custom.matcher.spec.js",
            "custom.equality.spec.js"
          ]
        }
    
10. run from the command line:

        cd ./your-jasmine2-project
        testem

        
Happy testing with jasmine-2 and testem!
