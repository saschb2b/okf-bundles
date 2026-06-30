# React DOM Server APIs

Server-rendering APIs from `react-dom/server`. They turn a React tree into HTML on the server, either as a blocking string or as a stream. Streaming APIs split by runtime: Node.js Streams versus Web Streams.

- [renderToPipeableStream](renderToPipeableStream.md) - Streams a React tree to a pipeable Node.js Stream (Node.js runtime).
- [renderToReadableStream](renderToReadableStream.md) - Streams a React tree to a Readable Web Stream (Web Streams runtime).
- [renderToStaticMarkup](renderToStaticMarkup.md) - Renders a non-interactive React tree to an HTML string that cannot be hydrated.
- [renderToString](renderToString.md) - Renders a React tree to an HTML string, without streaming or data waiting (legacy).
- [resume](resume.md) - Resumes a prerendered tree to a Readable Web Stream from a postponed state (Web Streams runtime).
- [resumeToPipeableStream](resumeToPipeableStream.md) - Resumes a prerendered tree to a pipeable Node.js Stream from a postponed state (Node.js runtime).
