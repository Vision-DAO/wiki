import Head from "next/head";
import { MetaMaskInpageProvider } from "@metamask/providers";
import React from "react";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

const LOGIN_ATTESTATION = "I am logging in to Vision Status Dashboard.";
const META_INSTALL_URL = "https://metamask.io/";

type FlowStatus = "needs extension" | "connecting" | "logging in";

interface FlowStep {
	label: string;
	executor: () => void;
}

/**
 * Satisfy typescript wanting typings for the window.ethereum instance.
 */
declare global {
	interface Window {
		ethereum: MetaMaskInpageProvider;
	}
}

export const Login = () => {
	const [status, setStatus] = useState<FlowStatus | undefined>(undefined);
	const [authAddr, setAuthAddr] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (status === undefined && window.ethereum !== undefined)
			setStatus("connecting");

		if (window.ethereum) {
			const handleAccountsChange = (arg: unknown) => {
				const accounts = arg as string[];

				setAuthAddr(accounts[0] as string);
			};

			window.ethereum.on("accountsChanged", handleAccountsChange);

			return () => {
				window.ethereum.removeListener(
					"accountsChanged",
					handleAccountsChange
				);
			};
		}
	});

	let child: FlowStep;

	switch (status ?? "needs extension") {
		case "needs extension":
			child = {
				label: "Install Metamask to Continue.",
				executor: () => {
					location.href = META_INSTALL_URL;
				},
			};

			break;
		case "connecting":
			child = {
				label: "Login with Metamask (1/2)",
				executor: async () => {
					const resp = await window.ethereum.request({
						method: "eth_accounts",
					});

					if (resp === undefined || resp === null) return;

					const addrs = resp as string[];

					setAuthAddr(addrs[0]);
					setStatus("logging in");
				},
			};

			break;
		case "logging in":
			child = {
				label: "Login with Metamask (2/2)",
				executor: async () => {
					if (authAddr === undefined) return;

					const signature = await window.ethereum.request({
						method: "personal_sign",
						params: [LOGIN_ATTESTATION, authAddr, ""],
					});
					document.cookie = `${LOGIN_ATTESTATION}=${signature};`;
					location.href = `${window.location.origin}/Status.html`;
				},
			};

			break;
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Vision Development Status</title>
				<meta
					name="description"
					content="A dashboard displaying the current development status of Vision."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<div className={styles.authcard}>
					<img
						src="/Vision Eye Only.png"
						style={{ height: "20vw" }}
					/>
					<h1>Login to Continue</h1>
					<div className={styles.loginBtn} onClick={child.executor}>
						<p>{child.label}</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;
