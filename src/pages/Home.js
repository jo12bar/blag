import React from 'react';
import deline from 'deline';
import styles from '../css/Home';

const ArticleLink = ({ href, children }) => (
  <a
    className={styles.articleLinks}
    target='_blank'
    href={href}
    rel='noopener noreferrer'
  >
    {children}
  </a>
);

const Home = () => (
  <div className={styles.home}>
    <h1>Home</h1>

    <h2>
      NOTE: The top set of links in the sidebar to the left are real links, made
      like this:
    </h2>

    <span className={styles.linkExampleLabel}>HREF STRING:</span>
    <pre>
      <code>{'<Link to=\'/list/db-graphql\'>DB & GRAPHQL</Link>'}</code>
    </pre>

    <span className={styles.linkExampleLabel}>PATH SEGMENTS:</span>
    <pre>
      <code>
        {'<Link to={[\'list\', \'react-redux\']}>REACT & REDUX</Link>'}
      </code>
    </pre>

    <span className={styles.linkExampleLabel}>ACTION:</span>
    <pre>
      <code>
        {'<Link to={{ type: \'LIST\', payload: { slug: \'fp\' } }}>FP</Link>'}
      </code>
    </pre>

    <h2>EVENT HANDLERS CAN DISPATCH ACTIONS:</h2>

    <pre>
      <code>
        {`const onClick = () => dispatch({
  type: 'LIST',
  payload: { category: 'react-redux' },
});`}
      </code>
    </pre>

    <p>
      <span className={styles.directionsLabel}>DIRECTIONS: </span>
      <span className={styles.directions}>
        {deline`
          Inspect the sidebar links to see that the top set are real <a> tags,
          and the bottom set are actually <button>'s, but yet the address bar
          changes for both. The decision of which one to use is up to you. When
          using the <Link /> component, if you provide an action as the \`href\`
          prop, then you never need to worry if you cahnge the static path
          segments (e.g: \`/list\`) in the routes map passed to
          \`connectRoutes\`. ALSO: Don't forget to use the browser's Back/ Next
          buttons to see that working too!
        `}
      </span>
    </p>

    <h2>Links about Redux-First Router (RFR):</h2>

    {'> '}
    <ArticleLink
      href='https://medium.com/faceyspacey/server-render-like-a-pro-w-redux-first-router-in-10-steps-b27dd93859de'
    >
      Server-Render Like A Pro in 10 Steps w/ Redux-First Router 🚀
    </ArticleLink>

    <br />
    <br />

    {'> '}
    <ArticleLink
      href='https://medium.com/faceyspacey/redux-first-router-lookin-sexy-on-code-sandbox-d9d9bea15053'
    >
      Things To Pay Attention To In This Demo
    </ArticleLink>

    <br />
    <br />

    {'> '}
    <ArticleLink
      href='https://medium.com/faceyspacey/pre-release-redux-first-router-a-step-beyond-redux-little-router-cd2716576aea'
    >
      Pre Release: Redux-First Router — A Step Beyond Redux-Little-Router
    </ArticleLink>

    <br />
    <br />

    {'> '}
    <ArticleLink
      href='https://medium.com/faceyspacey/redux-first-router-data-fetching-solving-the-80-use-case-for-async-middleware-14529606c262'
    >
      Redux-First Router data-fetching: solving the 80% use case for async
      middleware
    </ArticleLink>
  </div>
);

export default Home;
