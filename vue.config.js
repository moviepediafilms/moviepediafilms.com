const GoogleFontsPlugin = require("google-fonts-webpack-plugin");

module.exports = {
    css: {
        loaderOptions: {
            sass: {}
        }
    },
    pluginOptions: {
        quasar: {
            importStrategy: 'kebab',
            rtlSupport: false
        }
    },
    transpileDependencies: [
        'quasar'
    ],
    chainWebpack: config => {
        plugins: [
            new GoogleFontsPlugin({
                fonts: [
                    { family: "Noto Sans", variants: ["400", "700"] },
                    { family: "Prompt", variants: ["200", "300", "400", "500", "600", "700"] }
                ]
            })
        ]
    }
}