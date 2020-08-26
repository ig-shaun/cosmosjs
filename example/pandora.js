const cosmosjs = require("../src");

// [WARNING] This mnemonic is just for the demo purpose. DO NOT USE THIS MNEMONIC for your own wallet.
const mnemonic = "broken differ fantasy office unique vague orphan census educate mesh shield disorder";
const chainId = "pandora-1";
const ixo = cosmosjs.network("http://localhost:1317", chainId);
ixo.setBech32MainPrefix("ixo");
ixo.setPath("m/44'/118'/0'/0/0");
const address = ixo.getIxoAddress(mnemonic);
const ixoDid = ixo.getIxoDid(mnemonic);

// Generate MsgSend transaction and broadcast
ixo.getAccounts(address).then(data => {
  let stdSignMsg = ixo.newStdMsg({
    msgs: [
      {
        type: "cosmos-sdk/MsgSend",
        value: {
          amount: [
            {
              amount: String(100000), 	// 6 decimal places (1000000 uixo = 1 IXO)
              denom: "uixo"
            }
          ],
          from_address: address,
          to_address: "ixo1x70tkjl6kqy92h2d0rshhpga3a5m672wx59l9n"
        }
      }
    ],
    chain_id: chainId,
    fee: {amount: [{amount: String(5000), denom: "uixo"}], gas: String(200000)},
    memo: "",
    account_number: String(data.result.value.account_number),
    sequence: String(data.result.value.sequence)
  });

  const signedTx = ixo.signIxo(stdSignMsg, ixoDid);
  ixo.broadcast(signedTx).then(response => console.log(response));
})
