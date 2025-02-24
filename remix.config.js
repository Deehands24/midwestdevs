/** @type {import('@remix-run/dev').AppConfig} */
export default {
  // Tell Remix to generate the server build at "build/server/index.js"
  // so that "remix-serve ./build/server/index.js" works correctly.
  serverBuildPath: "build/server/index.js",

  // In production, your compiled assets will be served from /build/
  publicPath: "/build/",

  // OPTIONAL: If you use the new route conventions, enable them here.
  // future: {
  //   v2_routeConvention: true,
  //   // etc.
  // },
}; 