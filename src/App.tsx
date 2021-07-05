import React from "react";
import { CosmosSDK, AccAddress, ValAddress } from "cosmos-client";
import { staking, DelegateRequest } from "cosmos-client/x/staking";
import { StdTx, BroadcastReq, auth, BaseAccount } from "cosmos-client/x/auth";
import { sign } from "./sign";
// import Ledger from "@lunie/cosmos-ledger";

const sdk = new CosmosSDK("http://localhost:8008", "cosmoshub-3");
const DELEGATOR_ADDRESS = "cosmos1z52hq26g5n3la3m8sucrpessx33dgedw3cgvn0";

function App() {
  const handleDelegation = async () => {
    const account = (await auth.queryAccount(
      sdk,
      AccAddress.fromBech32(DELEGATOR_ADDRESS)
    )) as any;

    const seq = `${Number(account.result.sequence) + 1}`;

    const delegationReq: DelegateRequest = {
      base_req: {
        from: DELEGATOR_ADDRESS,
        memo: "",
        chain_id: sdk.chainID,
        account_number: account.result.account_number,
        sequence: seq,
        fees: [],
        gas: "",
        gas_adjustment: "",
        gas_prices: [],
        simulate: false
      },
      delegator_address: AccAddress.fromBech32(DELEGATOR_ADDRESS),
      validator_address: ValAddress.fromBech32(
        "cosmosvaloper1qdxmyqkvt8jsxpn5pp45a38ngs36mn2604cqk9"
      ),
      amount: {
        denom: "uatom",
        amount: "1"
      }
    };

    console.log(account);

    const unsinedTxs = await fetch(
      sdk.url + `/staking/delegators/${DELEGATOR_ADDRESS}/delegations`,
      {
        method: "POST",
        body: JSON.stringify(delegationReq),
        headers: { "Content-Type": "application/json" },
        mode: "cors"
      }
    ).then(resp => resp.json());

    // const unsinedTxs = await staking.postDelegation(
    //   sdk,
    //   AccAddress.fromBech32(DELEGATOR_ADDRESS),
    //   delegationReq
    // );

    // const ledger = await new Ledger().connect();
    // const signature = await ledger.sign(unsinedTxs);

    const { signatures: s, publicKey } = await sign(
      unsinedTxs.value,
      account.result.account_number,
      seq
    );
    console.log(s);

    const signatures: any = [
      {
        signature: s,
        account_number: account.result.account_number,
        sequence: seq,
        pub_key: {
          type: "tendermint/PubKeySecp256k1",
          value: publicKey
        }
      }
    ];
    // const signedTxs = new StdTx(
    //   unsinedTxs.value.msg,
    //   {
    //     ...unsinedTxs.value.fee,
    //     amount: [{ amount: "48000", denom: "uatom" }]
    //   },
    //   signatures,
    //   ""
    // );
    const signedTxs: any = {
      msg: unsinedTxs.value.msg,
      signatures,
      fee: {
        ...unsinedTxs.value.fee,
        amount: [{ amount: "48000", denom: "uatom" }]
      },
      memo: "",
      account_number: account.result.account_number,
      sequence: seq,
      chain_id: sdk.chainID
    };

    const broadcastReq: BroadcastReq = {
      tx: signedTxs,
      mode: "block"
    };

    console.log(broadcastReq);

    const resp = await auth.broadcast(sdk, broadcastReq);
    // const result = await fetch(sdk.url + `/txs`, {
    //   method: "POST",
    //   body: JSON.stringify(broadcastReq),
    //   headers: { "Content-Type": "application/json" },
    //   mode: "cors"
    // }).then(resp => resp.json());

    console.log(resp);
  };
  return (
    <div>
      hello
      <button onClick={handleDelegation}>テスト</button>
    </div>
  );
}

export default App;
