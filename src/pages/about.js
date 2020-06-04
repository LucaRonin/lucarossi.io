import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const About = () => (
    <Layout>
        <div className="w-full bg-white min-h-screen" style={{ flexGrow: 1 }}>
            <div className="max-w-screen-md m-auto sm:px-8 px-4 pb-8">
                <header className="pt-8 mb-8">
                    <Link to="/">
                        <p className="text-blue-600 font-medium sm:text-lg mb-8">← Home</p>
                    </Link>
                </header>
                <article>
                </article>
            </div>
        </div>
    </Layout>
)

export default About
