/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from "next/app";
import Head from "next/head";
import { globalStyles } from "../shared/styles";

const App = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <>
    <Head>
      <title>Next Time, Use Slack</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Ever wonder how much a meeting 'costs'? Easily calculate the cost of a meeting or start a timer to watch how much money you're burning. Next time, let's just use slack instead."
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&display=swap"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@publisher_handle" />
      <meta name="twitter:title" content="Page Title" />
      <meta
        name="twitter:description"
        content="Page description less than 200 characters"
      />
      <meta name="twitter:creator" content="@author_handle" />
      {/* <!-- Twitter summary card with large image must be at least 280x150px --> */}
      <meta
        name="twitter:image:src"
        content="images/burn.jpg"
      />

      <meta property="og:title" content="Next Time, Use Slack" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://nexttimeuseslack.com/" />
      <meta property="og:image" content="images/burn.jpg" />
      <meta property="og:description" content="Description Here" />
      <meta property="og:site_name" content="Next Time, Use Slack" />
      <meta property="fb:admins" content="578412433" />
    </Head>
    {globalStyles}
    <Component {...pageProps} />
  </>
);

export default App;
