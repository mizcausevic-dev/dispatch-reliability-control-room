import { payload, summary } from "../src/services/dispatchReliabilityService";

console.log("dispatch-reliability-control-room demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().rules, null, 2));
