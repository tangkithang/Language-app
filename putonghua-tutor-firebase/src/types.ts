export interface WordToken {
    hanzi: string;
    pinyin: string;
}

export interface Sentence {
    id: string;
    original: string;
    tokens: WordToken[];
    translation?: string;
    speaker?: string;
}

export interface ScriptSection {
    speaker: string;
    sentences: Sentence[];
}

export interface AnalysisResult {
    title?: string;
    sections: ScriptSection[];
}

export interface PhonemeEvaluation {
    phoneme: string;
    accuracyScore: number;
    isCorrect: boolean;
}

export interface CharacterEvaluation {
    char: string;
    pinyin: string;
    accuracyScore: number;
}

export interface WordEvaluation {
    word: string;
    correct: boolean;
    errorType: 'tone' | 'pronunciation' | 'skipped' | 'insertion' | 'none';
    accuracyScore: number;
    phonemes: PhonemeEvaluation[];
    subWords?: CharacterEvaluation[];
    isPunctuation?: boolean;
}

export interface PronunciationResult {
    score: number;
    accuracyScore: number;
    fluencyScore: number;
    completenessScore: number;
    prosodyScore?: number;
    comment: string;
    languageDetected?: string;
    wordEvaluations: WordEvaluation[];
}

export const AppState = {
    SETUP: 0,
    ANALYZING: 1,
    READING: 2
} as const;

export type AppState = typeof AppState[keyof typeof AppState];
