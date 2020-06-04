import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import { Navigation } from '.'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="bg-gray-100 flex flex-col justify-between" style={{ minHeight: `100vh` }}>
                {/* The main header section on top of the screen */}
                { isHome &&
                    <header className="bg-gray-700">
                        <div className="flex flex-col max-w-screen-md m-auto sm:px-8 px-4 py-8">
                            <nav className="flex flex-row justify-between text-white">
                                <div className="flex flex-row items-center">
                                    <Link to="/">
                                        <h1 className="sm:text-lg">{site.title}</h1>
                                    </Link>
                                    <a className="hover:text-red-300 transition ease-in duration-100 ml-1 text-gray-400" rel="noopener noreferrer" target="_blank" href="https://twitter.com/lucaronin">(@lucaronin)</a>
                                </div>
                            </nav>
                            { isHome ?
                                <div className="max-w-xl text-white py-8 sm:py-12">
                                    <p className="text-xl sm:text-2xl">
                                        Hey! 👋 I am Luca — I am an entrepreneur, developer, and periodic musician.
                                    </p>
                                    <p className="text-base font-normal text-gray-400">
                                        I co-founded <a className="hover:text-red-300 transition ease-in duration-100" href="https://wanderio.com" rel="noopener noreferrer" target="_blank"> @wanderio</a> in 2012. I like creating things on the internet.
                                    </p>
                                </div> :
                                null}
                        </div>
                    </header>
                }

                <main className="flex flex-col" style={{ flexGrow: 1 }}>
                    {/* All the main content gets inserted here, index.js, post.js */}
                    {children}
                </main>

                <div>
                    {/* The footer at the very bottom of the screen */}
                    <footer className="bg-gray-800">
                        <div className="flex flex-row justify-between max-w-screen-md m-auto pt-4 pb-16 sm:px-8 px-4 text-white">
                            <Link to="/">{site.title} © 2020</Link>
                        </div>
                    </footer>

                </div>
            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
