/* eslint-disable no-unused-vars */
const Web3 = require("web3");

async function parseTransactionData() {
  const input =
    "0xfb3bdb4100000000000000000000000000000000000000000000000000001130442e7e000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000e2ce1fa9a5640f069aa507d9ef5e91ed2df6db89000000000000000000000000000000000000000000000000000000006356a5ac0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000489e9c0126e18a4ebf84bab0aab75ed6151fd9a4";
  const parameters = [
    { type: "uint256", name: "amountOut" },
    { type: "address[]", name: "path" },
    { type: "address", name: "to" },
    { type: "uint256", name: "deadline" },
  ];
  const functionName =
    "swapETHForExactTokens(uint256 amountOut, address[] path, address to, uint256 deadline)";
  const regExp = /\(([^)]+)\)/;
  const matches = regExp.exec(functionName);
  if (!matches) {
    return false;
  }
  if (matches.length < 2) {
    return false;
  }
  var parameterString = matches[1];
  var parameterStringDelimited = parameterString.split(",");
  parameterStringDelimited.forEach(function (item) {
    var itemDelimited = item.trim().split(" ");
    parameters.push({ type: itemDelimited[0], name: itemDelimited[1] });
  });
  let relevantABI = [
    {
      inputs: [
        { internalType: "uint256", name: "amountOut", type: "uint256" },
        { internalType: "address[]", name: "path", type: "address[]" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "deadline", type: "uint256" },
      ],
      name: "swapETHForExactTokens",
      outputs: [
        { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
      ],
      stateMutability: "payable",
      type: "function",
    },
  ];
  if (relevantABI.length > 1) {
    parameters.forEach(function (param) {
      relevantABI = relevantABI.filter(function (res) {
        var hasInput = res.inputs.some(
          (x) => x.name == param.name && x.type == param.type
        );
        return hasInput;
      });
    });
  }
  var inputs = relevantABI[0].inputs;
  const types = inputs.map((x) => x.type);
  var web3 = new Web3();
  var resultArray = [];
  try {
    resultArray = web3.eth.abi.decodeParameters(types, input.substring(10));
    console.log(resultArray);
  } catch (err) {
    console.log(err);
    return false;
  }
}
