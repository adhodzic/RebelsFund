import RebelsFund from "@/contracts/RebelsFund.json";
const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545"
    }
  },
// The contracts to monitor
  contracts: [RebelsFund],
  events: {
    RebelsFund: ["SignatureAdded"]
  },
  polls: {
    // check accounts ever 15 seconds
    accounts: 1000
  }
};
export default options;