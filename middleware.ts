import { recoverAddress, id } from "ethers/lib/utils";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOGIN_ATTESTATION = "I am logging in to Vision Status Dashboard.";
const WHITELISTED = new Set([
	"0xdc36FA7961324b2403e4DD8B9c3bdd27c725E693",
	"0xecDd164e108EE04736EE264e00B7a024267fc62b",
	"0xd3Fe8b4f1CF50E27fE8707921d38B77F09aC6Db8",
	"0xe7FBEE6F331E209a6C4B2b1f8Eb382d54F438B76",
	"0x39bee5D198c7F83281C1402A845eB8E2f4622BA2",
	"0xcFdDa7a46853EeEdA37C4C61f52f93a9D7cb2F24",
]);

export const middleware = (request: NextRequest): NextResponse => {
	const url = request.nextUrl;

	if (request.nextUrl.pathname === "/") {
		return NextResponse.redirect(`${url.origin}/Status.html`);
	}

	// Unprivileged resources
	if (!url.pathname.includes(".html")) return NextResponse.next();

	// Make sure the user has a valid cookie to see the resource
	const sig = request.cookies.get(LOGIN_ATTESTATION);

	if (sig === undefined) return NextResponse.redirect(`${url.origin}/login`);

	const msg = id(
		`\x19Ethereum Signed Message:\n${LOGIN_ATTESTATION.length}${LOGIN_ATTESTATION}`
	);

	if (WHITELISTED.has(recoverAddress(msg, sig))) return NextResponse.next();

	return NextResponse.redirect(`${url.origin}/login`);
};
