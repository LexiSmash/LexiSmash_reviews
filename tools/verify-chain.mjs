// Verifies the LexiSmash reviews fingerprint chain.
// Usage: node tools/verify-chain.mjs [path/to/reviews-chain.json]
// No dependencies (Node.js 18+).
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const file = process.argv[2] || 'docs/reviews-chain.json';
const data = JSON.parse(readFileSync(file, 'utf8'));
const sha256 = (s) => createHash('sha256').update(String(s), 'utf8').digest('hex');
const entryHash = (e) => sha256([e.prevHash, e.seq, e.id, e.createdAt, e.authorRef, e.rating, e.contentHash].join('|'));

const chain = Array.isArray(data.chain) ? data.chain : [];
let prev = data.genesis || '0'.repeat(64);
const problems = [];
chain.forEach((e, i) => {
    if (e.seq !== i + 1) problems.push(`seq ${e.seq}: expected ${i + 1}`);
    if (e.prevHash !== prev) problems.push(`seq ${e.seq}: prevHash does not match the previous entry`);
    if (entryHash(e) !== e.hash) problems.push(`seq ${e.seq}: hash does not match its content`);
    prev = e.hash;
});
if (chain.length && data.head && data.head.hash !== prev) problems.push('head does not match the last entry');

if (problems.length) {
    console.error(`❌ Chain BROKEN (${chain.length} entries):`);
    problems.forEach((p) => console.error('  - ' + p));
    process.exit(1);
}
console.log(`✅ Chain intact: ${chain.length} entries, head ${String(prev).slice(0, 16)}…`);
