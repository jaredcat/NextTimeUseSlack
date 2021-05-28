/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from "next/app";
import Head from "next/head";
import { globalStyles } from "../shared/styles";

const title = "Next Time, Use Slack";
const description =
  "Ever wonder how much a meeting 'costs'? Easily calculate the cost of a meeting or start a timer to watch how much money you're burning. Next time, let's just use slack instead.";
const siteUrl = "https://nexttimeuseslack.com";
const previewImage = "https://nexttimeuseslack.com/images/burn.jpg";
const twitterHandle = "@xz3r0";
const fbAdminId = "578412433";

const App = ({ Component, pageProps }: AppProps): React.ReactElement => (
  <>
    <Head>
      <title>{title}</title>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />

      {/* Facebook */}
      <meta property="og:url" content={siteUrl} key="ogurl" />
      <meta property="og:image" content={previewImage} key="ogimage" />
      <meta property="og:site_name" content={title} key="ogsitename" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="og:type" content="website" key="ogtype" />
      <meta property="fb:admins" content={fbAdminId} key="fbadmins" />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twittercard"
      />
      <meta name="twitter:site" content={twitterHandle} key="twittersite" />
      <meta name="twitter:title" content={title} key="twittertitle" />
      <meta
        name="twitter:description"
        content={description}
        key="twitterdescription"
      />
      <meta
        name="twitter:creator"
        content={twitterHandle}
        key="twittercreator"
      />
      <meta name="twitter:image" content={previewImage} key="twitterimage" />
    </Head>
    {globalStyles}
    <Component {...pageProps} />
  </>
);

export default App;
