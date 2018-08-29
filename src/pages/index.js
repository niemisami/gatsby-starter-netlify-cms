import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import AboutPage from '../templates/about-page'
export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <Fragment>
        <AboutPage {...this.props} />
        <section className="section bring-up pt-0">
          <div className="container">
            <div className="content">
              <div className="columns">
                <div className="column is-10 is-offset-1">
                  <h2 className="has-text-weight-bold is-size-4">Miten meillä menee</h2>
                  {posts
                    .map(({ node: post }) => (
                      <div
                        className="content"
                        style={{ border: '1px solid #eaecee', color: '#0f0f0f', backgroundColor: '#fafafa', padding: '2em 4em' }}
                        key={post.id}
                      >
                        <p>
                          <Link className="has-text-primary" to={post.fields.slug}>
                            {post.frontmatter.title}
                          </Link>
                          <span> &bull; </span>
                          <small>{post.frontmatter.date}</small>
                        </p>
                        <p>
                          {post.excerpt}
                          <br />
                          <br />
                          <Link className="button is-small" to={post.fields.slug}>
                            Lue lisää →
                  </Link>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}


export const pageQuery = graphql`
  query PageQuery  {
          allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___date] },
      filter: {frontmatter: {templateKey: {eq: "blog-post" } }}
    ) {
          edges {
        node {
          excerpt(pruneLength: 400)
      id
          fields {
          slug
        }
        frontmatter {
          title
            templateKey
        date(formatString: "DD MMMM YYYY", locale: "FI-fi")
      }
    }
  }
},
    markdownRemark(frontmatter: {templateKey: {eq: "about-page" }}) {
          html
          frontmatter {
          title
        }
        }
  }
  `
