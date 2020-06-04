const purgecss = require(`@fullhuman/postcss-purgecss`)

module.exports = () => {
    return {
        plugins: [
            require(`tailwindcss`),
            purgecss({
                content: [`./src/**/*.js`],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                whitelistPatterns: [/^font/, /^text/, /^border/, /^bg/],
            }),
        ],
    }
}
