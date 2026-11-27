import { issueToken, consumeToken } from "./token-service.js";

const tokenId = await issueToken(
    { userId: 42, purpose: "password-reset" },
    60
);

console.log("issued token:", tokenId);

// Run 5 consumers simultaneously
const results = await Promise.all([
    consumeToken(tokenId),
    consumeToken(tokenId),
    consumeToken(tokenId),
    consumeToken(tokenId),
    consumeToken(tokenId)
]);

// Count successful consumers
const winners = results.filter(result => result.ok).length;

console.log("winners:", winners);

// Exactly one consumer must succeed
console.assert(
    winners === 1,
    "SINGLE-USE VIOLATED!"
);

if (winners !== 1) {
    process.exitCode = 1;
} else {
    console.log("PASS: token was single-use.");
}