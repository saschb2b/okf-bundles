---
type: Guide
title: Build a React App from Scratch
description: How to set up a React project from scratch with a build tool, and the application patterns you must solve yourself.
resource: https://react.dev/learn/build-a-react-app-from-scratch
tags: [react, vite, parcel, rsbuild, build-tools]
timestamp: 2026-06-30T12:00:00Z
---

# Summary

Building from scratch is an easy way to start, but it is much like building your own ad hoc framework. You choose a build tool, then solve routing, data fetching, code splitting, and rendering strategy yourself. Choose this path only if you are comfortable tackling those problems, or are confident you will never need framework-level features. For most new apps, prefer [Creating a React App](/installation/creating-a-react-app.md).

# Consider using a framework first

Tradeoffs of going from scratch:

- Server-side rendering (SSR), static site generation (SSG), and React Server Components (RSC) must be implemented by you if your needs grow.
- Future React features that integrate at the framework level become your responsibility.
- Frameworks help you build better-performing apps, for example by reducing network request waterfalls.
- Support is harder to find, because your routing, data fetching, and other choices are unique to your setup.

# Step 1: Install a build tool

A build tool packages and runs source code, provides a development server, and provides a build command for production. Pick one:

| Tool | Command | Notes |
| --- | --- | --- |
| [Vite](https://vite.dev/) | `npm create vite@latest my-app -- --template react-ts` | Fast, leaner dev experience. Rich plugin ecosystem for fast refresh, JSX, Babel/SWC. Already used by the recommended React Router framework. |
| [Parcel](https://parceljs.org/) | `npm install --save-dev parcel` | Great out-of-the-box dev experience that scales to production. Supports fast refresh, JSX, TypeScript, Flow, and styling out of the box. |
| [Rsbuild](https://rsbuild.dev/) | `npx create-rsbuild --template react` | Rspack-powered, with tuned defaults and built-in support for fast refresh, JSX, TypeScript, and styling. |

For React Native, you need [Metro](https://metrobundler.dev/), the React Native bundler. It bundles for iOS and Android but lacks many features of the tools above, so prefer Vite, Parcel, or Rsbuild unless the project requires React Native.

# Step 2: Build common application patterns

The build tools above start as a client-only single-page app (SPA) and include no further solutions. You must add these yourself.

## Routing

Maps URLs to parts of your app, including nested routes, route parameters, and query parameters. Routers are usually integrated with data fetching, code splitting, and rendering strategy. Suggested:

- [React Router](https://reactrouter.com/start/data/custom)
- [TanStack Router](https://tanstack.com/router/latest)

## Data fetching

Handles loading states, error states, and caching. Prefer prefetching in router loaders or on the server rather than fetching directly in components, which can cause network waterfalls. Suggested for REST-style backends:

- [TanStack Query](https://tanstack.com/query/)
- [SWR](https://swr.vercel.app/)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)

For GraphQL: [Apollo](https://www.apollographql.com/docs/react), [Relay](https://relay.dev/).

## Code splitting

Breaks the app into smaller bundles loaded on demand. Splitting by route, integrated with bundling and data fetching, reduces initial load time and improves Largest Contentful Paint. Naive splitting can be slower than none if it introduces waterfalls (for example, [lazily loading](/reference/react/apis/lazy.md) a chart that then fetches its own data, so you wait twice). See your build tool's docs:

- [Vite build optimizations](https://vite.dev/guide/features.html#build-optimizations)
- [Parcel code splitting](https://parceljs.org/features/code-splitting/)
- [Rsbuild code splitting](https://rsbuild.dev/guide/optimization/code-splitting)

## Improving application performance

Because the build tool only supports SPAs, you may need other rendering patterns. Integrate them with your router so each route can choose a strategy without rewriting the app.

- Single-page app (SPA): loads one HTML page and updates dynamically. Easiest to start, slower initial load. The default for most build tools.
- Streaming server-side rendering (SSR): renders on the server and sends the rendered page. Improves performance but is complex to set up, especially with streaming.
- Static site generation (SSG): generates static HTML at build time. Improves performance, more complex than SSR.
- React Server Components (RSC): mixes build-time, server-only, and interactive components in one tree. Improves performance but currently needs deep expertise.

The right strategy per route can improve Time to First Byte, First Contentful Paint, and Largest Contentful Paint.

# Pitfalls

- The problems above are interconnected and can require deep expertise. If you do not want to solve them yourself, [get started with a framework](/installation/creating-a-react-app.md) that provides them out of the box.

# Citations

[1] [Build a React app from Scratch](https://react.dev/learn/build-a-react-app-from-scratch)
