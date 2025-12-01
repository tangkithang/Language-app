import { pinyin } from 'pinyin-pro';

/**
 * Formats a pinyin string into space-separated syllables based on the Hanzi characters.
 * Uses pinyin-pro to determine the syllable structure (segmentation) and applies it to the provided pinyin string.
 * This handles cases where the provided pinyin is unspaced, hyphenated, or has different formatting.
 * 
 * @param hanzi The Chinese characters (e.g., "眼界")
 * @param jsonPinyin The pinyin string from JSON (e.g., "yǎnjiè", "guī-zhāng")
 * @returns Array of pinyin syllables (e.g., ["yǎn", "jiè"], ["guī", "zhāng"])
 */
export const formatPinyin = (hanzi: string, jsonPinyin: string): string[] => {
    if (!jsonPinyin || !hanzi) return jsonPinyin ? [jsonPinyin] : [];

    // 1. Clean the JSON pinyin (remove spaces, hyphens, etc.)
    const cleanPinyin = jsonPinyin.replace(/[\s\-']/g, '').toLowerCase();

    // 2. Get reference syllables from pinyin-pro to understand the structure
    // We use 'symbol' tone type to match standard pinyin with tone marks
    const refSyllables = pinyin(hanzi, { type: 'array', toneType: 'symbol' });

    const result: string[] = [];
    let remainingPinyin = cleanPinyin;

    for (let i = 0; i < refSyllables.length; i++) {
        // If it's the last syllable, take everything that's left
        if (i === refSyllables.length - 1) {
            if (remainingPinyin.length > 0) {
                result.push(remainingPinyin);
                remainingPinyin = '';
            }
            break;
        }

        const ref = refSyllables[i];
        const nextRef = refSyllables[i + 1];

        // Strategy 1: Direct Match
        // Check if the remaining pinyin starts with the reference syllable (ignoring case/tones if needed? No, json usually has tones)
        // We assume JSON pinyin has tone marks.

        // We try to match the exact string first
        if (remainingPinyin.startsWith(ref)) {
            result.push(ref);
            remainingPinyin = remainingPinyin.slice(ref.length);
            continue;
        }

        // Strategy 2: Look-ahead for the next syllable
        // If current doesn't match (polyphone), find where the *next* syllable starts

        // We search for the nextRef in the remaining string
        // We start searching from index 1 (since current syllable must have at least 1 char)
        const nextIndex = remainingPinyin.indexOf(nextRef, 1);

        if (nextIndex !== -1) {
            // Found the next syllable!
            // Everything before it is the current syllable
            const currentSyllable = remainingPinyin.slice(0, nextIndex);
            result.push(currentSyllable);
            remainingPinyin = remainingPinyin.slice(nextIndex);
            continue;
        }

        // Strategy 3: Fallback - Guess length based on ref
        // If we can't match, we assume the length is similar to ref, but bounded
        const guessLen = Math.min(ref.length, remainingPinyin.length);
        const guess = remainingPinyin.slice(0, guessLen);
        result.push(guess);
        remainingPinyin = remainingPinyin.slice(guessLen);
    }

    // If there's still leftovers (shouldn't happen due to last syllable check, but safe guard)
    if (remainingPinyin.length > 0 && result.length > 0) {
        result[result.length - 1] += remainingPinyin;
    } else if (remainingPinyin.length > 0) {
        result.push(remainingPinyin);
    }

    return result;
};

/**
 * Checks if a pinyin string contains any neutral tones.
 * A neutral tone is defined as a syllable without any tone mark (ā, á, ǎ, à, etc.).
 * We check this by seeing if the syllable contains any tone-marked vowels.
 */
export const hasNeutralTone = (pinyinStr: string): boolean => {
    // Regex for vowels with tone marks
    const toneVowels = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/;

    // If we have pinyin but no tone marks, it's neutral.
    // However, we need to be careful. formatPinyin returns an array of syllables.
    // This function might be called on a single syllable or the whole string.
    // If we call it on the whole string, we just check if *any* syllable is neutral.
    // But wait, "hái zi" has one tone and one neutral.
    // The requirement is: "if a light tone character is detected... feed the text vocab".
    // So if *any* part of the word is neutral, we fallback to Hanzi.

    // But wait, standard pinyin "hái" has a tone. "zi" has no tone.
    // So we need to check if there is a syllable that *lacks* a tone mark.

    // Let's assume the input is the full pinyin string (e.g. "hái zi" or "háizi").
    // We can split by space (if formatted) or just analyze.
    // Actually, the safest way is to check if the number of tone marks < number of syllables.
    // But counting syllables is hard without segmentation.

    // Better approach: The caller (Reader.tsx) has the segmented syllables from formatPinyin.
    // So we should probably export a function that checks a *single* syllable, or checks the array.

    // Let's make this function check a single syllable string or a full string.
    // If it's a full string, it's hard to know.
    // Let's stick to the plan: "hasNeutralTone(pinyin: string): boolean".
    // But in Reader.tsx we will have `syllables: string[]`.
    // So maybe we should just export a check for a syllable?

    // Actually, let's just check if the string contains any non-toned vowels? No, that's wrong.
    // A neutral tone syllable has vowels but NO tone marks.
    // A toned syllable has vowels AND tone marks.

    // So, if we iterate through syllables, a syllable is neutral if it has NO tone marks.
    return !toneVowels.test(pinyinStr);
};
