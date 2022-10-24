/* eslint-disable no-unused-vars */
const Web3 = require("web3");
const WEBSOCKET_PROVIDER_LINK =
  "wss://bsc.getblock.io/mainnet/?api_key=dd4b1d94-6c08-4546-9200-63c60dd0e8cf";

const PROVIDER_LINK = "https://bsc-dataseed1.binance.org/";

const web3Ws = new Web3(
  new Web3.providers.WebsocketProvider(WEBSOCKET_PROVIDER_LINK)
);

const web3 = new Web3(PROVIDER_LINK);

web3Ws.eth.subscribe("pendingTransactions", function (error, result) {
  setTimeout(() => {
    web3.eth.getTransaction(result).then(console.log);
  }, 20000);
});
