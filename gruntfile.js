module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      options: {
        separator: '\n\n//-------------------------------\n',
        banner: '\n\n//-------------------------------\n',
      },
      dist: {
        src: [
          'components/scripts/buffer-loader.js',
          'components/scripts/audio.js',
          'components/scripts/speech.js'
        ],
        dest: 'builds/development/js/script.js'
      },
      prod: {
        src: [
          'components/scripts/*.js'
        ],
        dest: 'builds/production/js/script.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          src: 'components/sass/style.scss',
          dest: 'builds/development/css/style.css'
        }]
      }
    },
    wiredep: {
      task: {
        src: 'builds/development/**/*.html'
      }
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'builds/development/js/_bower.js',
          'css': 'builds/development/css/_bower.css'
        }
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: 'builds/development/',
          livereload: true
        }
      }
    },
    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      scripts: {
        files: ['builds/development/**/*.html', 'components/scripts/**/*.js', 'components/sass/**/*.scss'],
        tasks: ['concat', 'sass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.registerTask('default', ['wiredep', 'bower_concat', 'concat', 'sass', 'connect', 'watch']);
} // wrapper function
