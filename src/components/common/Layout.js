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

            <div className="bg-gray-100">
                <div>
                    {/* The main header section on top of the screen */}
                    { isHome &&
                        <header className="bg-gray-700">
                            <div className="flex flex-col max-w-screen-md m-auto sm:px-8 px-4 py-8">
                                <nav className="flex flex-row justify-between text-white">
                                    <div>
                                        <Link to="/">
                                            <h1 className="sm:text-lg">{site.title}</h1>
                                        </Link>
                                    </div>
                                    <div>
                                        <Link to="/about">
                                            <span className="sm:text-lg">About</span>
                                        </Link>
                                    </div>
                                </nav>
                                { isHome ?
                                    <div className="max-w-xl text-white py-8 sm:py-12">
                                        <p className="text-xl sm:text-2xl">{site.description}</p>
                                    </div> :
                                    null}
                            </div>
                        </header>
                    }

                    <main>
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div>
                    {/* The footer at the very bottom of the screen */}
                    <footer className="bg-gray-800">
                        <div className="flex flex-row justify-between max-w-screen-md m-auto pt-4 pb-16 sm:px-8 px-4 text-white">
                            <div>
                                <Link to="/">{site.title} © 2020</Link>
                            </div>
                            <div>
                                <Link to="/about">
                                    <span>About</span>
                                </Link>
                            </div>
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
