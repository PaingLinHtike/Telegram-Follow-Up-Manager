# Telegram Follow-Up Manager

React 19 and Vite prototype for manually tracking Telegram contacts and follow-ups.

## Development

Install Node.js 22 LTS, then run:

```sh
npm install
npm run dev
```

Open the URL printed by Vite. To access the application from another device on the same network, run `npm run dev -- --host 0.0.0.0`.

The current prototype uses sample data and keeps changes in memory. There is no backend, authentication, Telegram synchronization, automatic reply detection, or scheduled reminder delivery yet.

## Verification

```sh
npm run lint
npm run build
```
