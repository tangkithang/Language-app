import json
import uuid
import re

def generate_id():
    return str(uuid.uuid4())[:8]

def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def is_chinese_char(char):
    """Check if character is Chinese (CJK Unified Ideographs)"""
    code = ord(char)
    return (0x4E00 <= code <= 0x9FFF) or (0x3400 <= code <= 0x4DBF) or (0x20000 <= code <= 0x2A6DF)

def is_punctuation(char):
    """Check if character is punctuation (Chinese or English)"""
    chinese_punct = '，。！？；：""''（）《》、【】…—·'
    english_punct = ',.!?;:\'"()[]{}…-'
    return char in chinese_punct or char in english_punct

def smart_segment(text, reference_pinyin):
    """
    Segments text into tokens with accurate pinyin using pypinyin library.
    Handles Chinese characters, punctuation, and English text.
    """
    from pypinyin import pinyin, Style
    
    tokens = []
    i = 0
    
    while i < len(text):
        char = text[i]
        
        if is_chinese_char(char):
            # Get pinyin for this Chinese character
            char_pinyin = pinyin(char, style=Style.TONE)[0][0]
            tokens.append({'hanzi': char, 'pinyin': char_pinyin})
            i += 1
            
        elif is_punctuation(char):
            # Punctuation - keep as-is with empty or matching pinyin
            tokens.append({'hanzi': char, 'pinyin': ''})
            i += 1
            
        elif char.isspace():
            # Skip whitespace in text (shouldn't normally be there)
            i += 1
            
        else:
            # English letters, numbers, or other characters
            # Accumulate consecutive non-Chinese chars into a word
            word_start = i
            while i < len(text) and not is_chinese_char(text[i]) and not is_punctuation(text[i]) and not text[i].isspace():
                i += 1
            
            word = text[word_start:i]
            # For English words like "Amy", use the word itself as pinyin
            tokens.append({'hanzi': word, 'pinyin': word})
    
    return tokens

def process_chapter(chapter_data):
    course_part = {
        "id": generate_id(),
        "title": f"Chapter {chapter_data['chapter_info']['chapter_number']}: {chapter_data['chapter_info']['chapter_title']}",
        "chapters": []
    }
    
    for passage in chapter_data['passages']:
        chapter_obj = {
            "id": generate_id(),
            "title": passage['title'],
            "content": {
                "title": passage['title'],
                "sections": []
            }
        }
        
        for page in passage['pages']:
            section = {
                "speaker": "Narrator", # Default speaker
                "sentences": []
            }
            
            for content_item in page['content']:
                # Each content item is a paragraph/block
                # We treat it as a sentence for the Reader structure
                
                # Check if speaker is defined in content
                if 'speaker' in content_item:
                    section['speaker'] = content_item['speaker']
                
                sentence = {
                    "id": generate_id(),
                    "original": content_item['text'],
                    "tokens": smart_segment(content_item['text'], content_item['pinyin'])
                }
                section['sentences'].append(sentence)
            
            chapter_obj['content']['sections'].append(section)
        
        course_part['chapters'].append(chapter_obj)
        
    return course_part

def main():
    try:
        data = load_json('chapter_1_paged.json')
        course_part = process_chapter(data)
        
        # Wrap in array as PASSAGE_COURSE
        passage_course = [course_part]
        
        # Generate TypeScript file
        ts_content = f"""import type {{ CoursePart }} from './vocabularyData';

export const PASSAGE_COURSE: CoursePart[] = {json.dumps(passage_course, indent=4, ensure_ascii=False)};
"""
        
        with open('src/data/passageData.ts', 'w', encoding='utf-8') as f:
            f.write(ts_content)
            
        print("Successfully generated src/data/passageData.ts")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
