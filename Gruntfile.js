module.exports = function(grunt) {

  // LOAD ALL GRUNT TASKS
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    browserify: {
      account_dev: {
        options: {
          debug: true
        },
        files: {
          'production/js/app.js': ['tmp/js/app.js']
        }
      }
    },

    react: {
      client: {
        files: [{
          expand: true,
          cwd: 'app/js',
          src: ['**/*.js', '**/*.jsx'],
          dest: 'tmp/js',
          ext: '.js'
        }]
      },
    },

    sass: {
      dist: {
        files: {
          'tmp/css/app.css': 'app/scss/app.scss'
        }
      }
    },

    autoprefixer: {
      production: {
        src: 'tmp/css/app.css',
        dest: 'production/css/app.css'
      }
    },

    clean: ["tmp"],

    copy: {
      html: {
        files: [{
          expand: true,
          cwd: 'app/html',
          src: ['**/*'],
          dest: 'production'
        }]
      },
      bower: {
        files: [{
          expand: true,
          cwd: '.',
          src: ['bower_components/**/*'],
          dest: 'production'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: ['**/*'],
          dest: 'production/images'
        }]
      }
    },

    connect: {
      livereload: {
        options: {
          port: 8000,
          livereload: 35729, // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost',
          base: 'production',
          open: true
        }
      }
    },

    watch: {

      options: {
        debounceDelay: 250
      },

      sass: {
        files: ['app/scss/**/*.scss'],
        tasks: ['sass', 'autoprefixer']
      },

      js: {
        files: ['app/js/**/*'],
        tasks: ['react', 'browserify']
      },

      html: {
        files: ['app/html/**/*'],
        tasks: ['copy:html']
      },

      livereload: {
        options: {
          livereload: '<%= connect.livereload.options.livereload %>'
        },
        files: [
          'app/scss/**/*.scss',
          'app/js/**/*',
          'app/html/**/*'
        ]
      }

    }

  });

  // Default task(s).
  grunt.registerTask('default', ['sass', 'autoprefixer', 'react', 'browserify', 'copy', 'clean', 'connect', 'watch']);

};