import { pinyin } from 'pinyin-pro';
import fs from 'fs';
import path from 'path';

// Helper to create token
const createToken = (word, overridePinyin = null) => {
    const py = overridePinyin || pinyin(word);
    return { hanzi: word, pinyin: py };
};

// Helper to create sentence (single word for vocab)
const createItem = (word, overridePinyin = null) => {
    // Add a comma to the original text to create a pause in TTS
    // We add it as a separate token so the highlighter stays in sync
    return {
        id: Math.random().toString(36).substr(2, 9),
        original: word + "，",
        tokens: [
            createToken(word, overridePinyin),
            { hanzi: "，", pinyin: "" } // Silent punctuation token
        ]
    };
};

const generateData = () => {
    try {
        const jsonPath = path.join(process.cwd(), 'full_textbook_vocabulary.json');
        const fileData = fs.readFileSync(jsonPath, 'utf8');
        const VOCAB_STRUCTURE = JSON.parse(fileData);

        const courses = VOCAB_STRUCTURE.map((part, partIdx) => {
            return {
                id: `part-${partIdx + 1}`,
                title: part.title,
                chapters: part.units.map((unit, unitIdx) => {
                    const sentences = unit.items.map(item => {
                        if (typeof item === 'string') {
                            return createItem(item);
                        } else {
                            return createItem(item.word, item.pinyin);
                        }
                    });

                    // Create one chapter per unit containing all sentences
                    return [{
                        id: `unit-${partIdx + 1}-${unitIdx + 1}`,
                        title: unit.title,
                        content: {
                            title: unit.title,
                            sections: [
                                {
                                    speaker: "Vocabulary Practice",
                                    sentences: sentences
                                }
                            ]
                        }
                    }];
                }).flat()
            };
        });

        const fileContent = `import type { AnalysisResult } from '../types';

export interface Chapter {
    id: string;
    title: string;
    content: AnalysisResult;
}

export interface CoursePart {
    id: string;
    title: string;
    chapters: Chapter[];
}

export const VOCAB_COURSE: CoursePart[] = ${JSON.stringify(courses, null, 4)};
`;

        fs.writeFileSync('src/data/vocabularyData.ts', fileContent);
        console.log('Vocabulary data generated successfully from full_textbook_vocabulary.json!');
    } catch (error) {
        console.error('Error generating vocabulary data:', error);
    }
};

generateData();
