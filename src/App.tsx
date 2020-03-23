import React from "react";
import { CosmosSDK, AccAddress, ValAddress } from "cosmos-client";
import { staking, DelegateRequest } from "cosmos-client/x/staking";

const sdk = new CosmosSDK(
  "https://cosmos-mainnet-s-001.k80s.net/",
  "cosmoshub-3"
);
const DELEGATOR_ADDRESS = "cosmos1z52hq26g5n3la3m8sucrpessx33dgedw3cgvn0";

function App() {
  const handleDelegation = async () => {
    const delegationReq: DelegateRequest = {
      base_req: {
        from: DELEGATOR_ADDRESS,
        memo: "",
        chain_id: sdk.chainID,
        account_number: "0",
        sequence: "1",
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
        amount: "0.0001"
      }
    };
    const unsinedTxs = await staking.postDelegation(
      sdk,
      AccAddress.fromBech32(DELEGATOR_ADDRESS),
      delegationReq
    );

    console.log(unsinedTxs);
  };
  return (
    <div>
      hello
      <button onClick={handleDelegation}>テスト</button>
    </div>
  );
}

export default App;
