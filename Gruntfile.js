'use strict';
module.exports = function (grunt) {
  var configBridge;

  require('jit-grunt')(grunt);

  configBridge = grunt.file.readJSON('./bower_components/bootstrap/grunt/configBridge.json', {
    encoding: 'utf8'
  });

  grunt.initConfig({
    watch: {
      sass: {
        files: ['./templates/*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      livereload: {
        files: ['./dist/css/bootstrap.css'],
        options: {
          livereload: 35299
        }
      }
    },
    sass: {
      options: {
        style: 'expanded',
        precision: 8,
        'unix-newlines': true
      },
      dist: {

        files: {
          './dist/css/bootstrap.css': ['./templates/build.scss']
        }
      }
    },
    wiredep: {
      dist: {
        override: {
          bootstrap: {
            main: ['dist/css/bootstrap.css', 'dist/js/bootstrap.js']
          }
        },
        src: './index.html'
      }
    },
    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      dist: {
        src: './dist/css/bootstrap.css'
      }
    },
    browserSync: {
      options: {
        browser: process.platform.search(/^win/i) !== -1 ? 'Chrome' : 'Google Chrome',
        server: {
          baseDir: '.'
        }
      },
      bsFiles: {
        src: './dist/css/bootstrap.css'
      }
    },
    connect: {
      server: {
        options: {
          port: 3001
          // hostname: '*',
          // onCreateServer: function (server, connect, options) {
          //   var io = require('socket.io').listen(server);
          //   io.sockets.on('connection', function (socket) {
          //     // do something with socket
          //   });
          // }
        }
      }
    }
  });

  grunt.registerTask('build', function (target) {
    grunt.task.run(['sass', 'autoprefixer']);
  });

  grunt.registerTask('serve', function (target) {
    grunt.task.run(['build', 'wiredep', 'connect', 'watch']);
  });
};