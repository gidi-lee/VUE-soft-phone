module.exports = {
    publicPath: '',
    pluginOptions: {
        i18n: {
            locale: 'en',
            fallbackLocale: 'en',
            localeDir: 'locale',
            enableInSFC: true,
        },
    },
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8085, // CHANGE YOUR PORT HERE!
        https: true,
        hotOnly: false,
    }
};