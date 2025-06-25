(function () {

    // Setup Namespace
    window.MG = window.MG || {};
    window.MG.strings = window.MG.strings || {};
    const MG = window.MG;

    MG.strings.nft = {};

    function genStrings(items) {
    let result = [];
    for (let item of items) {
      result.push({ 't': item, 'w': 0 });
    }
    return result;
  }

  MG.strings.nft.strings_winning = genStrings(["TO THE MOON!",
    "WAGMI",
    "SEND IT",
    "GOING PARABOLIC",
    "JUST HIT ATH",
    "MINTED AND MOONED",
    "STRAIGHT VIBIN’",
    'LFG',
    'GREEN CANDLES ONLY',
    '10x INCOMING',
    'YOU SHOULD HAVE BOUGHT',
    'EARLY GANG ONLY',
    'BUY HIGHER, BRO',
    'BREAKING RESISTANCE',
    'ULTRA BULLISH',
    'FLIPPING BLUE CHIPS',
    'ALPHA DELIVERED',
    'INSANE ENTRY',
    'WHALE SIGNALS',
    'THE PROPHECY IS FULFILLED',
    'VISION REALIZED',
    'I HELD THE LINE',
    'FAITH REWARDED']);

  MG.strings.nft.strings_losing = genStrings(["IT’S OVER",
    "DEAD PROJECT",
    "WE GOT RUGGED",
    "ZERO INCOMING",
    "FLOOR’S A BLACK HOLE",
    "WHERE’S THE DEV?",
    "SELLING FOR TAXES",
    "DOWN BAD",
    "ALL HOPE LOST",
    "NEVER FINANCIAL ADVICE",
    "STILL EARLY",
    "TEMPORARY DIP",
    "JUST A HEALTHY CORRECTION",
    "BOUNCE SOON",
    "BUYING THE DIP AGAIN",
    "HOLDING STRON 💎✋",
    "I DIDN’T NEED THAT ETH ANYWAY",
    "LONG-TERM VISION",
    "TEAM’S STILL BUILDING",
    "V2 WILL FIX IT",
    "I DESERVE THIS",
    "SHOULD HAVE SOLD AT 2Ξ",
    "FLOOR IS HELL",
    "FROM BLUE CHIP TO BAG",
    "THE CHART IS A STAIRCASE TO HELL",
    "MY JPEG IS HAUNTED",
    "BUYER #2 OF 2",
    "HOLDING FOR SENTIMENTAL VALUE",
    "IT'S A SOCIAL EXPERIMENT",
    "I’M IN TOO DEEP"]);

  MG.strings.nft.strings_zero = genStrings(["GONE. JUST GONE.",
    "IT’S WORTH LESS THAN GAS.",
    "$0.00 — FINAL FORM",
    "VANISHED INTO THE BLOCKCHAIN.",
    "SHOULD’VE BOUGHT A BURRITO.",
    "CAN’T EVEN RUG — THERE’S NOTHING LEFT.",
    "IT’S A MEMORY NOW.",
    "DOWN TO DUST.",
    "ZERO'D OUT.",
    "THE FLOOR DISINTEGRATED.",
    "STILL EARLY... FOR WHAT THOUGH?",
    "HODL TIL ZERO — ACHIEVED.",
    "I HELD THE WHOLE WAY DOWN.",
    "AT LEAST I OWN THE JPEG.",
    "I PAID FOR THE LESSON.",
    "COINBASE SAID “WHO?”",
    "IT’S A COLLECTIBLE, NOT AN INVESTMENT.",
    "VALUE IS SUBJECTIVE, RIGHT?",
    "DIP TOO STEEP TO BUY.",
    "ASHES TO ASHES, JPEGS TO SMOKE.",
    "BURNED THROUGH EVERYTHING.",
    "VAPORIZED.",
    "ONLY SMOKE REMAINS.",
    "NO PHOENIX, JUST FIRE.",
    "WENT OUT IN A PUFF.",
    "A GLORIOUS FLAMEOUT."]);

  MG.strings.nft.strings_open = genStrings(["Just aped into something BIG.",
    "You’re gonna want to see this one.",
    "This one’s different. No joke.",
    "Don’t say I didn’t warn you.",
    "I’m early. You’re still on the sidelines.",
    "DYOR but this is it.",
    "Only a few will understand this move.",
    "Let’s just say I’m feeling bullish…",
    "WAGMI, bros. This token is the truth.",
    "Degens only: I found a gem 💎",
    "Got that feeling… the pre-moon tingles.",
    "This community? Vibes immaculate.",
    "No roadmap. No utility. Infinite potential.",
    "They laughed when I bought Doge too.",
    "If this rugs, I rug with it.",
    "Solid fundamentals. Active devs. Low market cap. I’m in.",
    "Tokenomics check out. Supply’s tight.",
    "Early-stage with serious upside.",
    "This solves real problems. Not just hype.",
    "Finally, a project that gets it.",
    "Strategic entry complete. Eyes on 10x.",
    "Mark this tweet.",
    "This one’s going to melt faces.",
    "Few understand what’s coming.",
    "You’ll wish you had followed me sooner.",
    "This is my retirement play.",
    "Fortune favors the bold."]);

  MG.strings.nft.strings_corp = genStrings(["This was never compliant.",
    "We’ve pivoted to AI.",
    "Write it off. Next quarter.",
    "Market conditions have changed.",
    "Your JPEG has been deprecated.",
    "This asset failed KYC.",
    "You didn’t meet ROI projections."]);

  MG.strings.nft.strings_degen = genStrings(["Should’ve flipped at 3Ξ, bro.",
    "Gas was more than the art.",
    "I was high when I minted this.",
    "WAGMI... except you.",
    "Bought top, sold bottom. Again.",
    "100x or zero — welp.",
    "Vibes weren’t strong enough."]);

  MG.strings.nft.strings_money = genStrings(["That’s an unreported capital loss.",
    "Audit complete.",
    "We noticed your activity on-chain.",
    "No receipts? No mercy.",
    "We value your honesty. Just kidding.",
    "You deducted what?",
    "See you in court, JPEG clown.",
    "You were the exit liquidity.",
    "Referral link expired.",
    "Next cycle, maybe.",
    "I never said when it moons.",
    "You read the whitepaper, right?",
    "Trust the process — or don’t.",
    "Ponzi? Nah, ecosystem.",
    "I lost my seed phrase...",
    "Wallet compromised!",
    "Private key’s in a landfill...",
    "I put it in LastPass...",
    "Wallet bricked.",
    "Signed the wrong transaction!",
    "Connected to a sketchy site...",
    "Someone airdropped me malware."]);

  MG.strings.nft.marker_good = [
    '✅',
    '📈',
    '🔺',
    '📊',
    '🧪',
    '✨',
    '🔮',
    '🛸',
    '💵',
    '💰',
    '⛓️',
    '🚀',
    '💎'
  ];

  MG.strings.nft.marker_bad = [
    '❌',
    '📉',
    '🔻',
    '⛓️',
    '📊'
  ];

  MG.strings.nft.marker_fail = [
    '😭',
    '🤡',
    '📦',
    '💀',
    '🔥'
  ];

}());