const purgecss = require(`@fullhuman/postcss-purgecss`)

module.exports = () => {
    return {
        plugins: [
            require(`tailwindcss`),
            purgecss({
                content: [`./layouts/**/*.html`, `./src/**/*.js`],
                defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            }),
        ],
    }
}
