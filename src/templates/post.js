import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

import { formatDate } from '../utils/helpers'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const site = data.allGhostSettings.edges[0].node

    const readingTime = readingTimeHelper(post)

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="w-full bg-white">
                    <div className="max-w-screen-md m-auto sm:px-8 px-4 pb-8">
                        <header className="pt-8 mb-8">
                            <Link to="/">
                                <p className="text-blue-600 sm:text-lg mb-8">← {site.title}</p>
                            </Link>
                            <div className="text-red-500 text-sm font-medium uppercase">
                                <time>{formatDate(post.published_at)}</time>
                                <span className="px-1">&bull;</span>
                                <span>{readingTime}</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl mb-4">{post.title}</h1>
                            <p className="text-gray-500">{post.excerpt}</p>
                        </header>
                        <article>
                            { post.feature_image ?
                                <figure className="-ml-4 -mr-4">
                                    <img src={ post.feature_image } alt={ post.title } />
                                </figure> : null }
                            <section
                                className=""
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </article>
                    </div>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
        allGhostSettings {
            edges {
                node {
                    ...GhostSettingsFields
                }
            }
        }
    }
`
