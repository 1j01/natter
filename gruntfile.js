module.exports = function(grunt){
	grunt.initConfig({
		clean: ["public/build/*"],
		cssmin: {
			build: {
				files: {
					"public/build/min.css": ["public/lib/reset.css","public/app.css"]
				}
			}
		},
		uglify: {
			build: {
				files: {
					'public/build/build.js': [
						"public/utils.js",
						"public/lib/sha512.js",
						"public/avastar.js",
						"public/widgets.js",
						"public/message.js",
						"public/client.js",
						"public/kc.js"
					]
				},
				options: {
					sourceMap: 'public/build/build.js.map'
				}
			}
		},
		watch: {
			js: {
				files: 'public/*.js',
				tasks: ['uglify']
			},
			css: {
				files: 'public/*.css',
				tasks: ['cssmin']
			}
		}
	});
	
	// load plugins
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	// register tasks
	grunt.registerTask('default', ['clean','uglify','cssmin']);
};