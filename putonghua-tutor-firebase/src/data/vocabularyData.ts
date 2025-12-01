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
                                    "id": "33mpzsww6",
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
                                    "id": "psk45377q",
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
                                    "id": "rodi3xjpx",
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
                                    "id": "4dbpngr8r",
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
                                    "id": "nvu4qjivh",
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
                                    "id": "htbezkgey",
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
                                    "id": "oz6m8qupr",
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
                                    "id": "qkbzzn4oh",
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
                                    "id": "4hz8dss6j",
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
                                    "id": "ovf2vhk0q",
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
                                    "id": "06v768u3a",
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
                                    "id": "86atao1g7",
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
                                    "id": "nf7auukh4",
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
                                    "id": "3mms1xqr4",
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
                                    "id": "c14l3j2c1",
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
                                    "id": "pfe41r3ye",
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
                                    "id": "wayixmlh1",
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
                                    "id": "y3r1rm5tg",
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
                                    "id": "a007w69lg",
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
                                    "id": "bpje5lgio",
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
                                    "id": "g713poe0j",
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
                                    "id": "71osmzh09",
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
                                    "id": "nf7q4qrvx",
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
                                    "id": "08gia3riq",
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
                                    "id": "svfdn5v85",
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
                                    "id": "wfiyfu2ej",
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
                                    "id": "lyk4xd1jx",
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
                                    "id": "lz4y0atwj",
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
                                    "id": "p883x2dqm",
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
                                    "id": "sktnu7u52",
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
                                    "id": "mpjztaeu9",
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
                                    "id": "yt24r74s7",
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
                                    "id": "1m950vlf4",
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
                                    "id": "x41jnt3mw",
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
                                    "id": "l1k61egl5",
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
                                    "id": "s8p6haxk6",
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
                                    "id": "l8ft5s4lb",
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
                                    "id": "93nus0pxx",
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
                                    "id": "lmnf8j8dx",
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
                                    "id": "dk8cluqw4",
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
                                    "id": "dfu8klul6",
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
                                    "id": "0ragxr19z",
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
                                    "id": "cbnpbgtbu",
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
                                    "id": "0248k5wwj",
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
                                    "id": "0b7ngg44p",
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
                                    "id": "9qypvbpqq",
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
                                    "id": "vi1ssxtnn",
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
                                    "id": "rq3b7qbrz",
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
                                    "id": "07a5h0lzv",
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
                                    "id": "cxoa7pxf4",
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
                                    "id": "5ax467g7t",
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
                                    "id": "o4bg0fj6d",
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
                                    "id": "lva67kgil",
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
                                    "id": "e4av9jrdt",
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
                                    "id": "v90hhnuq2",
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
                                    "id": "1jgj7cwg7",
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
                                    "id": "6q0ejtt3w",
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
                                    "id": "ruvlpne7a",
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
                                    "id": "jxbl7hwab",
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
                                    "id": "l4yb2vmq8",
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
                                    "id": "hphtbnzmj",
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
                                    "id": "fer075sc1",
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
                                    "id": "88mgtfcfg",
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
                                    "id": "ep84177kd",
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
                                    "id": "gq04swa31",
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
                                    "id": "8wnaon7yh",
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
                                    "id": "m44ga6qtg",
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
                                    "id": "oi001y06n",
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
                                    "id": "bktncwzkw",
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
                                    "id": "3gkg2a5da",
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
                                    "id": "ykxd3e0nb",
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
                                    "id": "sjmgxs3m5",
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
                                    "id": "6jt23l8m7",
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
                                    "id": "qgm9c6ay1",
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
                                    "id": "my159tqdw",
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
                                    "id": "ast6sufi1",
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
                                    "id": "bapig3t8e",
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
                                    "id": "9y3tbo0fr",
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
                                    "id": "moe0ol9ok",
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
                                    "id": "ldtukx2vo",
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
                                    "id": "jnyq6w7vk",
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
                                    "id": "ef0vd3t9p",
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
                                    "id": "dme8c2ksv",
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
                                    "id": "kg3ti6x96",
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
                                    "id": "p7ydfoi8c",
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
                                    "id": "csuzy555b",
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
                                    "id": "i8hz3u04s",
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
                                    "id": "t81fta7w5",
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
                                    "id": "g41hpl0m5",
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
                                    "id": "4kl7wp9pe",
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
                                    "id": "3jb2qxeke",
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
                                    "id": "x70zdefpv",
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
                                    "id": "4fz7fe9kd",
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
                                    "id": "usuxol167",
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
                                    "id": "o4n90eafp",
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
                                    "id": "i05901h8b",
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
                                    "id": "dy9p8kuav",
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
                                    "id": "ct1t9vgd9",
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
                                    "id": "15g3f6suj",
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
                                    "id": "riuw2th8b",
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
                                    "id": "24ps3ayw3",
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
                                    "id": "la3wbau9f",
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
                                    "id": "4krmsfsnm",
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
                                    "id": "nad62s9tt",
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
                                    "id": "nr0vg63ob",
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
                                    "id": "etbd1gwnl",
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
                                    "id": "qslnhg713",
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
                                    "id": "n6jvdm5rj",
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
                                    "id": "snriitpqg",
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
                                    "id": "8zkctt75h",
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
                                    "id": "i289jsq0z",
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
                                    "id": "tgqt08guu",
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
                                    "id": "1loqldibz",
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
                                    "id": "g14kj93oe",
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
                                    "id": "2tqgslziv",
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
                                    "id": "1eryi7wt1",
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
                                    "id": "62aqc0s99",
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
                                    "id": "5q2pu0t06",
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
                                    "id": "d0h9gpiyb",
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
                                    "id": "hajilkd9f",
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
                                    "id": "tcdq4vf71",
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
                                    "id": "nrcwpccxq",
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
                                    "id": "dpi0s7eft",
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
                                    "id": "j3a8omzq5",
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
                                    "id": "68cb32pxh",
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
                                    "id": "b7slez3kw",
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
                                    "id": "lrsgheou4",
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
                                    "id": "l0f7c1cc0",
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
                                    "id": "0rpkvcfwf",
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
                                    "id": "wus0ntjje",
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
                                    "id": "3uwi8cizw",
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
                                    "id": "v8b8o9ni0",
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
                                    "id": "pmwyji7mn",
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
                                    "id": "w3fpfz203",
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
                                    "id": "bthsynh06",
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
                                    "id": "6nn9mejsh",
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
                                    "id": "btusis7sm",
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
                                    "id": "ilii8wj4l",
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
                                    "id": "ermvunp38",
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
                                    "id": "5lfm77a6c",
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
                                    "id": "8ul9kwmne",
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
                                    "id": "zlo3tx1kc",
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
                                    "id": "ub8jwptf1",
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
                                    "id": "c1fugyopy",
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
                                    "id": "yive18vcw",
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
                                    "id": "nep8ekqjx",
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
                                    "id": "oi1nb5a22",
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
                                    "id": "sgfvem5es",
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
                                    "id": "ki0wzg576",
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
                                    "id": "en23gfavj",
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
                                    "id": "bqlwo78lr",
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
                                    "id": "yivnpp1jb",
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
                                    "id": "611ck4vji",
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
                                    "id": "m2b2wy2ov",
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
                                    "id": "a2jdpyy3w",
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
                                    "id": "11qcixana",
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
                                    "id": "s5tu1rjpq",
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
                                    "id": "ekxwgc7br",
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
                                    "id": "xi0vxjoin",
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
                                    "id": "3lfii735e",
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
                                    "id": "izxqth1ew",
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
                                    "id": "hsk0akj9i",
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
                                    "id": "7tgertqy8",
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
                                    "id": "gifkqv9o3",
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
                                    "id": "1r8y436fu",
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
                                    "id": "2rs6qlmrq",
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
                                    "id": "q8mipqvf0",
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
                                    "id": "npwsscd5n",
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
                                    "id": "vjidli69h",
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
                                    "id": "4spzr85g3",
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
                                    "id": "nf8yogw56",
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
                                    "id": "erm122yfw",
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
                                    "id": "rtrtq7msr",
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
                                    "id": "vcnqhdbgz",
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
