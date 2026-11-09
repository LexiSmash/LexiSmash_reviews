# ⭐ LexiSmash Reviews — public fingerprint chain 🔗

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/LexiSmash/LexiSmash_reviews) [![License](https://img.shields.io/badge/license-CC0%201.0-blue.svg?style=plastic)](LICENSE)

The tamper-evident log behind the public player reviews of [**LexiSmash**](https://lexismash.it), a multiplayer word party game. Every review left on the site gets a cryptographic **fingerprint**, and every fingerprint is chained to the previous one. This repository keeps a public copy of that chain, so **anyone can check that no review has been edited after it was written — not even by the site owner**. 🛡️

## [👉 Click here to open the Verifier! 👈](https://lexismash.github.io/LexiSmash_reviews/)

---

## 🚀 What's in here

- **`docs/reviews-chain.json`**: the chain itself — one entry per review, in order. It is written **automatically by the LexiSmash server** a few seconds after every new review, deletion or moderation, never by hand.
- **`docs/index.html`**: a zero-dependency browser page that re-computes the whole chain and tells you whether it is intact.
- **`tools/verify-chain.mjs`**: the same check from the command line (Node.js 18+, no packages).

**No review text and no account data ever lands here.** Each entry only holds the rating, the date, an anonymous author reference and the fingerprints. The texts live on the site; this repository proves they haven't changed.

## 🛠️ How it works

For every review, the server computes:

```
contentHash = sha256( JSON.stringify({ rating, text, lang }) )
hash        = sha256( prevHash | seq | id | createdAt | authorRef | rating | contentHash )
```

- `prevHash` is the `hash` of the previous review (the first one starts from `0000…0000`, 64 zeros).
- `authorRef` is an anonymous, stable reference to the author (a truncated hash), never the real account id.
- Changing a single character of a review changes its `contentHash`, which changes its `hash`, which breaks every entry after it.

On top of that, **this file lives in Git**: its full history is public. If an old entry were ever rewritten, the commit that did it would be visible to everyone.

## ✅ How to verify

### In the browser

Open the [Verifier](https://lexismash.github.io/LexiSmash_reviews/): it downloads `reviews-chain.json`, re-computes every fingerprint with your browser's own crypto engine and shows the result. You can also paste the rating, text and language of a review you see on the site to check that its `contentHash` matches the chain.

### From the command line

```
node tools/verify-chain.mjs docs/reviews-chain.json
```

### Against the live site

The site exposes the same chain at `https://<server>/api/reviews/chain` and every review (with its `contentHash`) at `/api/reviews`. Compare them with this repository's file and its history.

## 🧹 What the owner *can* and *cannot* do

| Action | Possible? | Visible to everyone? |
|---|---|---|
| Edit the text or the rating of a review | ❌ No — there is no function for it | It would break the chain |
| Hide a review that breaks the rules (insults, spam, personal data) | ✅ Yes, **with a mandatory reason** | ✅ The review stays listed as "hidden by the moderator: reason" and its status changes here |
| Reply publicly to a review | ✅ Yes | ✅ Shown under the review, with its edit date |
| The author deletes their own review | ✅ Yes (right to erasure) | ✅ The text disappears, the fingerprint and the `deleted_by_author` status stay |

## 📋 Who can leave a review

Only players with a real LexiSmash account who have completed at least one match, one active review per account. Every player is invited the same way: reviews are never requested only from happy players.

## 📄 License

Everything here — the chain file, the verifier and this documentation — is released into the public domain under [CC0 1.0 Universal](LICENSE). The review **texts** are not in this repository: they belong to their authors and are published on [lexismash.it](https://lexismash.it).

<a href="https://github.com/R0mb0/Crafted_with_AI">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://github.com/R0mb0/Crafted_with_AI/blob/main/Badge/SVG/CraftedWithAIDark.svg">
<source media="(prefers-color-scheme: light)" srcset="https://github.com/R0mb0/Crafted_with_AI/blob/main/Badge/SVG/NotMadeByAILight.svg">
<img alt="Crafted with AI" src="https://github.com/R0mb0/Crafted_with_AI/blob/main/Badge/SVG/CraftedWithAIDefault.svg">
</picture>
</a>
