module.exports = function(grunt) {
  // Project configuration.
 
    
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
        options: {
            //sourceMap: true,
            comments: false,
            presets: ['es2015'],
            compact: false
        },
        dist: {
            files: {
                'prod/script.js': 'devel/script.js'
            }
        }
    },
    dataUri: {
      dist: {
        // src file 
        src: 'devel/style.css',
        // output dir 
        dest: 'prod',
        options: {
          // specified files are only encoding 
          target: ['icons/*.*'],
          // adjust relative path? 
          fixDirLevel: true,
          // img detecting base dir 
          // baseDir: './' 
   
          // Do not inline any images larger 
          // than this size. 2048 is a size 
          // recommended by Google's mod_pagespeed. 
          maxBytes : 5048
   
        }
      }
    },
    watch: {
        scripts : {
          files: ['devel/script.js'],
          tasks: [ 'babel']
        },
        css : {
          files: [ 'devel/style.css'],
          tasks: [ 'dataUri']
        }
      }
  });

  grunt.loadNpmTasks('grunt-data-uri');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['watch']);

};
