module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            css: {
                files: [
                    {
                        src: ["styles/faded-presenter.less"],
                        dest: "styles/faded-presenter.css"
                    }
                ]
            }
        },
        watch: {
            css: {
                files: "styles/**/*.less",
                tasks: ["less"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask("default", ["build"]);
    grunt.registerTask("build", ["less"]);
    grunt.registerTask("develop", ["watch"]);
};
