const HtmlWebpackPlugin = require('html-webpack-plugin');
const cheerio = require("cheerio");

class CordovaHtmlOutputPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap('CordovaHtmlOutputPlugin', (compilation) => {
			console.log('The compiler is starting a new compilation...');

			// Static Plugin interface |compilation |HOOK NAME | register listener 
			HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
				'CordovaHtmlOutputPlugin',
				(data, cb) => {
					let htmlPluginData = data.html;
					let $ = cheerio.load(htmlPluginData),
						cordovaJsFound = false;
			
					$("script").each((index, element) => {
						if ($(element).attr("src") === "cordova.js")
						cordovaJsFound = true;
					});
			
					if (!cordovaJsFound)
						$("body").prepend('<script src="cordova.js"></script>');
			
					htmlPluginData = $.html();
					cb(null, {...data, html: htmlPluginData});
				}
			);
		});
	}
  }

module.exports = CordovaHtmlOutputPlugin;