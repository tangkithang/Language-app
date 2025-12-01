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
                "id": "unit-1-1",
                "title": "1. Front/Back Nasal & Tones (前後鼻音與聲調)",
                "content": {
                    "title": "1. Front/Back Nasal & Tones (前後鼻音與聲調)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "7klhmjmxm",
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
                                    "id": "ghiumiigs",
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
                                    "id": "bwnme7l4o",
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
                                    "id": "ifc65ao7l",
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
                                    "id": "gmao2mjt9",
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
                                    "id": "cbt090jy7",
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
                                    "id": "9lwiand9j",
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
                                    "id": "sxdrsile0",
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
                                    "id": "7i44kxvqc",
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
                                    "id": "tpp5ud2yb",
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
                                },
                                {
                                    "id": "7p846w5d9",
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
                                    "id": "1tpdfar1d",
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
                                    "id": "gadol3o94",
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
                                    "id": "woa94kwwa",
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
                                    "id": "mkwh36c9s",
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
                                    "id": "pvmak8y1h",
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
                                    "id": "iyyqmsjys",
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
                                    "id": "6hqovnxdv",
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
                                    "id": "9pxnw93k2",
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
                                    "id": "afjhyrlnp",
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
                                },
                                {
                                    "id": "mfj1atttk",
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
                                    "id": "aob82zpgr",
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
                                    "id": "8l7bcq56v",
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
                                    "id": "ijvl8w3la",
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
                "id": "unit-1-2",
                "title": "2. Initials (聲母辨析)",
                "content": {
                    "title": "2. Initials (聲母辨析)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "p7ec6i1v2",
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
                                    "id": "dwdrhjbkf",
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
                                    "id": "0bthfwc28",
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
                                    "id": "gwab62p89",
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
                                    "id": "01147akha",
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
                                    "id": "6kf51t84c",
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
                                    "id": "57mrvkkn4",
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
                                    "id": "crqr2zu1e",
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
                                    "id": "8dfth4rkw",
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
                                    "id": "j830md88z",
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
                                },
                                {
                                    "id": "v701lxv81",
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
                                    "id": "fnnrkabnk",
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
                                    "id": "f5vcvuzae",
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
                                    "id": "0510cpo9q",
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
                                    "id": "569h4mqle",
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
                                    "id": "gm3obrprr",
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
                                    "id": "twk8qvlew",
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
                                    "id": "k622j916v",
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
                                    "id": "fnppmz2nq",
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
                                    "id": "at3h36pux",
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
                                },
                                {
                                    "id": "gttfemkql",
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
                "id": "unit-1-3",
                "title": "3. Finals (韻母辨析)",
                "content": {
                    "title": "3. Finals (韻母辨析)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "pfslcrm37",
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
                                    "id": "bcybhs4ue",
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
                                    "id": "w4s43ldvo",
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
                                    "id": "2tcua4vm5",
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
                                    "id": "6yxjcfk1g",
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
                                    "id": "ly0p4zv8f",
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
                                    "id": "mpygfuzu5",
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
                "id": "unit-1-4",
                "title": "4. Neutral Tone (輕聲詞)",
                "content": {
                    "title": "4. Neutral Tone (輕聲詞)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "u4gvkzixl",
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
                                    "id": "q98cmrvrw",
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
                                    "id": "q9oaabr3o",
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
                                    "id": "v3i8l5gx7",
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
                                    "id": "sxooledt4",
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
                                    "id": "raohz61ab",
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
                                    "id": "zzmy22o5t",
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
                                    "id": "c9i81n2pe",
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
                                    "id": "btnd6iclk",
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
                                    "id": "z4qg3ekxf",
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
                                },
                                {
                                    "id": "j2dex8r7m",
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
                                    "id": "gxv2gir6s",
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
                                    "id": "40lpuduqf",
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
                                    "id": "hkmmtjysb",
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
                                    "id": "isc8szm11",
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
                                    "id": "b9fdk1jnb",
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
                                    "id": "n0tg768es",
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
                                    "id": "g4mlmcs5b",
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
                                    "id": "q8ww3a6x8",
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
                                    "id": "itbe4342b",
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
                                },
                                {
                                    "id": "azh662gja",
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
                                    "id": "6wv766ao6",
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
                                    "id": "0e1umyipg",
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
                                    "id": "ox20jyjsu",
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
                                    "id": "pxsfyfm9b",
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
                                    "id": "awhr674pv",
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
                                    "id": "aovtxw4ml",
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
                                    "id": "7am4idoiw",
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
                                    "id": "4r84cwyxh",
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
                                    "id": "zw696xc5f",
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
                                },
                                {
                                    "id": "5eqz2bx45",
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
                                    "id": "qflzo96sp",
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
                "id": "unit-2-1",
                "title": "1. Polyphones (重點多音字)",
                "content": {
                    "title": "1. Polyphones (重點多音字)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "k7jzavgpl",
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
                                    "id": "rw7agkqrv",
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
                                    "id": "qdl4mlbxm",
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
                                    "id": "44i45a9zf",
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
                                    "id": "7rfw6jcv7",
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
                                    "id": "8djssqib2",
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
                                    "id": "kral2cnfo",
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
                                    "id": "zo9w4lo1d",
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
                                    "id": "xksm8avru",
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
                                    "id": "77pp987s5",
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
                                },
                                {
                                    "id": "xicvlvo6s",
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
                                    "id": "02me078qg",
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
                                    "id": "ywy64w4un",
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
                                    "id": "m3i8ozwyi",
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
                                    "id": "on73ssdgv",
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
                                    "id": "h071bldak",
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
                                    "id": "wfi40e6en",
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
                                    "id": "bw4prpkuf",
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
                                    "id": "xr2sd4s1z",
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
                                    "id": "5cbd0iiok",
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
                                },
                                {
                                    "id": "mbgticivd",
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
                                    "id": "yhjkv05ud",
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
                                    "id": "7mwnpnx5w",
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
                "id": "unit-2-2",
                "title": "2. Common Vocabulary (易錯詞彙表)",
                "content": {
                    "title": "2. Common Vocabulary (易錯詞彙表)",
                    "sections": [
                        {
                            "speaker": "Vocabulary Practice",
                            "sentences": [
                                {
                                    "id": "664k2jb3q",
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
                                    "id": "0p7999y1z",
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
                                    "id": "b1otl8zh6",
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
                                    "id": "3vx8e62fg",
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
                                    "id": "8wljie7kc",
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
                                    "id": "biq5ibloj",
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
                                    "id": "x2r7nz8aa",
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
                                    "id": "hy1xibpw4",
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
                                    "id": "3p2q15kf2",
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
                                    "id": "wooqphh0n",
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
                                },
                                {
                                    "id": "dqlvhwj7z",
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
                                    "id": "bybidsjje",
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
                                    "id": "g0qa2rjn5",
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
                                    "id": "daayui2vr",
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
                                    "id": "ne1fjh804",
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
                                    "id": "e3030s00l",
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
                                    "id": "o4oc91nsv",
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
                                    "id": "doltlcpi2",
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
                                    "id": "bud3jvqvn",
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
                                    "id": "vsxyyqi85",
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
                                },
                                {
                                    "id": "0xa0zcs1c",
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
                                    "id": "pil8b1vm5",
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
                                    "id": "vr13xgdhq",
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
                                    "id": "jprgulgxj",
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
                                    "id": "o5n4jagdn",
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
                                    "id": "s4sk7scko",
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
                                    "id": "kcbrgazt9",
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
                                    "id": "0xfgql7rl",
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
                                    "id": "ud2df0bmy",
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
                                    "id": "4c53lk812",
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
                                },
                                {
                                    "id": "cc5j5m0n3",
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
                                    "id": "0t4quc5s3",
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
                                    "id": "6cq7mynxd",
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
                                    "id": "yhbvuzndc",
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
                                    "id": "0psj2oaaw",
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
                                    "id": "qkyb2d2gj",
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
                                    "id": "mtqfrtv9t",
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
                                    "id": "upg3f0uqx",
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
                                    "id": "lpuwfw7iv",
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
                                    "id": "7hmj0es0a",
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
                                },
                                {
                                    "id": "b98ncmch1",
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
                                    "id": "y4vbsjz5c",
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
                                    "id": "3v13yxq6d",
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
                                    "id": "iwo2n1ict",
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
                                    "id": "gefh8b32c",
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
                                    "id": "cstzjmr4b",
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
                                    "id": "hznnk7n2m",
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
                                    "id": "0jvl337tb",
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
                                    "id": "dp3xm4reo",
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
                                    "id": "b3sgtj0cu",
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
                                },
                                {
                                    "id": "n8qwelq1r",
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
                                    "id": "1qf10o0g0",
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
                                    "id": "kwdem1blm",
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
                                    "id": "5np6owi9h",
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
                                    "id": "utnr3oduz",
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
                                    "id": "0ayptcnqn",
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
                                    "id": "4o6r1dp4a",
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
                                    "id": "dyc54pizd",
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
                                    "id": "nwx17iujx",
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
                                    "id": "r4n7lht3d",
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
                                },
                                {
                                    "id": "8i5ll0rcn",
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
                                    "id": "57syot6zh",
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
                                    "id": "lw525dweq",
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
                                    "id": "2hs4km4tl",
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
                                    "id": "8ueik69jg",
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
                                    "id": "i4h5a3f7c",
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
                                    "id": "940svmlmm",
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
