import "../styles/globals.css";
import { Component } from "react";

export const MyApp = ({
	Component,
	pageProps,
}: {
	Component: Component;
	pageProps: unknown[];
}) => {
	return <Component {...pageProps} />;
};

export default MyApp;
