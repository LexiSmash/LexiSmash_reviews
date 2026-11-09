# Contributing

Thanks for wanting to help! Please read this first: this repository works differently from the other LexiSmash repositories.

## ❌ Reviews can't be added or changed here

`docs/reviews-chain.json` is written **only by the LexiSmash server**. Pull Requests that touch it will be closed without merging — accepting them would defeat the whole point of a tamper-evident log.

- To **leave a review**, play LexiSmash with an account and use the "Leave a review" button on the site.
- To **remove your own review**, delete it from your account on the site.

## ✅ What you can contribute

- **Bug reports about the chain**: if the [Verifier](https://lexismash.github.io/LexiSmash_reviews/) or `tools/verify-chain.mjs` reports a broken chain, please open an Issue with the `seq` number and the problem shown. This is exactly what the repository exists for.
- **Improvements to the verifier** (`docs/index.html`, `tools/verify-chain.mjs`) and to the documentation: open a Pull Request explaining what changes and why. Every proposal is reviewed by hand.
- **Translations** of the README or of the Verifier page.

## Reporting a review that breaks the rules

Insults, spam or personal data in a review should be reported from the site (or by email to <f.rombaldoni@campus.uniurb.it>), not here: review texts are not stored in this repository.

## Code of Conduct

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md) in every Issue and Pull Request.
