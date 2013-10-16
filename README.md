testem-jasmine2
===============

quick hack to configure testem to launch with jasmine2.  

1. install or update testem

    npm install -g testem
    npm update -g testem


2. acquire standalone jasmine 2 release zip file at https://github.com/pivotal/jasmine/tree/master/dist

3. cd to your global npm/node_modules/testem dir

4. mkdir ./public/testem/jasmine2 

5. copy these files from the jasmine2 zip file's lib/ dir, to public/testem/jasmine2

    boot.js
    jasmine.css
    jasmine.js
    jasmine-favicon.png
    jasmine-html.js
  
6. create jasmine2runner.mustache from the following source and save to ./testem/views dir

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

7. add templateFile entry in the renderRunnerPage() method in ./testem/lib/server.js:

    ...
    , renderRunnerPage: function(err, files, res){
      var config = this.config
      var framework = config.get('framework') || 'jasmine'
      var css_files = config.get('css_files')
      var templateFile = { 
        jasmine: 'jasminerunner'
        , 'jasmine2': 'jasmine2runner'  // <--- ADD THIS LINE
        , qunit: 'qunitrunner'
    ...

8. create a smoke test spec file in your project:

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
    
9. create testem.json in your project:

    {
      "framework": "jasmine2",
      "src_files" : [
        "spec.js"
      ]
    }
    
10. run from the command line:

    cd ./j2project
    testem
    
