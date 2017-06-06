module.exports = function(grunt) {
  // Project configuration.
 
    
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
        options: {
            //sourceMap: true,
            presets: ['es2015'],
            compact: false
        },
        dist: {
            files: {
                'script.build.js': 'script.js'
            }
        }
    },
    watch: {
        scripts : {
          files: ['script.js'],
          tasks: [ 'babel']
        }
      }
  });


  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['watch:scripts']);

};
