import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import { formatDate } from '../../utils/helpers'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <div className="mb-8">
            <header className="">
                <div className="text-red-500 text-xs font-medium uppercase">
                    <time>{formatDate(post.published_at)}</time>
                    <span className="px-1">&bull;</span>
                    <span>{readingTime}</span>
                </div>
                <Link to={url}>
                    <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
                </Link>
            </header>
            <section className="text-gray-500 font-base">{post.excerpt}</section>
        </div>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        published_at: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default PostCard
