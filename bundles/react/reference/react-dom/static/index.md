# React DOM Static APIs

Static site generation (SSG) APIs from `react-dom/static`. They prerender a React tree to static HTML, waiting for all data (including Suspense-fetched data) to load before resolving. They split by runtime: Node.js Streams versus Web Streams. The `resumeAndPrerender` variants continue a prerender that was aborted.

- [prerender](prerender.md) - Prerenders a React tree to static HTML via a Web Stream (Web Streams runtime).
- [prerenderToNodeStream](prerenderToNodeStream.md) - Prerenders a React tree to static HTML via a Node.js Stream (Node.js runtime).
- [resumeAndPrerender](resumeAndPrerender.md) - Continues an aborted prerender to static HTML via a Web Stream (Web Streams runtime).
- [resumeAndPrerenderToNodeStream](resumeAndPrerenderToNodeStream.md) - Continues an aborted prerender to static HTML via a Node.js Stream (Node.js runtime).
