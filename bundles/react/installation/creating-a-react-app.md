---
type: Guide
title: Creating a React App
description: Recommended full-stack frameworks for starting a new React app, plus when to start from scratch instead.
resource: https://react.dev/learn/creating-a-react-app
tags: [react, frameworks, nextjs, react-router, expo]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

To build a new app or website with React, start with a framework. The recommended frameworks support the production features you need, integrate the latest React features, and take advantage of React's architecture. If a framework does not fit your constraints, you can instead [build a React app from scratch](/installation/build-a-react-app-from-scratch.md).

# Full-stack frameworks

These frameworks support all the features needed to deploy and scale an app in production. They do not require a server: each supports client-side rendering (CSR), single-page apps (SPA), and static-site generation (SSG), so the output can be deployed to a CDN or static host. Each also allows opting in to server-side rendering on a per-route basis, so you can start client-only and add server features to individual routes later without rewriting the app.

| Framework | Create command | Notes |
| --- | --- | --- |
| Next.js (App Router) | `npx create-next-app@latest` | React framework that takes full advantage of React's architecture for full-stack apps. Maintained by Vercel. Deploy to any Node.js or Docker host, your own server, or via static export. |
| React Router (v7) | `npx create-react-router@latest` | Most popular React routing library, paired with Vite into a full-stack framework. Emphasizes standard Web APIs and ships ready-to-deploy templates. Maintained by Shopify. |
| Expo (native apps) | `npx create-expo-app@latest` | React framework for universal Android, iOS, and web apps with native UIs. Provides an SDK for React Native. Free to build and ship to app stores, with opt-in paid cloud services. Maintained by Expo. |

# Other frameworks

These up-and-coming frameworks are working toward the full-stack React vision:

- [TanStack Start (Beta)](https://tanstack.com/start/): full-stack React framework powered by TanStack Router, with full-document SSR, streaming, server functions, and bundling via tools like Nitro and Vite.
- [RedwoodSDK](https://rwsdk.com/): full-stack React framework with many pre-installed packages and configuration for building full-stack web apps.

# The full-stack architecture vision

The React team's vision centers on React Server Components and Suspense, which are React features rather than framework features. Adopting them at the framework level requires non-trivial implementation work, and Next.js's App Router is currently the most complete implementation of the official React Server Components specification.

- A server-only component can be an `async` function that reads from a database or file, then passes data down to interactive components.

```jsx
async function Talks({ confId }) {
  const talks = await db.Talks.findAll({ confId });
  const videos = talks.map(talk => talk.video);
  return <SearchableVideoList videos={videos} />;
}
```

- Data fetching integrates with Suspense, so you can declare a loading state for parts of the UI directly in the tree.

```jsx
<Suspense fallback={<TalksLoading />}>
  <Talks confId={conf.id} />
</Suspense>
```

# Start from scratch

If your app has constraints not served by existing frameworks, you prefer to build your own framework, or you just want to learn the basics, you can start from scratch with a build tool like Vite, Parcel, or RSbuild. This gives more flexibility but requires you to choose tools for routing, data fetching, and other patterns yourself, which is much like building your own framework. See [Build a React App from Scratch](/installation/build-a-react-app-from-scratch.md).

# Citations

[1] [Creating a React App](https://react.dev/learn/creating-a-react-app)
