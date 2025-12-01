import type { Sentence } from '../types';

export const groupSentencesIntoPages = (sentences: Sentence[], maxCharsPerPage: number = 60): Sentence[][] => {
    const pages: Sentence[][] = [];
    let currentPage: Sentence[] = [];
    let currentChars = 0;

    for (const sentence of sentences) {
        // Calculate sentence length (sum of token hanzi lengths)
        const sentenceLength = sentence.tokens.reduce((sum, token) => sum + token.hanzi.length, 0);

        // If adding this sentence exceeds the limit and the current page is not empty,
        // push the current page and start a new one.
        // (If the sentence itself is longer than the limit, it will just be on its own page or overflow, which is fine)
        if (currentChars + sentenceLength > maxCharsPerPage && currentPage.length > 0) {
            pages.push(currentPage);
            currentPage = [];
            currentChars = 0;
        }

        currentPage.push(sentence);
        currentChars += sentenceLength;
    }

    if (currentPage.length > 0) {
        pages.push(currentPage);
    }

    return pages;
};
