# DESCRIPTION OF PODCASTR APP
---
An app that serves as a podcast website, following react patterns using eslint and typescript. You can define a api that return a json with the `server.json` format and only update the base url on `api.ts`. The mock json is showing rocketseat podcasts.

| Home Screen | Episode Screen|
:------------:|:--------------:|
![home_podcastr](https://user-images.githubusercontent.com/17517057/115971540-64e17b00-a51f-11eb-890d-d59bd6bdce2f.png)|![episode_podcastr](https://user-images.githubusercontent.com/17517057/115971587-9f4b1800-a51f-11eb-9ffc-b167de296a4b.png)

Some concepts treated on this project:
 * Server Side Rendering (SSR)
 * Static Server Generation (SSG)
 * And another Next.js and all it's cool features!
 * Context API
 * Template Refs
 * useState
 * JSX and TSX
 * And another React.js cool features
 * Tailwind css
 * Eslint react setup

Some future cool updates:
 * Add dark theme
 * create native apps such as PWA Android app or Electron app
 * Responsive design displaying some another view beside table on mobile devices

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the json-server mock, so the information will fill the screen with server.json information

```bash
yarn server
```
The server is settled with a 750ms delay so you can see the SSG working during the build server of the client application.

Second, run the development server:

```bash
npm run dev
# or
yarn dev
```

Or build it with SSG!
```bash
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


