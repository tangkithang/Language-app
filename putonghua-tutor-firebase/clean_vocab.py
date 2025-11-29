import re

file_path = 'src/data/vocabularyData.ts'

with open(file_path, 'r') as f:
    content = f.read()

# Pattern to match the comma token object
# We match the object with hanzi: "，" and pinyin: ""
# We also need to handle potential trailing commas after the object in the array
pattern = r',\s*{\s*"hanzi": "，",\s*"pinyin": ""\s*}'
# Also match if it's the first item (unlikely based on file) or without leading comma
pattern2 = r'{\s*"hanzi": "，",\s*"pinyin": ""\s*},?'

# Replace with empty string
new_content = re.sub(pattern, '', content)
new_content = re.sub(pattern2, '', new_content)

with open(file_path, 'w') as f:
    f.write(new_content)

print("Cleaned vocabularyData.ts")
