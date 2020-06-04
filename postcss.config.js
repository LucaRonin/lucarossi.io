const purgecss = require(`@fullhuman/postcss-purgecss`)

module.exports = () => {
    return {
        plugins: [
            require(`tailwindcss`),
            process.env.NODE_ENV === `production` ? purgecss({
                content: [`./src/**/*.js`],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
                whitelistPatterns: [/^font/, /^text/, /^border/, /^bg/],
            }) : null,
        ],
    }
}
