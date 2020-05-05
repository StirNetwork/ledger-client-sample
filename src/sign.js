import Ledger from "@lunie/cosmos-ledger";
import { createSignMessage } from "../node_modules/@lunie/cosmos-js/src/signature";

export const sign = async (tx, anum, seq) => {
  const ledger = await new Ledger({ testModeAllowed: true }).connect();

  console.log(anum);

  const msg = createSignMessage(tx, {
    chainId: "cosmoshub-3",
    sequence: seq,
    accountNumber: anum
  });

  const publicKey = await ledger.getPubKey();
  const signature = await ledger.sign(msg);

  return {
    signatures: signature.toString(`base64`),
    publicKey: publicKey.toString(`base64`)
  };
};
