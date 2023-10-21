const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@import "@/styles/_overrides.scss";` // loading bootstrap overriding scss
            }
        }
    },
    /**
     *  Replace PATH with the absolute path of the application. For example,if you cloned your repository inside
     *  C:/password-generator the absolute path you have to insert is C:/mine-sweeper/dist/
     *  if you're hosting a build version of this repo inside an online host, just put your relative path
     *
     */

    publicPath: process.env.NODE_ENV === 'production' ? '/PATH/' : '/',
})
