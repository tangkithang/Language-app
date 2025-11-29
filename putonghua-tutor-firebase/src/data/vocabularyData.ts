import type { AnalysisResult } from '../types';

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

export const VOCAB_COURSE: CoursePart[] = [
    {
        "id": "part-1",
        "title": "Part 1: Pronunciation Focus (語音針對性練習)",
        "chapters": [
            {
                "id": "unit-1-1-1",
                "title": "1. Front/Back Nasal & Tones (前後鼻音與聲調) (Part 1)",
                "content": {
                    "title": "1. Front/Back Nasal & Tones (前後鼻音與聲調) (1)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "ljo0i9mxw",
                                    "original": "適應，",
                                    "tokens": [
                                        {
                                            "hanzi": "適應",
                                            "pinyin": "shì yīng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "4821c0ptb",
                                    "original": "行程，",
                                    "tokens": [
                                        {
                                            "hanzi": "行程",
                                            "pinyin": "xíng chéng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "6wmere2th",
                                    "original": "平常，",
                                    "tokens": [
                                        {
                                            "hanzi": "平常",
                                            "pinyin": "píng cháng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "xnw0eikol",
                                    "original": "晚上，",
                                    "tokens": [
                                        {
                                            "hanzi": "晚上",
                                            "pinyin": "wǎn shàng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "jvbyvx9xo",
                                    "original": "上網，",
                                    "tokens": [
                                        {
                                            "hanzi": "上網",
                                            "pinyin": "shàng wǎng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "q799cs2gd",
                                    "original": "環境，",
                                    "tokens": [
                                        {
                                            "hanzi": "環境",
                                            "pinyin": "huán jìng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "e4lv3zsp1",
                                    "original": "成本，",
                                    "tokens": [
                                        {
                                            "hanzi": "成本",
                                            "pinyin": "chéng běn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "yyxf1hj90",
                                    "original": "一定，",
                                    "tokens": [
                                        {
                                            "hanzi": "一定",
                                            "pinyin": "yí dìng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "8dm005h3m",
                                    "original": "當然，",
                                    "tokens": [
                                        {
                                            "hanzi": "當然",
                                            "pinyin": "dāng rán"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "fqgzk9ra3",
                                    "original": "研究生，",
                                    "tokens": [
                                        {
                                            "hanzi": "研究生",
                                            "pinyin": "yán jiū shēng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-1-2",
                "title": "1. Front/Back Nasal & Tones (前後鼻音與聲調) (Part 2)",
                "content": {
                    "title": "1. Front/Back Nasal & Tones (前後鼻音與聲調) (2)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "2tob9slop",
                                    "original": "研究，",
                                    "tokens": [
                                        {
                                            "hanzi": "研究",
                                            "pinyin": "yán jiū"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "hr734x3vk",
                                    "original": "畢業，",
                                    "tokens": [
                                        {
                                            "hanzi": "畢業",
                                            "pinyin": "bì yè"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "jcokc6i21",
                                    "original": "金錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "金錢",
                                            "pinyin": "jīn qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "rlmwgsl9e",
                                    "original": "攢錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "攢錢",
                                            "pinyin": "zǎn qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "y9ahooq9z",
                                    "original": "省錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "省錢",
                                            "pinyin": "shěng qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "g3l2nfgnx",
                                    "original": "賺錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "賺錢",
                                            "pinyin": "zhuàn qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "vubvp8dxp",
                                    "original": "掙錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "掙錢",
                                            "pinyin": "zhēng qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "t5y1t6218",
                                    "original": "有錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "有錢",
                                            "pinyin": "yǒu qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "sgo4dbn3h",
                                    "original": "要錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "要錢",
                                            "pinyin": "yào qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "vvptfjl7g",
                                    "original": "花錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "花錢",
                                            "pinyin": "huā qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-1-3",
                "title": "1. Front/Back Nasal & Tones (前後鼻音與聲調) (Part 3)",
                "content": {
                    "title": "1. Front/Back Nasal & Tones (前後鼻音與聲調) (3)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "ttu7gic65",
                                    "original": "促銷，",
                                    "tokens": [
                                        {
                                            "hanzi": "促銷",
                                            "pinyin": "cù xiāo"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "5weip7stb",
                                    "original": "教室，",
                                    "tokens": [
                                        {
                                            "hanzi": "教室",
                                            "pinyin": "jiào shì"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "m8j6u8g6r",
                                    "original": "教小朋友，",
                                    "tokens": [
                                        {
                                            "hanzi": "教小朋友",
                                            "pinyin": "jiào xiǎo péng yǒu"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "igsx03mxi",
                                    "original": "教育，",
                                    "tokens": [
                                        {
                                            "hanzi": "教育",
                                            "pinyin": "jiào yù"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-2-1",
                "title": "2. Initials (聲母辨析) (Part 1)",
                "content": {
                    "title": "2. Initials (聲母辨析) (1)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "u9lhgalhj",
                                    "original": "想像，",
                                    "tokens": [
                                        {
                                            "hanzi": "想像",
                                            "pinyin": "xiǎng xiàng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "l5mynqh64",
                                    "original": "利息，",
                                    "tokens": [
                                        {
                                            "hanzi": "利息",
                                            "pinyin": "lì xī"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "35rlypzfc",
                                    "original": "時薪，",
                                    "tokens": [
                                        {
                                            "hanzi": "時薪",
                                            "pinyin": "shí xīn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "5qo20w1pt",
                                    "original": "性格，",
                                    "tokens": [
                                        {
                                            "hanzi": "性格",
                                            "pinyin": "xìng gé"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "5k75utk6r",
                                    "original": "介紹，",
                                    "tokens": [
                                        {
                                            "hanzi": "介紹",
                                            "pinyin": "jiè shào"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "k6n2uows7",
                                    "original": "燒烤，",
                                    "tokens": [
                                        {
                                            "hanzi": "燒烤",
                                            "pinyin": "shāo kǎo"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "szw0ynzeu",
                                    "original": "大廈，",
                                    "tokens": [
                                        {
                                            "hanzi": "大廈",
                                            "pinyin": "dà shà"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "9su8rccxj",
                                    "original": "不少，",
                                    "tokens": [
                                        {
                                            "hanzi": "不少",
                                            "pinyin": "bù shǎo"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "xojlhlaki",
                                    "original": "不小，",
                                    "tokens": [
                                        {
                                            "hanzi": "不小",
                                            "pinyin": "bù xiǎo"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "fah4ln4z1",
                                    "original": "上來，",
                                    "tokens": [
                                        {
                                            "hanzi": "上來",
                                            "pinyin": "shàng lái"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-2-2",
                "title": "2. Initials (聲母辨析) (Part 2)",
                "content": {
                    "title": "2. Initials (聲母辨析) (2)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "he7ly0w6q",
                                    "original": "下來，",
                                    "tokens": [
                                        {
                                            "hanzi": "下來",
                                            "pinyin": "xià lái"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "xfr7cya1d",
                                    "original": "消費，",
                                    "tokens": [
                                        {
                                            "hanzi": "消費",
                                            "pinyin": "xiāo fèi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "gh0qt9dgj",
                                    "original": "花費，",
                                    "tokens": [
                                        {
                                            "hanzi": "花費",
                                            "pinyin": "huā fèi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "n15r93nq0",
                                    "original": "吃飯，",
                                    "tokens": [
                                        {
                                            "hanzi": "吃飯",
                                            "pinyin": "chī fàn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "ei4zrhyxe",
                                    "original": "況且，",
                                    "tokens": [
                                        {
                                            "hanzi": "況且",
                                            "pinyin": "kuàng qiě"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "rhlwy0vx0",
                                    "original": "有空兒，",
                                    "tokens": [
                                        {
                                            "hanzi": "有空兒",
                                            "pinyin": "yǒu kōng ér"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "gxv7tyh0s",
                                    "original": "速食，",
                                    "tokens": [
                                        {
                                            "hanzi": "速食",
                                            "pinyin": "sù shí"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "qppsz2jyh",
                                    "original": "壞餐，",
                                    "tokens": [
                                        {
                                            "hanzi": "壞餐",
                                            "pinyin": "huài cān"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "q8vlnjp97",
                                    "original": "為了，",
                                    "tokens": [
                                        {
                                            "hanzi": "為了",
                                            "pinyin": "wéi le"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "txx9zxhci",
                                    "original": "位於，",
                                    "tokens": [
                                        {
                                            "hanzi": "位於",
                                            "pinyin": "wèi wū"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-2-3",
                "title": "2. Initials (聲母辨析) (Part 3)",
                "content": {
                    "title": "2. Initials (聲母辨析) (3)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "1lpwg68gw",
                                    "original": "惠，",
                                    "tokens": [
                                        {
                                            "hanzi": "惠",
                                            "pinyin": "huì"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-3-1",
                "title": "3. Finals (韻母辨析) ",
                "content": {
                    "title": "3. Finals (韻母辨析) ",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "zugtc6n63",
                                    "original": "賺錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "賺錢",
                                            "pinyin": "zhuàn qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "k9e2nfgxq",
                                    "original": "撞錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "撞錢",
                                            "pinyin": "zhuàng qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "vml07l9dt",
                                    "original": "都市，",
                                    "tokens": [
                                        {
                                            "hanzi": "都市",
                                            "pinyin": "dū shì"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "bxcb7jqgf",
                                    "original": "要，",
                                    "tokens": [
                                        {
                                            "hanzi": "要",
                                            "pinyin": "yào"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "wxbjhnclg",
                                    "original": "有，",
                                    "tokens": [
                                        {
                                            "hanzi": "有",
                                            "pinyin": "yǒu"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "pu7t4qrz5",
                                    "original": "肉，",
                                    "tokens": [
                                        {
                                            "hanzi": "肉",
                                            "pinyin": "ròu"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "2htgy73rt",
                                    "original": "樓，",
                                    "tokens": [
                                        {
                                            "hanzi": "樓",
                                            "pinyin": "lóu"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-4-1",
                "title": "4. Neutral Tone (輕聲詞) (Part 1)",
                "content": {
                    "title": "4. Neutral Tone (輕聲詞) (1)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "6d9fmlhbq",
                                    "original": "清楚，",
                                    "tokens": [
                                        {
                                            "hanzi": "清楚",
                                            "pinyin": "qīng chu"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "t2arztbll",
                                    "original": "先生，",
                                    "tokens": [
                                        {
                                            "hanzi": "先生",
                                            "pinyin": "xiān sheng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "u2ncs3x2j",
                                    "original": "東西，",
                                    "tokens": [
                                        {
                                            "hanzi": "東西",
                                            "pinyin": "dōng xi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "1yp55qoms",
                                    "original": "關係，",
                                    "tokens": [
                                        {
                                            "hanzi": "關係",
                                            "pinyin": "guān xi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "wu293ch2a",
                                    "original": "生意，",
                                    "tokens": [
                                        {
                                            "hanzi": "生意",
                                            "pinyin": "shēng yi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "3v5utg40u",
                                    "original": "衣服，",
                                    "tokens": [
                                        {
                                            "hanzi": "衣服",
                                            "pinyin": "yī fu"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "m4elm5tq7",
                                    "original": "商量，",
                                    "tokens": [
                                        {
                                            "hanzi": "商量",
                                            "pinyin": "shāng liang"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "qdh8j0n46",
                                    "original": "知識，",
                                    "tokens": [
                                        {
                                            "hanzi": "知識",
                                            "pinyin": "zhī shi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "4d90wi9j0",
                                    "original": "什麼，",
                                    "tokens": [
                                        {
                                            "hanzi": "什麼",
                                            "pinyin": "shén me"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "tw9o3lj3j",
                                    "original": "麻煩，",
                                    "tokens": [
                                        {
                                            "hanzi": "麻煩",
                                            "pinyin": "má fan"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-4-2",
                "title": "4. Neutral Tone (輕聲詞) (Part 2)",
                "content": {
                    "title": "4. Neutral Tone (輕聲詞) (2)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "1885ssnxj",
                                    "original": "名字，",
                                    "tokens": [
                                        {
                                            "hanzi": "名字",
                                            "pinyin": "míng zi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "qzpcg18a3",
                                    "original": "孩子，",
                                    "tokens": [
                                        {
                                            "hanzi": "孩子",
                                            "pinyin": "hái zi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "vmq6dbec4",
                                    "original": "朋友，",
                                    "tokens": [
                                        {
                                            "hanzi": "朋友",
                                            "pinyin": "péng you"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "8u5teomkp",
                                    "original": "便宜，",
                                    "tokens": [
                                        {
                                            "hanzi": "便宜",
                                            "pinyin": "pián yi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "uixjcf8t2",
                                    "original": "除了，",
                                    "tokens": [
                                        {
                                            "hanzi": "除了",
                                            "pinyin": "chú le"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "qgvmirph9",
                                    "original": "時候，",
                                    "tokens": [
                                        {
                                            "hanzi": "時候",
                                            "pinyin": "shí hou"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "gu2v4z632",
                                    "original": "謝謝，",
                                    "tokens": [
                                        {
                                            "hanzi": "謝謝",
                                            "pinyin": "xiè xie"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "aycq54yd3",
                                    "original": "告訴，",
                                    "tokens": [
                                        {
                                            "hanzi": "告訴",
                                            "pinyin": "gào su"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "lmd3vummh",
                                    "original": "愛人，",
                                    "tokens": [
                                        {
                                            "hanzi": "愛人",
                                            "pinyin": "ài ren"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "chl6aaja4",
                                    "original": "太太，",
                                    "tokens": [
                                        {
                                            "hanzi": "太太",
                                            "pinyin": "tài tai"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-4-3",
                "title": "4. Neutral Tone (輕聲詞) (Part 3)",
                "content": {
                    "title": "4. Neutral Tone (輕聲詞) (3)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "yvjcarklb",
                                    "original": "客氣，",
                                    "tokens": [
                                        {
                                            "hanzi": "客氣",
                                            "pinyin": "kè qi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "q9ldf68o1",
                                    "original": "地方，",
                                    "tokens": [
                                        {
                                            "hanzi": "地方",
                                            "pinyin": "dì fang"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "ljbww80hg",
                                    "original": "漂亮，",
                                    "tokens": [
                                        {
                                            "hanzi": "漂亮",
                                            "pinyin": "piào liang"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "8dmxbvzvk",
                                    "original": "意思，",
                                    "tokens": [
                                        {
                                            "hanzi": "意思",
                                            "pinyin": "yì si"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "wcfu5cjve",
                                    "original": "喜歡，",
                                    "tokens": [
                                        {
                                            "hanzi": "喜歡",
                                            "pinyin": "xǐ huan"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "281h5uos0",
                                    "original": "怎麼，",
                                    "tokens": [
                                        {
                                            "hanzi": "怎麼",
                                            "pinyin": "zěn me"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "rg3qz1ilu",
                                    "original": "打算，",
                                    "tokens": [
                                        {
                                            "hanzi": "打算",
                                            "pinyin": "dǎ suan"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "n4j1m2gjh",
                                    "original": "打聽，",
                                    "tokens": [
                                        {
                                            "hanzi": "打聽",
                                            "pinyin": "dǎ ting"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "4hkko1oga",
                                    "original": "我們，",
                                    "tokens": [
                                        {
                                            "hanzi": "我們",
                                            "pinyin": "wǒ men"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "6dw75ssyu",
                                    "original": "你們，",
                                    "tokens": [
                                        {
                                            "hanzi": "你們",
                                            "pinyin": "nǐ men"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-1-4-4",
                "title": "4. Neutral Tone (輕聲詞) (Part 4)",
                "content": {
                    "title": "4. Neutral Tone (輕聲詞) (4)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "ctpql1fds",
                                    "original": "他們，",
                                    "tokens": [
                                        {
                                            "hanzi": "他們",
                                            "pinyin": "tā men"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "q1asn1dmz",
                                    "original": "人們，",
                                    "tokens": [
                                        {
                                            "hanzi": "人們",
                                            "pinyin": "rén men"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    },
    {
        "id": "part-2",
        "title": "Part 2: Common Mistakes & Polyphones (易錯詞與多音字)",
        "chapters": [
            {
                "id": "unit-2-1-1",
                "title": "1. Polyphones (重點多音字) (Part 1)",
                "content": {
                    "title": "1. Polyphones (重點多音字) (1)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "u7u1cya5y",
                                    "original": "處理，",
                                    "tokens": [
                                        {
                                            "hanzi": "處理",
                                            "pinyin": "chǔ lǐ"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "t27hlj4cc",
                                    "original": "因為，",
                                    "tokens": [
                                        {
                                            "hanzi": "因為",
                                            "pinyin": "yīn wèi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "015dp6ahe",
                                    "original": "空餘，",
                                    "tokens": [
                                        {
                                            "hanzi": "空餘",
                                            "pinyin": "kòng yú"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "jwjjudkb9",
                                    "original": "幾場，",
                                    "tokens": [
                                        {
                                            "hanzi": "幾場",
                                            "pinyin": "jǐ chǎng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "jg8rz08uq",
                                    "original": "即使，",
                                    "tokens": [
                                        {
                                            "hanzi": "即使",
                                            "pinyin": "jí shǐ"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "smmw2htsc",
                                    "original": "什麼，",
                                    "tokens": [
                                        {
                                            "hanzi": "什麼",
                                            "pinyin": "shén me"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "682gm20re",
                                    "original": "晚上，",
                                    "tokens": [
                                        {
                                            "hanzi": "晚上",
                                            "pinyin": "wǎn shang"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "u5bkomlyd",
                                    "original": "這麼，",
                                    "tokens": [
                                        {
                                            "hanzi": "這麼",
                                            "pinyin": "zhè me"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "s8nzxhm3c",
                                    "original": "朋友，",
                                    "tokens": [
                                        {
                                            "hanzi": "朋友",
                                            "pinyin": "péng you"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "j95g46wo1",
                                    "original": "氣氛，",
                                    "tokens": [
                                        {
                                            "hanzi": "氣氛",
                                            "pinyin": "qì fēn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-2-1-2",
                "title": "1. Polyphones (重點多音字) (Part 2)",
                "content": {
                    "title": "1. Polyphones (重點多音字) (2)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "ic8t90hh8",
                                    "original": "滂沱，",
                                    "tokens": [
                                        {
                                            "hanzi": "滂沱",
                                            "pinyin": "pāng tuó"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "qqpi5qmex",
                                    "original": "負債累累，",
                                    "tokens": [
                                        {
                                            "hanzi": "負債累累",
                                            "pinyin": "fù zhài lěi lěi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "fcb26q023",
                                    "original": "碩果累累，",
                                    "tokens": [
                                        {
                                            "hanzi": "碩果累累",
                                            "pinyin": "shuò guǒ léi léi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "xequ4wgq1",
                                    "original": "複雜，",
                                    "tokens": [
                                        {
                                            "hanzi": "複雜",
                                            "pinyin": "fù zá"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "oje040end",
                                    "original": "影片，",
                                    "tokens": [
                                        {
                                            "hanzi": "影片",
                                            "pinyin": "yǐng piàn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "2443483gq",
                                    "original": "影片兒，",
                                    "tokens": [
                                        {
                                            "hanzi": "影片兒",
                                            "pinyin": "yǐng piānr"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "qzjv62s9x",
                                    "original": "血壓，",
                                    "tokens": [
                                        {
                                            "hanzi": "血壓",
                                            "pinyin": "xuè yā"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "9hiyt5ipk",
                                    "original": "鮮血，",
                                    "tokens": [
                                        {
                                            "hanzi": "鮮血",
                                            "pinyin": "xiān xuè"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "i72z91x5m",
                                    "original": "血液，",
                                    "tokens": [
                                        {
                                            "hanzi": "血液",
                                            "pinyin": "xuè yè"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "ynk31584u",
                                    "original": "一針見血，",
                                    "tokens": [
                                        {
                                            "hanzi": "一針見血",
                                            "pinyin": "yì zhēn jiàn xiě"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-2-1-3",
                "title": "1. Polyphones (重點多音字) (Part 3)",
                "content": {
                    "title": "1. Polyphones (重點多音字) (3)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "000fpl35j",
                                    "original": "暈血，",
                                    "tokens": [
                                        {
                                            "hanzi": "暈血",
                                            "pinyin": "yùn xiě"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "3mhjivdeu",
                                    "original": "出血，",
                                    "tokens": [
                                        {
                                            "hanzi": "出血",
                                            "pinyin": "chū xiě"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "tqlywe5fg",
                                    "original": "血淋淋，",
                                    "tokens": [
                                        {
                                            "hanzi": "血淋淋",
                                            "pinyin": "xiě lín lín"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-2-2-1",
                "title": "2. Common Vocabulary (易錯詞彙表) (Part 1)",
                "content": {
                    "title": "2. Common Vocabulary (易錯詞彙表) (1)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "e0rvdht9e",
                                    "original": "祈禱，",
                                    "tokens": [
                                        {
                                            "hanzi": "祈禱",
                                            "pinyin": "qí dǎo"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "179yswn2y",
                                    "original": "盡情，",
                                    "tokens": [
                                        {
                                            "hanzi": "盡情",
                                            "pinyin": "jìn qíng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "cn9iig4k5",
                                    "original": "同鄉，",
                                    "tokens": [
                                        {
                                            "hanzi": "同鄉",
                                            "pinyin": "tóng xiāng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "txpc7q6jf",
                                    "original": "便宜，",
                                    "tokens": [
                                        {
                                            "hanzi": "便宜",
                                            "pinyin": "pián yi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "z60svge2a",
                                    "original": "東西，",
                                    "tokens": [
                                        {
                                            "hanzi": "東西",
                                            "pinyin": "dōng xī"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "xrhswaiyi",
                                    "original": "刁難，",
                                    "tokens": [
                                        {
                                            "hanzi": "刁難",
                                            "pinyin": "diāo nán"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "48srke3vu",
                                    "original": "功夫，",
                                    "tokens": [
                                        {
                                            "hanzi": "功夫",
                                            "pinyin": "gōng fū"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "lihc6a97w",
                                    "original": "寧可，",
                                    "tokens": [
                                        {
                                            "hanzi": "寧可",
                                            "pinyin": "níng kě"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "y7bc51l3p",
                                    "original": "輕舉妄動，",
                                    "tokens": [
                                        {
                                            "hanzi": "輕舉妄動",
                                            "pinyin": "qīng jǔ wàng dòng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "ccr4cstcb",
                                    "original": "軟件，",
                                    "tokens": [
                                        {
                                            "hanzi": "軟件",
                                            "pinyin": "ruǎn jiàn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-2-2-2",
                "title": "2. Common Vocabulary (易錯詞彙表) (Part 2)",
                "content": {
                    "title": "2. Common Vocabulary (易錯詞彙表) (2)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "oby5t22be",
                                    "original": "網絡，",
                                    "tokens": [
                                        {
                                            "hanzi": "網絡",
                                            "pinyin": "wǎng luò"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "g3e9mkdfh",
                                    "original": "觸碰，",
                                    "tokens": [
                                        {
                                            "hanzi": "觸碰",
                                            "pinyin": "chù pèng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "u2mv4kejq",
                                    "original": "摁，",
                                    "tokens": [
                                        {
                                            "hanzi": "摁",
                                            "pinyin": "èn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "cypklm0b2",
                                    "original": "鍵盤，",
                                    "tokens": [
                                        {
                                            "hanzi": "鍵盤",
                                            "pinyin": "jiàn pán"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "6le2bx9f3",
                                    "original": "處理，",
                                    "tokens": [
                                        {
                                            "hanzi": "處理",
                                            "pinyin": "chǔ lǐ"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "pwibu0c89",
                                    "original": "溝通，",
                                    "tokens": [
                                        {
                                            "hanzi": "溝通",
                                            "pinyin": "gōu tōng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "x4y7o0zfj",
                                    "original": "檔案，",
                                    "tokens": [
                                        {
                                            "hanzi": "檔案",
                                            "pinyin": "dàng àn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "mw6dwu1iv",
                                    "original": "容易，",
                                    "tokens": [
                                        {
                                            "hanzi": "容易",
                                            "pinyin": "róng yì"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "neclh1oty",
                                    "original": "會計師，",
                                    "tokens": [
                                        {
                                            "hanzi": "會計師",
                                            "pinyin": "huì jì shī"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "8we3kls6s",
                                    "original": "連鎖，",
                                    "tokens": [
                                        {
                                            "hanzi": "連鎖",
                                            "pinyin": "lián suǒ"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-2-2-3",
                "title": "2. Common Vocabulary (易錯詞彙表) (Part 3)",
                "content": {
                    "title": "2. Common Vocabulary (易錯詞彙表) (3)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "tc4t1d5s3",
                                    "original": "行情，",
                                    "tokens": [
                                        {
                                            "hanzi": "行情",
                                            "pinyin": "háng qíng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "xc6ahnpn0",
                                    "original": "不在行，",
                                    "tokens": [
                                        {
                                            "hanzi": "不在行",
                                            "pinyin": "bú zài háng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "t2stc4es1",
                                    "original": "人行道，",
                                    "tokens": [
                                        {
                                            "hanzi": "人行道",
                                            "pinyin": "rén xíng dào"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "13qdwneo5",
                                    "original": "沒數，",
                                    "tokens": [
                                        {
                                            "hanzi": "沒數",
                                            "pinyin": "méi shù"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "7ddbhvwz1",
                                    "original": "數以億計，",
                                    "tokens": [
                                        {
                                            "hanzi": "數以億計",
                                            "pinyin": "shù yǐ yì jì"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "hbs1uor8l",
                                    "original": "通脹，",
                                    "tokens": [
                                        {
                                            "hanzi": "通脹",
                                            "pinyin": "tōng zhàng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "38ttu9h99",
                                    "original": "志願，",
                                    "tokens": [
                                        {
                                            "hanzi": "志願",
                                            "pinyin": "zhì yuàn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "kvpgdvrbf",
                                    "original": "經營，",
                                    "tokens": [
                                        {
                                            "hanzi": "經營",
                                            "pinyin": "jīng yíng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "m8oklpw7o",
                                    "original": "產品，",
                                    "tokens": [
                                        {
                                            "hanzi": "產品",
                                            "pinyin": "chǎn pǐn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "e7d2yly3k",
                                    "original": "基礎，",
                                    "tokens": [
                                        {
                                            "hanzi": "基礎",
                                            "pinyin": "jī chǔ"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-2-2-4",
                "title": "2. Common Vocabulary (易錯詞彙表) (Part 4)",
                "content": {
                    "title": "2. Common Vocabulary (易錯詞彙表) (4)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "323uqdyh2",
                                    "original": "長久，",
                                    "tokens": [
                                        {
                                            "hanzi": "長久",
                                            "pinyin": "cháng jiǔ"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "mcrjj87yz",
                                    "original": "粗糙，",
                                    "tokens": [
                                        {
                                            "hanzi": "粗糙",
                                            "pinyin": "cū cāo"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "dn8u1tae7",
                                    "original": "言傳身教，",
                                    "tokens": [
                                        {
                                            "hanzi": "言傳身教",
                                            "pinyin": "yán chuán shēn jiào"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "gpdoymp33",
                                    "original": "存儲，",
                                    "tokens": [
                                        {
                                            "hanzi": "存儲",
                                            "pinyin": "cún chǔ"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "8teplihjt",
                                    "original": "財富，",
                                    "tokens": [
                                        {
                                            "hanzi": "財富",
                                            "pinyin": "cái fù"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "cuuernkoh",
                                    "original": "操作，",
                                    "tokens": [
                                        {
                                            "hanzi": "操作",
                                            "pinyin": "cāo zuò"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "w648cr0uu",
                                    "original": "準備，",
                                    "tokens": [
                                        {
                                            "hanzi": "準備",
                                            "pinyin": "zhǔn bèi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "szoe2814s",
                                    "original": "準確，",
                                    "tokens": [
                                        {
                                            "hanzi": "準確",
                                            "pinyin": "zhǔn què"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "0eto3lsr9",
                                    "original": "資料，",
                                    "tokens": [
                                        {
                                            "hanzi": "資料",
                                            "pinyin": "zī liào"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "x725vn1gm",
                                    "original": "資訊，",
                                    "tokens": [
                                        {
                                            "hanzi": "資訊",
                                            "pinyin": "zī xùn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-2-2-5",
                "title": "2. Common Vocabulary (易錯詞彙表) (Part 5)",
                "content": {
                    "title": "2. Common Vocabulary (易錯詞彙表) (5)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "vi9uet6ca",
                                    "original": "投資，",
                                    "tokens": [
                                        {
                                            "hanzi": "投資",
                                            "pinyin": "tóu zī"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "8a7cjb2bu",
                                    "original": "資格，",
                                    "tokens": [
                                        {
                                            "hanzi": "資格",
                                            "pinyin": "zī gé"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "eo68dvdaw",
                                    "original": "總是，",
                                    "tokens": [
                                        {
                                            "hanzi": "總是",
                                            "pinyin": "zǒng shì"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "l36h9qqm",
                                    "original": "總之，",
                                    "tokens": [
                                        {
                                            "hanzi": "總之",
                                            "pinyin": "zǒng zhī"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "vtbpz9mtd",
                                    "original": "種類，",
                                    "tokens": [
                                        {
                                            "hanzi": "種類",
                                            "pinyin": "zhǒng lèi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "d4v58ey75",
                                    "original": "質量，",
                                    "tokens": [
                                        {
                                            "hanzi": "質量",
                                            "pinyin": "zhì liáng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "jjzros18e",
                                    "original": "註冊，",
                                    "tokens": [
                                        {
                                            "hanzi": "註冊",
                                            "pinyin": "zhù cè"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "azvtldlyx",
                                    "original": "雜誌社，",
                                    "tokens": [
                                        {
                                            "hanzi": "雜誌社",
                                            "pinyin": "zá zhì shè"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "4b9tc60so",
                                    "original": "紮實，",
                                    "tokens": [
                                        {
                                            "hanzi": "紮實",
                                            "pinyin": "zhā shí"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "h10jhs630",
                                    "original": "積累，",
                                    "tokens": [
                                        {
                                            "hanzi": "積累",
                                            "pinyin": "jī lèi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-2-2-6",
                "title": "2. Common Vocabulary (易錯詞彙表) (Part 6)",
                "content": {
                    "title": "2. Common Vocabulary (易錯詞彙表) (6)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "owu33ivnd",
                                    "original": "積分，",
                                    "tokens": [
                                        {
                                            "hanzi": "積分",
                                            "pinyin": "jī fēn"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "esourvrhu",
                                    "original": "成績，",
                                    "tokens": [
                                        {
                                            "hanzi": "成績",
                                            "pinyin": "chéng jì"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "zazqvgkcc",
                                    "original": "執行，",
                                    "tokens": [
                                        {
                                            "hanzi": "執行",
                                            "pinyin": "zhí xíng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "ia15h9hcq",
                                    "original": "計劃，",
                                    "tokens": [
                                        {
                                            "hanzi": "計劃",
                                            "pinyin": "jì huá"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "031c4v4a4",
                                    "original": "增加，",
                                    "tokens": [
                                        {
                                            "hanzi": "增加",
                                            "pinyin": "zēng jiā"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "dcw8426qn",
                                    "original": "專業知識，",
                                    "tokens": [
                                        {
                                            "hanzi": "專業知識",
                                            "pinyin": "zhuān yè zhī shí"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "38c8wx87f",
                                    "original": "賺錢，",
                                    "tokens": [
                                        {
                                            "hanzi": "賺錢",
                                            "pinyin": "zhuàn qián"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "43x330wbz",
                                    "original": "守著，",
                                    "tokens": [
                                        {
                                            "hanzi": "守著",
                                            "pinyin": "shǒu zhù"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "dc9129aa8",
                                    "original": "理所當然，",
                                    "tokens": [
                                        {
                                            "hanzi": "理所當然",
                                            "pinyin": "lǐ suǒ dāng rán"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "yoe8r984i",
                                    "original": "模式，",
                                    "tokens": [
                                        {
                                            "hanzi": "模式",
                                            "pinyin": "mó shì"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": "unit-2-2-7",
                "title": "2. Common Vocabulary (易錯詞彙表) (Part 7)",
                "content": {
                    "title": "2. Common Vocabulary (易錯詞彙表) (7)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "qelw59exr",
                                    "original": "減省，",
                                    "tokens": [
                                        {
                                            "hanzi": "減省",
                                            "pinyin": "jiǎn shěng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "qsxl9dmhz",
                                    "original": "周詳，",
                                    "tokens": [
                                        {
                                            "hanzi": "周詳",
                                            "pinyin": "zhōu xiáng"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "cjhufph4a",
                                    "original": "省市，",
                                    "tokens": [
                                        {
                                            "hanzi": "省市",
                                            "pinyin": "shěng shì"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "7nl2ztx4r",
                                    "original": "喪失，",
                                    "tokens": [
                                        {
                                            "hanzi": "喪失",
                                            "pinyin": "sāng shī"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "4dqbg4bqx",
                                    "original": "住宿費，",
                                    "tokens": [
                                        {
                                            "hanzi": "住宿費",
                                            "pinyin": "zhù sù fèi"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "jxoml5q1l",
                                    "original": "公司，",
                                    "tokens": [
                                        {
                                            "hanzi": "公司",
                                            "pinyin": "gōng sī"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                },
                                {
                                    "id": "1f072q0xf",
                                    "original": "創業，",
                                    "tokens": [
                                        {
                                            "hanzi": "創業",
                                            "pinyin": "chuàng yè"
                                        },
                                        {
                                            "hanzi": "，",
                                            "pinyin": ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    }
];
