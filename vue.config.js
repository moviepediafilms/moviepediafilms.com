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
        config.plugin('html')
            .tap(args => {
                var config = args[0]
                if (!config.minify)
                    config.minify = {}
                config.minify.removeAttributeQuotes = false
                return args
            })
    }
}