testem-jasmine2
===============

Quick hack to configure [testem](https://github.com/airportyh/testem) to launch 
with jasmine2.  

*note to self - send pull request to toby once jasmine2 is stabilized*

1. install or update testem

        npm install -g testem
        npm update -g testem


2. acquire standalone jasmine 2 release zip file at https://github.com/pivotal/jasmine/tree/master/dist

  or use the jasmine-2.0.0-rc3 files on this repo.

3. cd to your global npm/node_modules/testem dir

  yes, we're going to hack testem - forgive me.

4. mkdir ./public/testem/jasmine2 

5. copy these files from the jasmine2's /lib directory, to public/testem/jasmine2

        boot.js
        jasmine.css
        jasmine.js
        jasmine-favicon.png
        jasmine-html.js
  
6. create jasmine2runner.mustache from the following source and save to ./testem/views dir

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

7. add templateFile entry in the renderRunnerPage() method in ./testem/lib/server.js:

        
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
            
                var t = 500;
                var x = (+new Date());
                
                setTimeout(function() {
                    y = (+new Date()) - x;
                    expect(y >= t).toBe(true);
                    done();
                 }, t);
            });    
        });
    
9. create testem.json in your project, listing your (or jasmine 2's) specs:

        {
          "framework": "jasmine2",
          "src_files" : [
            "version.spec.js",
            "introduction.spec.js",
            "custom.matcher.spec.js",
            "custom.equality.spec.js"
          ]
        }
    
10. run from the command line:

        cd ./j2project
        testem
    
