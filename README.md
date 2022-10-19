# Super Bot

### Run with node

```js
NODE_ENV=production node src/index.js
```

### Run with Node

```sh
NODE_ENV=production node src/
```

### Run with Docker

```sh
docker-compose up -d
```

## Configuration

Configuration can be found in `src/config`, default scheduled checks are every 15m, 1h, 4h and 24h.

Each schedule config object has an `interval` which is the time interval to check for price change on the Binance Api and a `cron` expression that is used to schedule the worker.

### .env

| variable       | default    | description                                                           |
| -------------- | ---------- | --------------------------------------------------------------------- |
| `TG_BOT_TOKEN` |            | [creating-a-new-bot](https://core.telegram.org/bots#creating-a-new-bot)                                                                   |
| `TG_CHAT_ID`   |            |                                                                     |
| `NOTIFIER`     | `console`  | Can be `console` or `telegram`                                        |
| `PRICE_PAIRS`  | `BTC/USDT` | Price pair divided by comma as seen on binace, eg: `BTC/USDT,ETHUSDT` |
