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
        dest: 'js/script.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [
            {
                src: 'components/sass/style.scss',
                dest: 'css/style.css'
            }
        ]
      }
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'js/_bower.js',
          'css': 'css/_bower.css'
        }
      }
    },
    watch: {
      scripts: {
        files: ['components/scripts/**/*.js', 'components/sass/**/*.scss'],
        tasks: ['concat', 'sass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.registerTask('default', ['bower_concat', 'concat', 'sass', 'watch']);
} // wrapper function
