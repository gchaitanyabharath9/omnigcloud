import middleware from "./app-routing";

export default middleware;

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
