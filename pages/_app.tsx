import "../styles/globals.css";
import { AppProps } from "next/app";

export const MyApp = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default MyApp;
