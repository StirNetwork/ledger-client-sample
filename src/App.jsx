import React from "react";
import "./App.css";

import Cosmos from "@lunie/cosmos-js";

const STARGATE_URL = "https://cosmos-mainnet-s-001.k80s.net/";
const ADDRESS = "cosmos1z52hq26g5n3la3m8sucrpessx33dgedw3cgvn0";
const cosmos = new Cosmos(STARGATE_URL, ADDRESS);

function App() {
  console.log(cosmos);

  /*
  {
    url: "https://cosmos-mainnet-s-001.k80s.net/",
    get: {
      url: "https://cosmos-mainnet-s-001.k80s.net/",
      connected: ƒ,
      nodeVersion: ƒ,
      account: ƒ,
      txs: ƒ
    },
    accounts: {},
    chainId: "cosmos1z52hq26g5n3la3m8sucrpessx33dgedw3cgvn0",
    MsgSend: ƒ(t, e),
    MsgDelegate: ƒ(t, e),
    MsgUndelegate: ƒ(t, e),
    MsgRedelegate: ƒ(t, e),
    MsgSubmitProposal: ƒ(t, e),
    MsgVote: ƒ(t, e),
    MsgDeposit: ƒ(t, e),
    MsgWithdrawDelegationReward: ƒ(t, e),
    default: ƒ(t, e),
    MultiMessage: ƒ(t)
  }
  */

  const handleDelegation = async () => {
    const msg = cosmos.MsgDelegate(ADDRESS, {
      validator_address: "cosmosvaloper1qdxmyqkvt8jsxpn5pp45a38ngs36mn2604cqk9",
      amount: 0.01,
      denom: "STAKE"
    });

    console.log(msg);

    /*
    {
      message: {
        type: "cosmos-sdk/MsgDelegate",
        value: {
          type: "cosmos-sdk/MsgDelegate"
          value:{
            delegator_address: "cosmos1z52hq26g5n3la3m8sucrpessx33dgedw3cgvn0",
            validator_address: "cosmosvaloper1qdxmyqkvt8jsxpn5pp45a38ngs36mn2604cqk9"
          }
          amount: {amount: "0.01", denom: "STAKE"}
        }
      },
      simulate: ƒ(e),
      send: ƒ(e, o)
    };
    */
  };

  return (
    <div>
      hello
      <button onClick={handleDelegation}>テスト</button>
    </div>
  );
}

export default App;
