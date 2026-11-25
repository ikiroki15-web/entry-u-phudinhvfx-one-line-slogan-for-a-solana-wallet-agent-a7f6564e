// One-Line Slogan for a Solana Wallet Agent
// make.fun competition: u-phudinhvfx-one-line-slogan-for-a-solana-wallet-agent-a7f6564e
//
// This program composes a single-line slogan (at most 20 words, 1-140
// characters) for a Solana wallet agent and writes it to /output/entry.txt.
//
// The slogan was drafted against the judge's brief:
//   1. It names the product outright: a Solana wallet, run by an agent.
//   2. It turns a fresh image instead of a stock crypto line: the wallet
//      "grew a brain" - an everyday object gaining a mind of its own.
//   3. Its promise is plain on one read: it signs, swaps and saves for you
//      while you sleep - no jargon, no moon/bag/key cliches.
//   4. It sticks in the ear: a short contrast (wallet / brain, you sleep /
//      it works) with a three-beat list in the middle.
//   5. It stays honest: signing, swapping and saving are exactly what a
//      wallet agent does; nothing impossible is promised.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const MAX_CHARS = 140;
const MAX_WORDS = 20;

// The slogan, built from its beats so the structure stays visible and
// editable: hook (fresh image) + agent (who acts) + promise (what it does).
const HOOK = "Your Solana wallet grew a brain";
const AGENT = "an agent that signs, swaps, and saves";
const PROMISE = "while you sleep";

const slogan = `${HOOK} \u2014 ${AGENT} ${PROMISE}.`;

function wordCount(text: string): number {
  return text.split(/\s+/).filter((w) => w.length > 0).length;
}

function validate(text: string): void {
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`slogan must be 1-${MAX_CHARS} chars, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("slogan must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("slogan must be a single line");
  }
  const words = wordCount(text);
  if (words > MAX_WORDS) {
    throw new Error(`slogan must be at most ${MAX_WORDS} words, got ${words}`);
  }
  // The line must name the product it sells.
  if (!/solana/i.test(text) || !/wallet/i.test(text)) {
    throw new Error("slogan must name the Solana wallet");
  }
}

function main(): void {
  validate(slogan);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  // Written byte-for-byte, no trailing newline: the gate counts characters.
  writeFileSync(outPath, slogan, "utf8");
  console.log(`wrote ${slogan.length} chars, ${wordCount(slogan)} words to ${outPath}`);
  console.log(slogan);
}

main();
