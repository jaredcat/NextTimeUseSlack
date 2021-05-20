/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { AppProps } from "next/app";
import { globalStyles } from "../shared/styles";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    {globalStyles}
    <Component {...pageProps} />
  </>
);

export default App;
