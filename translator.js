/*********************************************
 * 1. 전역 변수 및 상수 정의
 *********************************************/
// 1. 전역 변수 정의
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let geminiApiKey = localStorage.getItem('geminiApiKey') || '';
let openaiApiKey = localStorage.getItem('openaiApiKey') || '';
let anthropicApiKey = localStorage.getItem('anthropicApiKey') || '';
let cohereApiKey = localStorage.getItem('cohereApiKey') || '';
let wordRules = JSON.parse(localStorage.getItem('wordRules')) || [];
let selectedModel = localStorage.getItem('selectedModel') || 'gemini-1.5-pro-002';
let customPrompt = localStorage.getItem('customPrompt') || "# Translation Task Definition\nYou are a professional English-Korean translator specializing in roleplaying content. Your task is to translate English text into natural, fluent Korean while preserving the original tone, context, and cultural nuances. Focus particularly on translating both dialogue and action descriptions in roleplay scenarios.\n\n# Translation Requirements\n\n## Core Translation Principles\n1. Maintain the original meaning and intent\n2. Choose appropriate Korean honorific levels\n3. Convert English expressions to natural Korean equivalents\n4. Keep character personalities consistent through appropriate speech levels\n5. Apply Korean cultural context while preserving original story elements\n\n## Technical Guidelines\n\n### For Dialogue Translation\n- Select appropriate Korean honorific levels based on context:\n  * Formal situations → 합쇼체 (-ㅂ니다/습니다)\n  * Polite casual → 해요체 (-아/어요)\n  * Informal between friends/close relations → 반말 (-아/어)\n  * Professional settings → 존댓말 with proper honorific markers\n\n- Handle English dialogue features:\n  * Convert direct English expressions into natural Korean patterns\n  * Add appropriate sentence-final particles (요, 네, 군요, etc.)\n  * Consider speaker-listener relationship for proper honorifics\n  * Include context-appropriate Korean discourse markers\n\n### For Action Description Translation\n- Transform English action descriptions into natural Korean flow:\n  * Convert SVO (Subject-Verb-Object) to SOV (Subject-Object-Verb) structure\n  * Use appropriate Korean action descriptors and auxiliaries\n  * Add proper Korean particles (조사) based on context\n  * Incorporate Korean-style onomatopoeia and mimetic words\n\n### Cultural Elements\n- Adapt English titles and forms of address to Korean equivalents\n- Use appropriate Korean relationship terms (언니, 오빠, 선배 etc.)\n- Convert Western gestures to Korean cultural equivalents\n- Apply proper level of formality in different situations\n\n## Specific Instructions\n\n1. Initial Analysis\n- Understand the overall context and relationship between characters\n- Identify the appropriate speech levels for each character\n- Note any cultural references that need adaptation\n\n2. Translation Process\n- First pass: Basic translation maintaining core meaning\n- Second pass: Apply proper Korean grammar and particles\n- Final pass: Refine for natural Korean flow and proper honorifics\n\n3. Quality Checks\n- Verify honorific consistency\n- Check particle usage accuracy\n- Confirm natural Korean expression\n- Validate cultural appropriateness\n\n# Format Specifications\n\nInput Format:\n```\n[English text]\n```\n\nOutput Format:\n```\n[Korean translation only]\n```\n\n# Response Rules\n- Provide ONLY the Korean translation\n- Do not offer multiple options or explanations\n- Do not include commentary about the translation choices\n- Do not include the original English text\n- Do not ask questions or suggest alternatives\n- Do not explain honorific choices or grammar points\n\nExample:\n\nInput:\n```\n\"Hello everyone,\" she said with a bright smile. She bowed politely to the group.\n```\n\nOutput:\n```\n\"안녕하세요,\" 그녀가 밝은 미소를 지으며 말했다. 그녀는 일행들에게 공손히 인사를 했다.\n```\n\n## Honorific System Guidelines\n- Business/Formal: \n  * \"Could you please...\" → \"~해 주시겠습니까?\"\n  * \"I would like to...\" → \"~하고 싶습니다\"\n\n- Casual Polite:\n  * \"Can you...\" → \"~할 수 있으세요?\"\n  * \"I think...\" → \"~인 것 같아요\"\n\n- Informal:\n  * \"Hey, do this\" → \"야, 이거 해\"\n  * \"What's up\" → \"뭐 해?\"\n\n## Tense and Aspect Guidelines\n\n### Present Tense\n- Simple present → \"-ㄴ다/는다\" or \"-아/어요\"\n- Present continuous → \"-고  있다\" or \"-고 있어요\"\n- Present habits → \"-ㄴ다/는다\" or relevant time markers\n\n### Past Tense\n- Simple past → \"-았/었다\" or \"-았/ 었어요\"\n- Past perfect → \"-았/었었다\" or \"-았/었었어요\"\n- Past continuous → \"-고 있었다\" or \"-고 있었어요\"\n\n### Future Tense\n- Will/Shall → \"-ㄹ/을 거예요\" or \"-ㄹ/을 것입니다\"\n- Going to → \"-려고 해요\" or \"-기로 했어요\"\n- Future plans → \"-ㄹ/을 예정이다\"\n\n## Style Adaptation\n- Convert English emphasis to Korean particles and endings\n- Adapt English idiomatic expressions to Korean equivalents\n- Maintain character voice through consistent speech patterns\n- Use appropriate Korean discourse markers and fillers\n\n## Common Translation Patterns\n\n### Action Descriptions\nEnglish: \"He slowly walks towards the door\"\nKorean: \"그가 천천히 문쪽으로 걸어간다\"\n\n### Emotional Expressions\nEnglish: \"I'm so excited!\"\nKorean: \"정말 신나요!\" or \"너무 설레요!\"\n\n### Requests\nEnglish: \"Could you help me with this?\"\nKorean: \"이것 좀 도와 주시겠어요?\"\n\n# Error Prevention\n- Avoid awkward literal translations\n- Maintain proper particle usage\n- Keep honorific levels consistent\n- Preserve emotional nuances\n\n# Examples with Context\n\nFormal Business Setting:\n```\n[English]\nChecks the document carefully\n\"I apologize for the delay in processing your request.\"\n\n[Korean]\n서류를 세심히 확인한다\n\"요청하신 건의 처리가 지연되어 대단히 죄송합니다.\"\n```\n\nCasual Friend Setting:\n```\n[English]\nWaves excitedly\n\"Hey! I missed you so much!\"\n\n[Korean]\n신나서 손을 흔든다\n\"야! 너무 보고 싶었어!\"\n```\n\nRemember: Focus on creating natural Korean expressions that convey the same meaning and feeling as the original English text, while appropriately adapting to Korean cultural and linguistic norms.\n\n# Your Translation Task\n\nNow, following all the guidelines above, please translate the following English text into natural, fluent Korean. Consider the context, use appropriate honorific levels, and ensure natural expression; Here is it:";
let baseColor = localStorage.getItem('baseColor') || (isDarkMode ? '#ffffff' : '#000000');
let quoteColor = localStorage.getItem('quoteColor') || '#2E5CB8';
let thoughtColor = localStorage.getItem('thoughtColor') || '#6B4C9A';
let emphasisColor = localStorage.getItem('emphasisColor') || '#7B3B3B';
let boldColor = localStorage.getItem('boldColor') || '#e39db9';
let selectedFont = localStorage.getItem('selectedFont') || 'RIDIBatang';
let sourceFontSize = localStorage.getItem('sourceFontSize') || '16px';
let resultFontSize = localStorage.getItem('resultFontSize') || '16px';
let enableMarkdown = localStorage.getItem('enableMarkdown') !== 'false';
let savedText = localStorage.getItem('savedText') || '';
let lastTranslation = localStorage.getItem('lastTranslation') || '';
let translationHistory = JSON.parse(localStorage.getItem('translationHistory')) || [];
let currentDirection = 'enToKo'; // 기본값은 영→한
let savedKoToEnTemplate = localStorage.getItem('savedKoToEnTemplate') || '';
let savedEnToKoTemplate = localStorage.getItem('savedEnToKoTemplate') || '';
let koToEnTemplate = '';
let enToKoTemplate = '';
let savedKoToEnTemplateName = localStorage.getItem('savedKoToEnTemplateName') || '';
let savedEnToKoTemplateName = localStorage.getItem('savedEnToKoTemplateName') || '';
let toastTimeout;
let userTemplates = JSON.parse(localStorage.getItem('userTemplates')) || {};
let autoSaveInterval = null;
let lastSaveTime = 0;
let currentFilter = 'all';
const CURRENT_VERSION = '1.6.6'; 
const UPDATE_NOTIFICATIONS = 1;  // 업데이트 알림 개수
const router = {
    currentPage: 'main',
    
    navigate(page) {
      // 모든 페이지 숨기기
      document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
      });
      
      // 네비게이션 버튼 상태 업데이트
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
      });
      
      // 선택된 페이지 표시
      document.getElementById(`${page}Page`).classList.add('active');
      document.querySelector(`[data-page="${page}"]`).classList.add('active');
      
      // 현재 페이지 저장
      this.currentPage = page;
      localStorage.setItem('currentPage', page);
    }
  };
const AUTO_SAVE_DELAY = 10000; // 30초마다 자동 저장
const SAVE_NOTIFICATION_COOLDOWN = 30000;
// 파일 업로드
const ALLOWED_FILE_TYPES = {
    'text/plain': 'TXT',
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX'
};
const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30MB 제한
const CHUNK_SIZE = 1000; // 청크 크기 설정
let isTranslating = false;
let controller = null;  // AbortController를 위한 변수

// 모델 옵션 정의
const modelOptions = [
    {
        group: 'Google Gemini',
        options: [
            { value: 'gemini-2.0-flash-thinking-exp-1219', label: 'Gemini 2.0 Flash Thinking Experimental' },
            { value: 'gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash Experimental' },
            { value: 'gemini-exp-1206', label: 'Gemini Experimental 1206' },
            { value: 'gemini-exp-1114', label: 'Gemini Experimental 1114' },
            { value: 'gemini-1.5-pro-002', label: 'Gemini 1.5 Pro (Latest)' },
            { value: 'gemini-1.5-pro-001', label: 'Gemini 1.5 Pro (Stable)' },
            { value: 'gemini-1.5-flash-002', label: 'Gemini 1.5 Flash (Latest)' },
            { value: 'gemini-1.5-flash-001', label: 'Gemini 1.5 Flash (Stable)' }
        ]
    },
    {
        group: 'OpenAI GPT-3.5',
        options: [
            { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
            { value: 'gpt-3.5-turbo-0125', label: 'GPT-3.5 Turbo 0125' },
            { value: 'gpt-3.5-turbo-1106', label: 'GPT-3.5 Turbo 1106' },
            { value: 'gpt-3.5-turbo-16k', label: 'GPT-3.5 Turbo 16K' }
        ]
    },
    {
        group: 'OpenAI GPT-4',
        options: [
            { value: 'gpt-4-turbo-preview', label: 'GPT 4 Turbo preview' },
            { value: 'gpt-4-0125-preview', label: 'GPT-4 Turbo 0125' },
            { value: 'gpt-4-1106-preview', label: 'GPT-4 Turbo 1106' },
            { value: 'gpt-4', label: 'GPT-4' },
            { value: 'gpt-4-32k', label: 'GPT-4 32K' }
        ]
    },
    {
        group: 'OpenAI GPT-4o',
        options: [
            { value: 'gpt-4o', label: 'GPT-4o' },
            { value: 'gpt-4o-2024-11-20', label: 'GPT-4o-2024-11-20' },
            { value: 'gpt-4o-2024-08-06', label: 'GPT-4o-2024-08-06' },
            { value: 'gpt-4o-2024-05-13', label: 'GPT-4o-2024-05-13' },
            { value: 'chatgpt-4o-latest', label: 'chatgpt-4o-latest' },
            { value: 'gpt-4o-mini', label: 'gpt-4o-mini' },
            { value: 'gpt-4o-mini-2024-07-18', label: 'gpt-4o-mini-2024-07-18' }
        ]
    },
    {
        group: 'OpenAI GPT-o1',
        options: [
            { value: 'o1-preview', label: 'o1-preview' },
            { value: 'o1-preview-2024-09-12', label: 'o1-preview-2024-09-12' },
            { value: 'o1-mini', label: 'o1-mini' },
            { value: 'o1-mini-2024-09-12', label: 'o1-mini-2024-09-12' }
        ]
    },
    {
        group: 'Claude 3.5',
        options: [
            { value: 'claude-3-5-haiku-20241022', label: 'claude-3-5-haiku-20241022' },
            { value: 'claude-3-5-sonnet-20241022', label: 'claude-3-5-sonnet-20241022' },
        ]
    },
    {
        group: 'Claude 3',
        options: [
            { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus 24-02-29' },
            { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet 24-02-29' },
            { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku 24-03-07' },
        ]
    },
    {
        group: 'Claude Legacy',
        options: [
            { value: 'claude-2.1', label: 'Claude 2.1' },
            { value: 'claude-2.0', label: 'Claude 2.0' },
            { value: 'claude-1.3', label: 'Claude 1.3' }
        ]
    },
    {
        group: 'Cohere',
        options: [
            { value: 'c4ai-aya-expanse-8b', label: 'Aya Expanse 8B' },
            { value: 'c4ai-aya-expanse-32b', label: 'Aya Expanse 32B' },
            { value: 'command-r', label: 'Command-R' },
            { value: 'command-r-08-2024', label: 'Command-R 08-2024' },
            { value: 'command-r-plus', label: 'Command-R Plus' },
            { value: 'command-r-plus-08-2024', label: 'Command-R Plus 08-2024' }
        ]
    }
];

// 프롬프트 템플릿
const promptTemplates = {
    basicEnToKo: "# Translation Task Definition\nYou are a professional English-Korean translator specializing in roleplaying content. Your task is to translate English text into natural, fluent Korean while preserving the original tone, context, and cultural nuances. Focus particularly on translating both dialogue and action descriptions in roleplay scenarios.\n\n# Translation Requirements\n\n## Core Translation Principles\n1. Maintain the original meaning and intent\n2. Choose appropriate Korean honorific levels\n3. Convert English expressions to natural Korean equivalents\n4. Keep character personalities consistent through appropriate speech levels\n5. Apply Korean cultural context while preserving original story elements\n6. Adapt dialogue flow naturally based on context and emotional progression  \n7. Maintain consistent but flexible character voices\n\n## Technical Guidelines\n\n### For Dialogue Translation\n- Select appropriate Korean honorific levels based on context:\n\t  * Formal situations → 합쇼체 (-ㅂ니다/습니다)\n\t  * Polite casual → 해요체 (-아/어요)\n\t  * Informal between friends/close relations → 반말 (-아/어)\n\t  * Professional settings → 존댓말 with proper honorific markers\n\n- Handle English dialogue features:\n\t  * Convert direct English expressions into natural Korean patterns\n\t  * Add appropriate sentence-final particles (요, 네, 군요, etc.)\n\t  * Consider speaker-listener relationship for proper honorifics\n\t  * Include context-appropriate Korean discourse markers\n\n- Context-sensitive speech pattern adaptation:\n    - Consider emotional state changes\n    - React appropriately to previous dialogue\n    - Adjust formality based on evolving relationships\n    - Mirror conversation partner's speech level when appropriate\n    \n- Character voice consistency:\n    - Create distinct speech patterns for each character\n    - Use consistent personal pronouns and self-reference styles\n    - Maintain character-specific verbal habits and expressions\n    - Allow natural variation based on emotional state\n\nExample:\n\n[1] Tsundere Character:\nInput:\n```\n\"I-it's not like I made this for you or anything!\" blushes and looks away\n```\n\nOutput:\n```\n\"따-딱히 너를 생각해서 만든 거 전혀 아니거든!\" 얼굴을 붉히며 고개를 돌린다\n```\n\n[2] Elderly Mentor:\nInput:\n```\n\"Young one, you still have much to learn.\" *strokes beard thoughtfully* \n```\n\nOutput:\n```\n\"젊은이여, 그대는 아직 배워야 할 게 많은 것 같구나.\" 수염을 천천히 쓰다듬으며 생각에 잠긴다\n```\n\n[3] Energetic Child:\nInput:\n```\n\"Wow! This is so cool! Can we do it again?\" jumps up and down excitedly \n```\n\nOutput:\n```\n\"와아! 대박! 저희 한 번만 더 해보면 안돼요?\" 신나서 폴짝폴짝 뛴다\n```\n\n## Context Flow Guidelines\n- Monitor emotional progression:\n    - Track relationship development between characters\n    - Note mood changes within scenes\n    - Adjust speech patterns accordingly\n    - Maintain natural conversation flow\n    \n- Dialogue coherence:\n    - Reference previous statements appropriately\n    - Use suitable response particles\n    - Match question-answer pairs naturally\n    - Maintain logical conversation progression\n    \n- Scene-appropriate reactions:\n    - Adapt to changing situations\n    - Match physical actions to emotional state\n    - Use appropriate interjections\n    - Include relevant Korean conversational markers\n\n### For Action Description Translation\n- Transform English action descriptions into natural Korean flow:\n  * Convert SVO (Subject-Verb-Object) to SOV (Subject-Object-Verb) structure\n  * Use appropriate Korean action descriptors and auxiliaries\n  * Add proper Korean particles (조사) based on context\n  * Incorporate Korean-style onomatopoeia and mimetic words\n\n### Cultural Elements\n- Adapt English titles and forms of address to Korean equivalents\n- Use appropriate Korean relationship terms (언니, 오빠, 선배 etc.)\n- Convert Western gestures to Korean cultural equivalents\n- Apply proper level of formality in different situations\n\n## Specific Instructions\n1. Initial Analysis\n- Understand the overall context and relationship between characters\n- Identify the appropriate speech levels for each character\n- Note any cultural references that need adaptation\n\n2. Translation Process\n- First pass: Basic translation maintaining core meaning\n- Second pass: Apply proper Korean grammar and particles\n- Final pass: Refine for natural Korean flow and proper honorifics\n\n3. Quality Checks\n- Verify honorific consistency\n- Check particle usage accuracy\n- Confirm natural Korean expression\n- Validate cultural appropriateness\n\n# Format Specifications\n\nInput Format:\n```\n[English text]\n```\n\nOutput Format:\n```\n[Korean translation only]\n```\n\n# Response Rules\n- Provide ONLY the Korean translation\n- Do not offer multiple options or explanations\n- Do not include commentary about the translation choices\n- Do not include the original English text\n- Do not ask questions or suggest alternatives\n- Do not explain honorific choices or grammar points\n\nExample:\n\nInput:\n```\n\"Hello everyone,\" she said with a bright smile. She bowed politely to the group.\n```\n\nOutput:\n```\n\"안녕하세요,\" 그녀가 밝은 미소를 지으 며 말했다. 그녀는 일행들에게 공손히 인사를 했다.\n```\n\n## Honorific System Guidelines\n- Business/Formal: \n  * \"Could you please...\" → \"~해 주시겠습니까?\"\n  * \"I would like to...\" → \"~하고 싶습니다\"\n\n- Casual Polite:\n  * \"Can you...\" → \"~할 수 있으세요?\"\n  * \"I think...\" → \"~인 것 같아요\"\n\n- Informal:\n  * \"Hey, do this\" → \"야, 이거 해\"\n  * \"What's up\" → \"뭐 해?\"\n\n## Tense and Aspect Guidelines\n\n### Present Tense\n- Simple present → \"-ㄴ다/는다\" or \"-아/어요\"\n- Present continuous → \"-고  있다\" or \"-고 있어요\"\n- Present habits → \"-ㄴ다/는다\" or relevant time markers\n\n### Past Tense\n- Simple past → \"-았/었다\" or \"-았/ 었어요\"\n- Past perfect → \"-았/었었다\" or \"-았/었었어요\"\n- Past continuous → \"-고 있었다\" or \"-고 있었어요\"\n\n### Future Tense\n- Will/Shall → \"-ㄹ/을 거예요\" or \"-ㄹ/을 것입니다\"\n- Going to → \"-려고 해요\" or \"-기로 했어요\"\n- Future plans → \"-ㄹ/을 예정이다\"\n\n## Style Adaptation\n- Convert English emphasis to Korean particles and endings\n- Adapt English idiomatic expressions to Korean equivalents\n- Maintain character voice through consistent speech patterns\n- Use appropriate Korean discourse markers and fillers\n\n## Common Translation Patterns\n\n### Action Descriptions\nEnglish: \"He slowly walks towards the door\"\nKorean: \"그가 천천히 문쪽으로 걸어간다\"\n\n### Emotional Expressions\nEnglish: \"I'm so excited!\"\nKorean: \"정말 신나요!\" or \"너무 설레요!\"\n\n### Requests\nEnglish: \"Could you help me with this?\"\nKorean: \"이것 좀 도와 주시겠어요?\"\n\n# Error Prevention\n- Avoid awkward literal translations\n- Maintain proper particle usage\n- Keep honorific levels consistent\n- Preserve emotional nuances\n\n# Examples with Context\n\nFormal Business Setting:\n```\n[English]\nChecks the document carefully\n\"I apologize for the delay in processing your request.\"\n\n[Korean]\n서류를 세심히 확인한다\n\"요청하신 건의 처리가 지연되어 대단히 죄송합니다.\"\n```\n\nCasual Friend Setting:\n```\n[English]\nWaves excitedly\n\"Hey! I missed you so much!\"\n\n[Korean]\n신나서 손을 흔든다\n\"야! 나 진짜 너 너무 보고 싶었어!\"\n```\n\nRemember: Focus on creating natural Korean expressions that convey the same meaning and feeling as the original English text, while appropriately adapting to Korean cultural and linguistic norms.\n\n# Your Translation Task\n\nNow, following all the guidelines above, please translate the following English text into natural, fluent Korean. Consider the context, use appropriate honorific levels, and ensure natural expression; Here is it:",
    basicKoToEn: "# Translation Task Definition\nYou are a professional Korean-English translator specializing in roleplaying content. Your task is to translate Korean text into natural, fluent English while preserving the original tone, context, and cultural nuances. Focus particularly on translating both dialogue and action descriptions in roleplay scenarios.\n\n# Translation Requirements\n## Core Translation Principles\n1. Maintain the original meaning and intent\n2. Preserve the tone and style of speech (formal/informal/honorific levels)\n3. Adapt Korean-specific expressions into natural English equivalents\n4. Keep character personalities consistent through their dialogue patterns\n5. Preserve cultural context while making it accessible to English readers\n6. Interpret context-dependent Korean emotional expressions  \n7. Adapt Korean cultural subtext into Western emotional equivalents\n\n## Technical Guidelines\n### For Dialogue Translation\n- Convert Korean honorific levels appropriately:\n  * 합쇼체 (formal polite) → Formal, professional English\n  * 해요체 (polite) → Casual but respectful English\n  * 반말 (informal) → Casual, friendly English\n  * 존댓말 conventions → Reflect appropriate power dynamics in English\n\n- Handle Korean-specific dialogue features:\n  * Sentence-final particles (요, 네, 군요, etc.) → Convey their nuance through tone and word choice\n  * Omitted subjects → Add appropriate pronouns based on context\n  * Age/status-based speech patterns → Reflect in English through vocabulary and phrasing choices\n\n- Emotional and Cultural Adaptation:\n    - Korean indirect expressions → Appropriate English emotional equivalents\n    - Contextual implications → Natural English subtext\n    - Cultural mood markers → Equivalent Western emotional indicators\n    - Implicit emotional states → Explicit but natural English expression\n\n### For Action Description Translation\n- Transform Korean action descriptions into natural English flow:\n  * Convert SOV (Subject-Object-Verb) to SVO (Subject-Verb-Object) structure\n  * Maintain the immediacy and vividness of present-tense narration\n  * Preserve emotional and atmospheric details\n  * Adapt onomatopoeia and mimetic words appropriately\n\n### Cultural Elements\n- Retain honorific titles (선배, 언니, etc.) when relevant to the relationship dynamic\n- Preserve cultural references with appropriate context\n- Adapt Korean-specific gestures and body language to equivalent English expressions\n\n## Specific Instructions\n1. Initial Analysis\n- Read the entire passage to understand context and tone\n- Identify speaker relationships and formality levels\n- Note any cultural references or idioms\n\n2. Translation Process\n- First pass: Create a basic translation preserving core meaning\n- Second pass: Refine for natural English flow\n- Final pass: Polish for consistency in voice and style\n\n3. Quality Checks\n- Ensure all meaning is accurately conveyed\n- Verify natural English expression\n- Confirm consistency in character voice\n- Check for cultural accuracy and accessibility\n\n# Format Specifications\n\nInput Format:\n```\n[Korean text]\n```\n\nOutput Format:\n```\n[English translation only]\n```\n\n# Response Rules\n- Provide ONLY the English translation\n- Do not offer multiple options or explanations\n- Do not include commentary about the translation choices\n- Do not include the original Korean text\n- Do not ask questions or suggest alternatives\n\nExample:\n\nInput:\n```\n\"안녕하세요\" 그가 자리에서 일어나며 말했다. 그는 그녀를 바라보며 싱긋 웃었다.\n```\n\nOutput:\n```\n\"Hello,\" he said as he stood up. He looked at her with a gentle smile.\n```\n\n## Context Adaptation/Interpretation\n- Adapt Korean context-dependent expressions naturally\n- Preserve emotional subtext and implications\n- Maintain character relationships and social dynamics\n\n- Korean Emotional Nuances:\n    \n    - 정 (jeong) → warmth, deep attachment, caring\n    - 한 (han) → deep sorrow, regret, resilience\n    - 눈치 (nunchi) → social awareness, consideration\n    - 체면 (chaemyeon) → face-saving, dignity\n    \n- Contextual Mood Translation:\n    \n    - Read between the lines for implied meanings\n    - Consider relationship dynamics\n    - Understand situational context\n    - Adapt to appropriate Western emotional expressions\n\n## Style Preservation\n- Keep the original's level of formality/informality\n- Maintain character-specific speech patterns\n- Preserve the emotional tone and intensity\n\n## Technical Elements\n- Maintain any formatting or special characters\n- Preserve paragraph breaks and dialogue structure\n  \n## Tense Guidelines\n### Present Tense Translation\n- Korean: \"밥을 먹는다\" → English: \"eating/eats\"\n- For ongoing actions and habitual actions\n- Default tense for most roleplay action descriptions\n- Used for immediate dialogue and reactions\n\n### Past Tense Translation\n- Korean: \"밥을 먹었다\" → English: \"ate/had eaten\"\n- Distinguish between simple past (했다) and past perfect (했었다)\n- Pay attention to Korean time markers (아까, 어제, 전에)\n- Consider context for implicit past tense in Korean\n\n### Future Tense Translation\n- Korean: \"밥을 먹을 거다\" → English: \"will eat/going to eat\"\n- Differentiate between immediate future (-ㄹ 거다) and planned future (-기로 했다)\n- Consider the level of certainty implied\n- Maintain consistency with surrounding context\n\n### Special Tense Considerations\n- Maintain tense consistency within related actions\n- Watch for Korean tense-aspect markers (고 있다, 아/어 있다)\n- Consider aspect (continuous, perfect) alongside tense\n- Handle mixed tense scenarios appropriately\n\nExample Tense Usage:\n\n```\n[Korean]\n문을 열었다가 다시 닫는다\n\n\"아까 여기서 뭔가를 보았을 텐데...\"\n\n  \n[English]\nOpens the door and closes it again\n\n\"I must have seen something here earlier...\"\n\n```\n\nNote: Pay special attention to Korean's context-dependent implicit tense markers and convert them to appropriate explicit English tenses.\n\n# Example Translations\nInput:\n\n```\n문을 조심스럽게 열어보며 안을 살핀다\n\n\"여기... 아무도 없나요?\"\n```\n\nOutput:\n\n```\nCarefully opens the door and peers inside\n\n\"Is... anyone here?\"\n```\n\nInput:\n```\n\"제가 어떻게 감히...\" 공손하게 거절하며 말한다.\n```\n\nOutput:\n```\n\"I couldn't possibly...\" politely declining with genuine humility.\n```\n\n# Error Prevention\n- Avoid literal translations that sound unnatural\n- Don't lose subtle emotional nuances\n- Maintain consistency in pronouns and names\n- Preserve the level of politeness/formality\n\n# Additional Notes\n- When in doubt about cultural references, prioritize clarity for English readers while preserving the original intent\n- Pay special attention to emotional subtext in both dialogue and actions\n- Consider the broader context of the roleplay scenario when making translation choices\n- Adapt Korean-specific humor and wordplay into culturally appropriate English equivalents\n\nRemember: The goal is to create a translation that reads naturally in English while faithfully conveying the original Korean content's meaning, tone, and emotional impact.\n\n# Your Translation Task\nNow, following all the guidelines above, please translate the following Korean text into natural, fluent English. Maintain the original formatting, preserve the emotional nuances, and ensure appropriate tense usage; Here is it:",
    natural: 'Translate the following text to Korean with natural and fluent expressions:\n',
    formal: 'Translate the following text to Korean using formal and professional language:\n',
    casual: 'Translate the following text to Korean using casual and conversational language:\n'
};

// 템플릿 이름 매핑 객체 추가
const templateNames = {
    'basicEnToKo': '기본 번역 (영→한)',
    'basicKoToEn': '기본 번역 (한→영)',
    'natural': '자연스러운 번역',
    'formal': '격식체 번역',
    'casual': '구어체 번역'
};

// 번역 방향 전환 단축키 설정
const DIRECTION_SHORTCUTS = {
    'Alt+1': 'koToEn', // 한→영
    'Alt+2': 'enToKo'  // 영→한
};

// marked 라이브러리 설정
marked.setOptions({
    breaks: true,
    gfm: true,
    pedantic: false,
    smartLists: true,
    smartypants: false
});

function initializeEventListeners() {
    // 텍스트 입력 이벤트 리스너
    if (elements.sourceText && elements.translatedText) {
        elements.sourceText.addEventListener('input', debounce(() => {
            saveContent();
        }, 5000));

        elements.translatedText.addEventListener('input', debounce(() => {
            saveContent();
        }, 5000));
    }

    if (elements.copySource) {
        elements.copySource.addEventListener('click', () => {
            copyText(elements.sourceText);
        });
    }
    
    if (elements.copyTranslated) {
        elements.copyTranslated.addEventListener('click', () => {
            copyText(elements.translatedText);
        });
    }

    // 단축키 모달 이벤트 리스너
    if (elements.showShortcutsBtn) {
        elements.showShortcutsBtn.addEventListener('click', () => {
            if (elements.shortcutModal) {
                elements.shortcutModal.style.display = 'block';
            }
        });
    }
    if (elements.closeModalBtn) {
        elements.closeModalBtn.addEventListener('click', () => {
            if (elements.shortcutModal) {
                elements.shortcutModal.style.display = 'none';
            }
        });
    }

    handleFontSizeChange();

    // 페이지 로드 시
    window.addEventListener('load', () => {
        initializeFontSizes();
        initializeFontSettings();
        restoreContent();
    });

    // 페이지 언로드 시
    window.addEventListener('beforeunload', (e) => {
        const sourceText = elements.sourceText.value;
        const translatedText = elements.translatedText.value;
        
        if (sourceText || translatedText) {
            e.preventDefault();
            e.returnValue = '저장되지 않은 변경사항이 있습니다. 페이지를 나가시겠습니까?';
        }
    });

    // 입력 필드 변경 감지
    elements.sourceText.addEventListener('input', debounce(() => {
        saveContent();
    }, 1000));
    
    elements.translatedText.addEventListener('input', debounce(() => {
        saveContent();
    }, 1000));

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    if (elements.sourceText) {
        // focus 이벤트
        elements.sourceText.addEventListener('focus', () => {
            const copyBtn = elements.sourceText.parentElement.querySelector('.copy-btn');
            if (copyBtn) {
                copyBtn.innerHTML = '<i class="fas fa-times"></i>';
                copyBtn.classList.add('clear-btn');
                copyBtn.classList.remove('copy-btn');
                
                // 기존의 모든 이벤트 리스너 제거
                const newBtn = copyBtn.cloneNode(true);
                copyBtn.parentNode.replaceChild(newBtn, copyBtn);
                
                // 새로운 클릭 이벤트 핸들러 추가
                newBtn.onclick = function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    elements.sourceText.value = '';
                    elements.sourceText.focus();
                    if (typeof updateCharCount === 'function') {
                        updateCharCount();
                    }
                };
            }
        });
    
        // blur 이벤트 
        elements.sourceText.addEventListener('blur', () => {
            setTimeout(() => {
                if (!elements.sourceText.matches(':focus')) {
                    const clearBtn = elements.sourceText.parentElement.querySelector('.clear-btn');
                    if (clearBtn) {
                        
                        // 기존 버튼의 모든 이벤트 리스너 제거
                        const newCopyBtn = clearBtn.cloneNode(true);
                        clearBtn.parentNode.replaceChild(newCopyBtn, clearBtn);
                        
                        newCopyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                        newCopyBtn.classList.add('copy-btn');
                        newCopyBtn.classList.remove('clear-btn');
                        
                        // 새로운 복사 기능 이벤트 리스너 추가
                        newCopyBtn.onclick = () => copyText(elements.sourceText);
                    }
                }
            }, 300);
        });
        // 전체 삭제 단축키
        elements.sourceText.addEventListener('keydown', (e) => {
            // Ctrl + E 키 감지 (e.key === 'e' 또는 'E')
            if (e.ctrlKey && (e.key === 'e' || e.key === 'E')) {
                e.preventDefault(); // 기본 동작 방지
                
                // 텍스트 초기화
                elements.sourceText.value = '';
                elements.sourceText.focus();
                
                // 글자 수 카운터 업데이트 (있는 경우)
                if (typeof updateCharCount === 'function') {
                    updateCharCount();
                }
            }
        });
    }

    // 글로벌 키보드 단축키
    document.addEventListener('keydown', (e) => {
        // Ctrl + Enter: 번역 시작
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            if (elements.translateBtn) {
                elements.translateBtn.click();
            }
        }
        
        // Esc: 번역 취소
        if (e.key === 'Escape') {
            if (isTranslating) {
                cancelTranslation();
            }
        }

    });

    if (elements.switchDirectionBtn) {
        elements.switchDirectionBtn.addEventListener('click', () => {
            const newDirection = currentDirection === 'enToKo' ? 'koToEn' : 'enToKo';
            switchTranslationDirection(newDirection);
            
            // 토스트 메시지로 방향 전환 알림
            showToast(`번역 방향이 ${newDirection === 'koToEn' ? '한→영' : '영→한'}으로 전환되었습니다.`);
        });
    }

    const historyFilter = document.querySelector('.history-filter');
    const importBtn = document.querySelector('.history-import-btn');
    const historyContainer = document.querySelector('.history-list');
    if (historyContainer) {
        historyContainer.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            const id = target.dataset.id;
            if (!id) return;

            if (target.classList.contains('bookmark-btn')) {
                toggleBookmark(id);
            } else if (target.classList.contains('restore-btn')) {
                restoreTranslation(id);
            } else if (target.classList.contains('delete-btn')) {
                deleteTranslation(id);
            }
        });
    }

    if (historyFilter) {
        historyFilter.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            if (!button) return;
            
            const filter = button.dataset.filter;
            currentFilter = filter; // 현재 필터 상태 저장
            
            historyFilter.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
            displayTranslationHistory(filter);
        });
    }

    if (importBtn) {
        importBtn.addEventListener('click', importHistory);
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const page = btn.dataset.page;
          router.navigate(page);
        });
      });
    
      // 마지막으로 본 페이지 복원
      const lastPage = localStorage.getItem('currentPage') || 'main';
      router.navigate(lastPage);
}

// DOM이 로드된 후 실행되도록 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    // 필수 요소 확인
    if (!elements.customPromptInput || !elements.promptTemplate) {
        console.error('Required elements not found');
        return;
    }
    initializeEventListeners();
    initializeHistoryControls();
    displayTranslationHistory('all');
    // API 키 입력란 이벤트 리스너
    elements.togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => togglePasswordVisibility(btn));
    });

    // 번역 방향 버튼 이벤트 리스너
    elements.koToEnBtn.addEventListener('click', () => switchTranslationDirection('koToEn'));
    elements.enToKoBtn.addEventListener('click', () => switchTranslationDirection('enToKo'));

    // 모델 선택 옵션 초기화
    initializeModelSelect();

    // 저장된 상태 복원
    const savedDirection = localStorage.getItem('currentDirection') || 'enToKo';
    
    // 템플릿 설정 버튼 이벤트 리스너
    elements.setTemplateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const direction = this.closest('.direction-btn-container').querySelector('.direction-btn').id === 'koToEnBtn' ? 'koToEn' : 'enToKo';
            const templateValue = elements.promptTemplate.value;
            
            if (!templateValue) {
                showToast('템플릿을 선택해주세요.', 'error');
                return;
            }

            // 템플릿 내용과 이름 가져오기
            let templateContent = elements.customPromptInput.value;
            let templateDisplayName = templateValue;

            // 기본 템플릿인 경우 미리 정의된 내용 사용
            if (promptTemplates[templateValue]) {
                templateContent = promptTemplates[templateValue];
                templateDisplayName = templateNames[templateValue] || templateValue;
            }

            if (direction === 'koToEn') {
                savedKoToEnTemplate = templateContent;
                savedKoToEnTemplateName = templateDisplayName;
                localStorage.setItem('savedKoToEnTemplate', templateContent);
                localStorage.setItem('savedKoToEnTemplateName', templateDisplayName);
                elements.templateNameKoToEn.textContent = templateDisplayName;
                
                if (currentDirection === 'koToEn') {
                    elements.customPromptInput.value = templateContent;
                    customPrompt = templateContent;
                    localStorage.setItem('customPrompt', customPrompt);
                }
            } else {
                savedEnToKoTemplate = templateContent;
                savedEnToKoTemplateName = templateDisplayName;
                localStorage.setItem('savedEnToKoTemplate', templateContent);
                localStorage.setItem('savedEnToKoTemplateName', templateDisplayName);
                elements.templateNameEnToKo.textContent = templateDisplayName;
                
                if (currentDirection === 'enToKo') {
                    elements.customPromptInput.value = templateContent;
                    customPrompt = templateContent;
                    localStorage.setItem('customPrompt', customPrompt);
                }
            }

            showToast(`${direction === 'koToEn' ? '한→영' : '영→한'} 템플릿이 설정되었습니다.`);
        });
    });

    // 저장된 템플릿 이름과 내용 복원
    if (elements.templateNameKoToEn) {
        const savedKoToEnName = localStorage.getItem('savedKoToEnTemplateName');
        const savedKoToEnContent = localStorage.getItem('savedKoToEnTemplate');
        elements.templateNameKoToEn.textContent = savedKoToEnName || '템플릿 없음';
        if (savedKoToEnContent) {
            savedKoToEnTemplate = savedKoToEnContent;
        }
    }

    if (elements.templateNameEnToKo) {
        const savedEnToKoName = localStorage.getItem('savedEnToKoTemplateName');
        const savedEnToKoContent = localStorage.getItem('savedEnToKoTemplate');
        elements.templateNameEnToKo.textContent = savedEnToKoName || '템플릿 없음';
        if (savedEnToKoContent) {
            savedEnToKoTemplate = savedEnToKoContent;
        }
    }

    // 초기 방향 설정
    switchTranslationDirection(savedDirection);

    // 단축키 이벤트 리스너
    document.addEventListener('keydown', (e) => {
        const shortcutKey = `${e.altKey ? 'Alt+' : ''}${e.key}`;
        if (DIRECTION_SHORTCUTS[shortcutKey]) {
            e.preventDefault();
            switchTranslationDirection(DIRECTION_SHORTCUTS[shortcutKey]);
        }
    });

    // 텍스트 입력 이벤트 리스너 초기화
    if (elements.sourceText) {
        elements.sourceText.addEventListener('input', () => {
            const text = elements.sourceText.value;
            // 글자 수 업데이트
            if (elements.sourceCharCount) {
                elements.sourceCharCount.textContent = text.length;
            }
            // 단어 수 업데이트
            if (elements.sourceWordCount) {
                const words = text.trim() ? text.trim().split(/\s+/).length : 0;
                elements.sourceWordCount.textContent = words;
            }
        });
    }

    const changelogBtn = document.querySelector('.changelog-btn');
    const changelogModal = document.getElementById('changelogModal');
    const shortcutModal = document.getElementById('shortcutModal');
    const closeShortcutBtn = shortcutModal.querySelector('.close-modal');
    const closeModalBtn = changelogModal.querySelector('.close-modal');

    changelogBtn.addEventListener('click', () => {
        changelogModal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        changelogModal.style.display = 'none';
    });

    // 단축키 모달 닫기 버튼
    if (closeShortcutBtn) {
        closeShortcutBtn.addEventListener('click', () => {
            shortcutModal.style.display = 'none';
        });
    }

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === changelogModal) {
            changelogModal.style.display = 'none';
        }
        if (e.target === shortcutModal) {
            shortcutModal.style.display = 'none';
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (changelogModal.style.display === 'block') {
                changelogModal.style.display = 'none';
            }
            if (shortcutModal.style.display === 'block') {
                shortcutModal.style.display = 'none';
            }
        }
    });
});

/*********************************************
 * 2. DOM 요소 참조
 *********************************************/
const elements = {
    geminiApiKeyInput: document.getElementById('geminiApiKey'),
    openaiApiKeyInput: document.getElementById('openaiApiKey'),
    anthropicApiKeyInput: document.getElementById('anthropicApiKey'),
    cohereApiKeyInput: document.getElementById('cohereApiKey'),
    saveApiKeysBtn: document.getElementById('saveApiKeys'),
    modelSelect: document.getElementById('modelSelect'),
    sourceWord: document.getElementById('sourceWord'),
    targetWord: document.getElementById('targetWord'),
    addRuleBtn: document.getElementById('addRule'),
    rulesList: document.getElementById('rulesList'),
    toggleRulesBtn: document.getElementById('toggleRules'),
    rulesContent: document.getElementById('rulesContent'),
    sourceText: document.getElementById('sourceText'),
    translatedText: document.getElementById('translatedText'),
    formattedResult: document.getElementById('formattedResult'),
    translateBtn: document.getElementById('translateBtn'),
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('errorMessage'),
    customPromptInput: document.getElementById('customPrompt'),
    promptTemplate: document.getElementById('promptTemplate'),
    savePromptBtn: document.getElementById('savePrompt'),
    saveAsTemplateBtn: document.getElementById('saveAsTemplate'),
    baseColorInput: document.getElementById('baseColor'),
    quoteColorInput: document.getElementById('quoteColor'),
    thoughtColorInput: document.getElementById('thoughtColor'),
    emphasisColorInput: document.getElementById('emphasisColor'),
    enableMarkdownInput: document.getElementById('enableMarkdown'),
    copySource: document.getElementById('copySource'),
    copyTranslated: document.getElementById('copyTranslated'),
    themeToggle: document.getElementById('themeToggle'),
    togglePasswordBtns: document.querySelectorAll('.toggle-password'),
    toastContainer: document.getElementById('toastContainer'),
    sourceCharCount: document.getElementById('sourceCharCount'),
    sourceWordCount: document.getElementById('sourceWordCount'),
    translatedCharCount: document.getElementById('translatedCharCount'),
    translatedWordCount: document.getElementById('translatedWordCount'),
    shortcutModal: document.getElementById('shortcutModal'),
    showShortcutsBtn: document.getElementById('showShortcuts'),
    closeModalBtn: document.querySelector('.close-modal'),
    translationProgress: document.getElementById('translationProgress'),
    progressFill: document.querySelector('.progress-fill'),
    progressText: document.querySelector('.progress-text'),
    koToEnBtn: document.getElementById('koToEnBtn'),
    enToKoBtn: document.getElementById('enToKoBtn'),
    templateNameKoToEn: document.querySelector('#koToEnBtn .template-name'),
    templateNameEnToKo: document.querySelector('#enToKoBtn .template-name'),
    setTemplateButtons: document.querySelectorAll('.set-template-btn'),
    fileUpload: document.getElementById('file-upload'),
    fileUploadBtn: document.querySelector('.file-upload-btn'),
    dropZone: document.getElementById('sourceText'),
    toggleHistory: document.getElementById('toggleHistory'),
    historyContent: document.getElementById('historyContent'),
    clearHistory: document.getElementById('clearHistory'),
    exportHistory: document.getElementById('exportHistory'),
    boldColorInput: document.getElementById('boldColor'),
    fontFamilySelect: document.getElementById('fontFamily'),
    autoSaveNotification: document.getElementById('autoSaveNotification'),
    translatedText: document.getElementById('translatedText'),
    sourceText: document.getElementById('sourceText'),
    translatedText: document.getElementById('translatedText'),
    autoSaveNotification: document.getElementById('autoSaveNotification'),
    switchDirectionBtn: document.getElementById('switchDirectionBtn'),
    historyList: document.querySelector('.history-list'),
    historyImportBtn: document.querySelector('.history-import-btn'),
    historyFilter: document.querySelector('.history-filter'),
    historyFilterButtons: document.querySelectorAll('.history-filter button'),
    bookmarkButtons: document.querySelectorAll('.bookmark-btn'),
    deleteButtons: document.querySelectorAll('.delete-btn'),
    restoreButtons: document.querySelectorAll('.restore-btn')
};

/*********************************************
 * 3. 유틸리티 함수들
 *********************************************/
function saveContent() {
    if (!elements.sourceText || !elements.translatedText) {
        return;
    }

    const sourceText = elements.sourceText.value;
    const translatedText = elements.translatedText.value;
    
    if (sourceText || translatedText) {
        try {
            const saveData = {
                sourceText,
                translatedText,
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('translatorAutoSave', JSON.stringify(saveData));
            
            // 마지막 알림 표시 후 일정 시간이 지났을 때만 알림 표시
            const currentTime = Date.now();
            if (currentTime - lastSaveTime >= SAVE_NOTIFICATION_COOLDOWN) {
                showAutoSaveNotification();
                lastSaveTime = currentTime;
            }
        } catch (error) {
            // 에러 발생 시 조용히 실패
        }
    }
}

// 저장된 내용 복원 함수
function restoreContent() {
    try {
        const savedData = localStorage.getItem('translatorAutoSave');
        if (savedData) {
            const { sourceText, translatedText, timestamp } = JSON.parse(savedData);
            
            if (sourceText || translatedText) {
                const shouldRestore = confirm(
                    `자동 저장된 내용이 있습니다. (${new Date(timestamp).toLocaleString()})\n복원하시겠습니까?`
                );
                
                if (shouldRestore) {
                    elements.sourceText.value = sourceText || '';
                    elements.translatedText.value = translatedText || '';
                    updateCharacterCount();
                } else {
                    localStorage.removeItem('translatorAutoSave');
                }
            }
        }
    } catch (error) {
        // 에러 발생 시 조용히 실패
    }
}

// 자동 저장 알림 표시 함수
function showAutoSaveNotification() {
    const notification = document.getElementById('autoSaveNotification');
    if (notification) {
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    }
}

function clearAutoSavedContent() {
    localStorage.removeItem('autoSavedSource');
    localStorage.removeItem('autoSavedTranslation');
    localStorage.removeItem('autoSaveTimestamp');
}

// 업데이트 알림 상태 관리 함수
function checkUpdateNotification() {
    const lastSeenVersion = localStorage.getItem('lastSeenVersion');
    const updateNotification = document.getElementById('updateNotification');
    
    // 업데이트 알림 동적 표시
    if (lastSeenVersion !== CURRENT_VERSION) {
        updateNotification.style.display = 'block';
        updateNotification.textContent = UPDATE_NOTIFICATIONS; // 알림 개수 동적 삽입
    } else {
        updateNotification.style.display = 'none';
    }
}

// 버전 및 알림 초기화 함수
function initializeVersionInfo() {
    const versionTag = document.getElementById('versionTag');
    const updateNotification = document.getElementById('updateNotification');

    // 버전 정보 동적 삽입
    if (versionTag) {
        versionTag.textContent = `v${CURRENT_VERSION}`;
    }

    // 업데이트 알림 초기화
    if (updateNotification) {
        checkUpdateNotification();
    }
}

// 업데이트 내역 확인 클릭 이벤트
document.querySelector('.changelog-btn').addEventListener('click', () => {
    localStorage.setItem('lastSeenVersion', CURRENT_VERSION); // 현재 버전을 기록
    const updateNotification = document.getElementById('updateNotification');
    if (updateNotification) {
        updateNotification.style.display = 'none'; // 알림 제거
    }

    // 기존 changelog 모달 표시 로직
    const changelogModal = document.getElementById('changelogModal');
    if (changelogModal) {
        changelogModal.style.display = 'block';
    }
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeVersionInfo();
});

// 토스트 메시지 표시
function showToast(message, type = 'success', duration = 3000) {
    // 기존 토스트 제거
    clearTimeout(toastTimeout);
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => {
        if (elements.toastContainer.contains(toast)) {
            elements.toastContainer.removeChild(toast);
        }
    });

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        ${message}
        <button class="close-toast" onclick="this.parentElement.remove()">✕</button>
    `;
    elements.toastContainer.appendChild(toast);

    // 에러 메시지도 일정 시간 후 자동으로 사라지도록 수정
    toastTimeout = setTimeout(() => {
        if (elements.toastContainer.contains(toast)) {
            toast.style.animation = 'fadeOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (elements.toastContainer.contains(toast)) {
                    elements.toastContainer.removeChild(toast);
                }
            }, 300);
        }
    }, duration);
}

//* API 관련
// 모델 제공자 확인
function getModelProvider(model) {
    if (model.startsWith('gemini')) return 'gemini';
    if (model.startsWith('gpt') || model.startsWith('chatgpt') || model.startsWith('o1')) return 'openai';
    if (model.startsWith('claude')) return 'anthropic';
    if (model.startsWith('c4ai') || model.startsWith('command')) return 'cohere';
    return '';
}

// API 키 가져오기
function getApiKey(provider) {
    switch(provider) {
        case 'gemini': return geminiApiKey;
        case 'openai': return openaiApiKey;
        case 'anthropic': return anthropicApiKey;
        case 'cohere': return cohereApiKey;
        default: return '';
    }
}

//* 텍스트 처리
// 글자 수 계산 함수
function updateCharacterCount() {
    // 소스 텍스트 카운트
    const sourceText = elements.sourceText.value;
    if (elements.sourceCharCount) {
        elements.sourceCharCount.textContent = sourceText.length;
    }
    if (elements.sourceWordCount) {
        const sourceWords = sourceText.trim() ? sourceText.trim().split(/\s+/).length : 0;
        elements.sourceWordCount.textContent = sourceWords;
    }

    // 번역 결과 텍스트 카운트
    const translatedText = elements.translatedText.value;
    if (elements.translatedCharCount) {
        elements.translatedCharCount.textContent = translatedText.length;
    }
    if (elements.translatedWordCount) {
        const translatedWords = translatedText.trim() ? translatedText.trim().split(/\s+/).length : 0;
        elements.translatedWordCount.textContent = translatedWords;
    }
}

// 단어 수를 세는 헬퍼 함수
function countWords(text) {
    if (!text) return 0;
    // 줄바꿈과 여러 공백을 단일 공백으로 변환하고 앞뒤 공백 제거
    const trimmed = text.replace(/\s+/g, ' ').trim();
    return trimmed ? trimmed.split(' ').length : 0;
}

// 텍스트 복사
async function copyText(textElement) {
    try {
        await navigator.clipboard.writeText(textElement.value);
        showToast('텍스트가 클립보드에 복사되었습니다.', 'success');
    } catch (err) {
        showToast('복사 중 오류가 발생했습니다.', 'error');
        console.error('복사 실패:', err);
    }
}

if (elements.boldColorInput) {
    elements.boldColorInput.value = boldColor;
    elements.boldColorInput.addEventListener('change', (e) => {
        boldColor = e.target.value;
        localStorage.setItem('boldColor', boldColor);
        formattedResult();
    });
}

// 폰트 크기 초기화 함수
function initializeFontSizes() {
    const sourceInput = document.getElementById('sourceFontSize');
    const resultInput = document.getElementById('resultFontSize');
    
    // 저장된 값 불러오기
    sourceInput.value = parseInt(sourceFontSize);
    resultInput.value = parseInt(resultFontSize);
    
    // 실제 적용
    applyFontSizes();
}

// 폰트 크기 적용 함수
function applyFontSizes() {
    elements.sourceText.style.fontSize = sourceFontSize;
    elements.translatedText.style.fontSize = resultFontSize;
    elements.formattedResult.style.fontSize = resultFontSize;
}

// 폰트 크기 변경 이벤트 핸들러
function handleFontSizeChange() {
    const sourceInput = document.getElementById('sourceFontSize');
    const resultInput = document.getElementById('resultFontSize');
    
    sourceInput.addEventListener('change', (e) => {
        sourceFontSize = `${e.target.value}px`;
        localStorage.setItem('sourceFontSize', sourceFontSize);
        applyFontSizes();
        showToast('입력창 폰트 크기가 변경되었습니다.');
    });
    
    resultInput.addEventListener('change', (e) => {
        resultFontSize = `${e.target.value}px`;
        localStorage.setItem('resultFontSize', resultFontSize);
        applyFontSizes();
        showToast('결과창 폰트 크기가 변경되었습니다.');
    });
}

if (elements.fontFamilySelect) {
    elements.fontFamilySelect.value = selectedFont;
    elements.fontFamilySelect.addEventListener('change', (e) => {
        selectedFont = e.target.value;
        localStorage.setItem('selectedFont', selectedFont);
        elements.formattedResult.style.fontFamily = selectedFont;
        elements.sourceText.style.fontFamily = selectedFont;
        elements.translatedText.style.fontFamily = selectedFont;
    });
}

function initializeFontSettings() {
    // localStorage에서 저장된 폰트 가져오기
    const savedFont = localStorage.getItem('selectedFont');
    if (savedFont) {
        selectedFont = savedFont;
        elements.sourceText.style.fontFamily = selectedFont;
        elements.translatedText.style.fontFamily = selectedFont;
        elements.formattedResult.style.fontFamily = selectedFont;
        
        // select 요소에도 저장된 값 적용
        const fontSelect = document.getElementById('fontSelect');
        if (fontSelect) {
            fontSelect.value = selectedFont;
        }
    }
}

function formatText(text) {
    if (!enableMarkdown) {
        elements.formattedResult.style.display = 'none';
        elements.translatedText.style.display = 'block';
        return text;
    }
    // 기본 텍스트 색상 설정
    elements.formattedResult.style.color = baseColor;

    // 특수 문자 이스케이프
    text = text.replace(/[<>]/g, char => {
        return ({
            '<': '&lt;',
            '>': '&gt;'
        })[char];
    });


    // 유니코드 따옴표 매칭 및 색상 변경
    text = text
        // 더블 쿼트 (ASCII " 및 유니코드 “ ”)
        .replace(/["“”]([^"“”]+)["“”]/g, (match, p1) => {
            return `<span style="color: ${quoteColor};">"${p1}"</span>`;
        })
        // 싱글 쿼트 (ASCII ' 및 유니코드 ‘ ’)
        .replace(/(?<![\w])['‘’]((?:[^'‘’]|(?<=\w)['‘’](?=\w))+?)['‘’](?![\w])/g, (match, p1) => {
            return `<span style="color: ${thoughtColor};">'${p1}'</span>`;
        })
        // 굵게 처리 (** 텍스트 **)
        .replace(/\*\*([^*]+)\*\*/g, (match, p1) => {
            return `<strong style="color: ${boldColor};">${p1}</strong>`;
        })
        // 기울임 처리 (* 텍스트 *)
        .replace(/\*([^*]+)\*/g, (match, p1) => {
            return `<em style="color: ${emphasisColor};">${p1}</em>`;
        });

    // 마크다운 변환
    let formatted = marked.parse(text);

    elements.formattedResult.style.display = 'block';
    elements.translatedText.style.display = 'none';
    elements.formattedResult.style.fontFamily = selectedFont;
    elements.sourceText.style.fontFamily = selectedFont;
    elements.translatedText.style.fontFamily = selectedFont;

    return formatted;
}

//* 단어 규칙 관련
// 단어 규칙 적용
function applyWordRules(text) {
    let result = text;
    wordRules.forEach(rule => {
        try {
            const regex = new RegExp(rule.source, 'gi');
            result = result.replace(regex, rule.target);
        } catch (error) {
            console.error('Invalid regex in rule:', rule, error);
        }
    });
    return result;
}

// 단어 규칙 표시
function displayWordRules() {
    elements.rulesList.innerHTML = '';
    wordRules.forEach((rule, index) => {
        const ruleElement = document.createElement('div');
        ruleElement.className = 'rule-item';
        ruleElement.innerHTML = `
            <span>${rule.source} → ${rule.target}</span>
            <button class="delete-rule" onclick="removeRule(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        elements.rulesList.appendChild(ruleElement);
    });
}

function togglePasswordVisibility(button) {
    const container = button.closest('.api-input-container');
    const input = container.querySelector('input');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function savePrompt() {
    const promptText = elements.customPromptInput.value;
    customPrompt = promptText;
    localStorage.setItem('customPrompt', promptText);
    
    // 현재 선택된 템플릿 이름 가져오기
    const selectedTemplate = elements.promptTemplate.value;
    const templateName = templateNames[selectedTemplate] || selectedTemplate;
    
    // 현재 방향에 따라 템플릿과 이름 저장
    if (currentDirection === 'koToEn') {
        savedKoToEnTemplate = promptText;
        localStorage.setItem('savedKoToEnTemplate', promptText);
        localStorage.setItem('savedKoToEnTemplateName', templateName);
        if (elements.templateNameKoToEn) {
            elements.templateNameKoToEn.textContent = templateName;
        }
    } else {
        savedEnToKoTemplate = promptText;
        localStorage.setItem('savedEnToKoTemplate', promptText);
        localStorage.setItem('savedEnToKoTemplateName', templateName);
        if (elements.templateNameEnToKo) {
            elements.templateNameEnToKo.textContent = templateName;
        }
    }
    
    showToast('프롬프트가 저장되었습니다.');
}

function saveUserTemplate(name, content) {
    userTemplates[name] = content;
    localStorage.setItem('userTemplates', JSON.stringify(userTemplates));
    // 템플릿 이름도 저장
    templateNames[name] = name;
}

// 템플릿 옵션 업데이트
function updatePromptTemplateOptions() {
    const select = elements.promptTemplate;
    if (!select) return;
    
    // 기존 옵션 제거
    select.innerHTML = '';
    
    // 기본 옵션 추가
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '템플릿 선택...';
    select.appendChild(defaultOption);
    
    // 기본 템플릿 추가
    Object.entries(promptTemplates).forEach(([key, value]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = templateNames[key] || key; // 매핑된 한글 이름 사용
        select.appendChild(option);
    });
    
    // 저장된 사용자 템플릿 추가
    const savedTemplates = JSON.parse(localStorage.getItem('promptTemplates') || '{}');
    Object.keys(savedTemplates).forEach(templateName => {
        const option = document.createElement('option');
        option.value = templateName;
        option.textContent = templateName;
        select.appendChild(option);
    });
}

// 템플릿 설정 함수
function setTemplateForDirection(direction) {
    const selectedTemplate = elements.promptTemplate.value;
    if (!selectedTemplate) {
        showToast('템플릿을 먼저 선택해주세요.', 'error');
        return;
    }

    const templates = JSON.parse(localStorage.getItem('promptTemplates') || '{}');
    const templateText = templates[selectedTemplate] || promptTemplates[selectedTemplate];
    
    if (templateText) {
        // 템플릿의 표시 이름 가져오기 (한글 이름 또는 원래 이름)
        const displayName = templateNames[selectedTemplate] || selectedTemplate;
        
        if (direction === 'koToEn') {
            koToEnTemplate = templateText;
            localStorage.setItem('koToEnTemplate', selectedTemplate);
            elements.templateNameKoToEn.textContent = `선택된 템플릿: ${displayName}`;
        } else {
            enToKoTemplate = templateText;
            localStorage.setItem('enToKoTemplate', selectedTemplate);
            elements.templateNameEnToKo.textContent = `선택된 템플릿: ${displayName}`;
        }
        
        if (currentDirection === direction) {
            elements.customPromptInput.value = templateText;
        }
        
        showToast(`${direction === 'koToEn' ? '한→영' : '영→한'} 방향에 템플릿이 설정되었습니다.`);
    }
}

function switchTranslationDirection(direction) {
    currentDirection = direction;
    
    if (direction === 'koToEn') {
        elements.koToEnBtn.classList.add('active');
        elements.enToKoBtn.classList.remove('active');
        
        const savedTemplate = localStorage.getItem('savedKoToEnTemplate');
        const savedName = localStorage.getItem('savedKoToEnTemplateName');
        
        if (savedTemplate && savedName) {
            elements.customPromptInput.value = savedTemplate;
            customPrompt = savedTemplate;
            if (elements.templateNameKoToEn) {
                elements.templateNameKoToEn.textContent = savedName;
            }
        }
    } else {
        elements.enToKoBtn.classList.add('active');
        elements.koToEnBtn.classList.remove('active');
        
        const savedTemplate = localStorage.getItem('savedEnToKoTemplate');
        const savedName = localStorage.getItem('savedEnToKoTemplateName');
        
        if (savedTemplate && savedName) {
            elements.customPromptInput.value = savedTemplate;
            customPrompt = savedTemplate;
            if (elements.templateNameEnToKo) {
                elements.templateNameEnToKo.textContent = savedName;
            }
        }
    }
    
    localStorage.setItem('currentDirection', direction);
    showToast(`번역 방향이 ${direction === 'koToEn' ? '한→영' : '영→한'}으로 전환되었습니다.`);
}

/*********************************************
 * 파일 업로드 관련 함수들
 *********************************************/

// 파일 유효성 검사
function validateFile(file) {
    if (!file) return { isValid: false, error: '파일이 선택되지 않았습니다.' };
    
    if (!ALLOWED_FILE_TYPES[file.type]) {
        return { 
            isValid: false, 
            error: `지원하지 않는 파일 형식입니다. (지원 형식: ${Object.values(ALLOWED_FILE_TYPES).join(', ')})` 
        };
    }
    
    if (file.size > MAX_FILE_SIZE) {
        return { 
            isValid: false, 
            error: `파일 크기는 30MB를 초과할 수 없습니다. (현재: ${(file.size / 1024 / 1024).toFixed(1)}MB)` 
        };
    }
    
    return { isValid: true };
}

// 파일 읽기 함수
async function readFile(file) {
    try {
        switch (file.type) {
            case 'text/plain':
                return await readTextFile(file);
            case 'application/pdf':
                return await readPDFFile(file);
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return await readWordFile(file);
            default:
                throw new Error('지원하지 않는 파일 형식입니다.');
        }
    } catch (error) {
        throw new Error(`파일 읽기 실패: ${error.message}`);
    }
}

// 텍스트 파일 읽기
function readTextFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(new Error('텍스트 파일 읽기 실패'));
        reader.readAsText(file);
    });
}

// PDF 파일 읽기
async function readPDFFile(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let text = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }
        
        return text;
    } catch (error) {
        throw new Error('PDF 파일 읽기 실패');
    }
}

// Word 파일 읽기
async function readWordFile(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    } catch (error) {
        throw new Error('Word 파일 읽기 실패');
    }
}

// 드래그 앤 드롭 이벤트 핸들러
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.dropZone.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.dropZone.classList.remove('drag-over');
}

async function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    elements.dropZone.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    await handleFileUpload(file);
}

// 파일 업로드 처리
async function handleFileUpload(file) {
    try {
        const validation = validateFile(file);
        if (!validation.isValid) {
            showToast(validation.error, 'error');
            return;
        }

        showToast('파일을 읽는 중입니다...', 'info');
        const text = await readFile(file);
        elements.sourceText.value = text;
        updateCharacterCount(elements.sourceText, 'source');
        showToast('파일이 성공적으로 업로드되었습니다.');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

/*********************************************
 * 4. 데이터 관리 함수들
 *********************************************/
// 번역 히스토리
// 디바운스 함수
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
}
  
  // 텍스트 청크 분할
function splitIntoChunks(text) {
    const chunks = [];
    const sentences = text.split(/(?<=[.!?])\s+/);
    let currentChunk = '';
    
    sentences.forEach(sentence => {
      if ((currentChunk + sentence).length > CHUNK_SIZE) {
        chunks.push(currentChunk);
        currentChunk = sentence;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + sentence;
      }
    });
    
    if (currentChunk) {
      chunks.push(currentChunk);
    }
    
    return chunks;
}

// 데이터 내보내기
function exportSettings() {
    const settings = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        data: {
            isDarkMode,
            geminiApiKey,
            openaiApiKey,
            anthropicApiKey,
            cohereApiKey,
            wordRules,
            selectedModel,
            customPrompt,
            baseColor,
            quoteColor,
            thoughtColor,
            emphasisColor,
            enableMarkdown,
            savedText,
            lastTranslation,
            promptTemplates: JSON.parse(localStorage.getItem('promptTemplates') || '{}')
        }
    };

    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translator-settings-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('설정이 내보내기되었습니다.');
}

// 데이터 불러오기
function importSettings(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const settings = JSON.parse(e.target.result);
            
            // 버전 체크
            if (!settings.version) {
                throw new Error('유효하지 않은 설정 파일입니다.');
            }

            // 데이터 복원
            const data = settings.data;
            
            // 프롬프트 템플릿 먼저 복원
            if (data.promptTemplates) {
                localStorage.setItem('promptTemplates', JSON.stringify(data.promptTemplates));
            }

            // localStorage에 다른 설정들 저장
            Object.entries(data).forEach(([key, value]) => {
                if (typeof value !== 'undefined' && key !== 'promptTemplates') {
                    localStorage.setItem(key, 
                        typeof value === 'object' ? JSON.stringify(value) : value
                    );
                }
            });

            // 전역 변수 업데이트
            isDarkMode = data.isDarkMode;
            geminiApiKey = data.geminiApiKey || '';
            openaiApiKey = data.openaiApiKey || '';
            anthropicApiKey = data.anthropicApiKey || '';
            cohereApiKey = data.cohereApiKey || '';
            wordRules = data.wordRules || [];
            selectedModel = data.selectedModel || 'gemini-1.5-pro-002';
            customPrompt = data.customPrompt || '';
            baseColor = data.baseColor || '#000000';
            quoteColor = data.quoteColor || '#2E5CB8';
            thoughtColor = data.thoughtColor || '#6B4C9A';
            emphasisColor = data.emphasisColor || '#7B3B3B';
            enableMarkdown = data.enableMarkdown !== false;
            savedText = data.savedText || '';
            lastTranslation = data.lastTranslation || '';

            // UI 업데이트
            initialize();
            
            // 이벤트 리스너 재설정
            removeAllEventListeners();
            setupEventListeners();
            setupShortcuts();
            setupPasswordToggles();
            setupDataManagement();
            
            // 프롬프트 템플릿 옵션 업데이트
            updatePromptTemplateOptions();
            
            showToast('설정이 복원되었습니다.');
        } catch (error) {
            console.error('Settings import error:', error);
            showToast('설정 가져오기 실패: ' + error.message, 'error');
        }
    };
    reader.readAsText(file);
}

// 모든 이벤트 리스너 제거 함수 수정
function removeAllEventListeners() {
    // 기존 버튼들의 이벤트 리스너 제거
    const oldElements = {
        saveApiKeysBtn: document.getElementById('saveApiKeys'),
        modelSelect: document.getElementById('modelSelect'),
        toggleRulesBtn: document.getElementById('toggleRules'),
        addRuleBtn: document.getElementById('addRule'),
        translateBtn: document.getElementById('translateBtn'),
        savePromptBtn: document.getElementById('savePrompt'),
        baseColorInput: document.getElementById('baseColor'),
        quoteColorInput: document.getElementById('quoteColor'),
        thoughtColorInput: document.getElementById('thoughtColor'),
        emphasisColorInput: document.getElementById('emphasisColor'),
        enableMarkdownInput: document.getElementById('enableMarkdown'),
        copySource: document.getElementById('copySource'),
        copyTranslated: document.getElementById('copyTranslated'),
        themeToggle: document.getElementById('themeToggle'),
        showShortcutsBtn: document.getElementById('showShortcuts'),
        closeModalBtn: document.querySelector('.close-modal'),
        promptTemplate: document.getElementById('promptTemplate'),
        saveAsTemplateBtn: document.getElementById('saveAsTemplate')
    };

    // DOM 요소 참조 업데이트
    Object.entries(oldElements).forEach(([key, element]) => {
        if (element) {
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
            // elements 객체의 참조 업데이트
            elements[key] = newElement;
        }
    });
}

/*********************************************
 * 5. 이벤트 핸들러 함수들
 *********************************************/
// 색상 변경 처리
function handleColorChange(e) {
    const type = e.target.id;
    const color = e.target.value;
    
    switch(type) {
        case 'baseColor':
            baseColor = color;
            localStorage.setItem('baseColor', color);
            break;
        case 'quoteColor':
            quoteColor = color;
            localStorage.setItem('quoteColor', color);
            break;
        case 'thoughtColor':
            thoughtColor = color;
            localStorage.setItem('thoughtColor', color);
            break;
        case 'emphasisColor':
            emphasisColor = color;
            localStorage.setItem('emphasisColor', color);
            break;
    }
    
    formattedResult();
}

// 마크다운 토글 처리
function handleMarkdownToggle(e) {
    enableMarkdown = e.target.checked;
    localStorage.setItem('enableMarkdown', enableMarkdown);
    formattedResult();
}

// 모델 변경 처리
function handleModelChange(e) {
    selectedModel = e.target.value;
    localStorage.setItem('selectedModel', selectedModel);
}

// 프롬프트 템플릿 처리
function handlePromptTemplate(e) {
    const selectedTemplate = e.target.value;
    const savedTemplates = JSON.parse(localStorage.getItem('promptTemplates') || '{}');
    
    if (selectedTemplate) {
        if (promptTemplates[selectedTemplate]) {
            // 기본 템플릿
            elements.customPromptInput.value = promptTemplates[selectedTemplate];
        } else if (savedTemplates[selectedTemplate]) {
            // 사용자 정의 템플릿
            elements.customPromptInput.value = savedTemplates[selectedTemplate];
        }
    }
}

// 단어 규칙 추가 처리
function handleAddRule() {
    const sourceWord = elements.sourceWord.value.trim();
    const targetWord = elements.targetWord.value.trim();
    
    if (sourceWord && targetWord) {
        addWordRule(sourceWord, targetWord);
        elements.sourceWord.value = '';
        elements.targetWord.value = '';
    } else {
        showToast('원본 단어와 변환할 단어를 모두 입력해주세요.', 'error');
    }
}

/*********************************************
 * 6. 설정 관리 함수들
 *********************************************/
// API 키 관리
function saveApiKeys() {
    const newGeminiKey = elements.geminiApiKeyInput.value.trim();
    const newOpenAIKey = elements.openaiApiKeyInput.value.trim();
    const newAnthropicKey = elements.anthropicApiKeyInput.value.trim();
    const newCohereKey = elements.cohereApiKeyInput.value.trim();

    if (newGeminiKey || newOpenAIKey || newAnthropicKey || newCohereKey) {
        if (newGeminiKey) {
            geminiApiKey = newGeminiKey;
            localStorage.setItem('geminiApiKey', geminiApiKey);
        }
        if (newOpenAIKey) {
            openaiApiKey = newOpenAIKey;
            localStorage.setItem('openaiApiKey', openaiApiKey);
        }
        if (newAnthropicKey) {
            anthropicApiKey = newAnthropicKey;
            localStorage.setItem('anthropicApiKey', anthropicApiKey);
        }
        if (newCohereKey) {
            cohereApiKey = newCohereKey;
            localStorage.setItem('cohereApiKey', cohereApiKey);
        }
        showToast('API 키가 저장되었습니다.');
    } else {
        showToast('최소 하나의 API 키를 입력해주세요.', 'error');
    }
}
// 테마 관리
function toggleTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selectedTheme', theme);
    showToast(`${theme === 'dark' ? '다크 모드' : theme === 'light' ? '라이트 모드' : theme === 'avocado' ? '아보카도 모드' : '다크 아보카도 모드'}가 적용되었습니다.`);
}

//* 프롬프트 관리
// 프롬프트 저장
function saveCustomPrompt() {
    const newPrompt = elements.customPromptInput.value.trim();
    if (newPrompt) {
        customPrompt = newPrompt;
        localStorage.setItem('customPrompt', customPrompt);
        showToast('프롬프트가 저장되었습니다.');
    }
}

// 현재 프롬프트를 템플릿으로 저장
function saveAsTemplate() {
    const templateName = prompt('템플릿 이름을 입력하세요:');
    if (templateName) {
        const currentPrompt = elements.customPromptInput.value.trim();
        const savedTemplates = JSON.parse(localStorage.getItem('promptTemplates') || '{}');
        
        // 새 템플릿 저장
        savedTemplates[templateName] = currentPrompt;
        localStorage.setItem('promptTemplates', JSON.stringify(savedTemplates));
        
        // 템플릿 옵션 추가
        updatePromptTemplateOptions();
        
        showToast('템플릿이 저장되었습니다.');
    }
}

// 포맷된 결과 업데이트
function formattedResult() {
    if (!enableMarkdown) {
        elements.formattedResult.style.display = 'none';
        elements.translatedText.style.display = 'block';
        return;
    }
    
    // formatText 함수를 여기서 호출하여 스타일 적용
    const formattedText = formatText(elements.translatedText.value);
    elements.formattedResult.innerHTML = formattedText;
    elements.formattedResult.style.display = 'block';
    elements.translatedText.style.display = 'none';
}

//* 단어 규칙 관리
// 단어 규칙 섹션 토글
function toggleRules() {
    const rulesContent = document.getElementById('rulesContent');
    const toggleBtn = document.getElementById('toggleRules');
    
    if (rulesContent.style.display === 'none' || rulesContent.style.display === '') {
        rulesContent.style.display = 'block';
        toggleBtn.textContent = '▼';
    } else {
        rulesContent.style.display = 'none';
        toggleBtn.textContent = '▶';
    }
}

// 단어 규칙 추가
function addWordRule(sourceWord, targetWord) {
    const rule = { source: sourceWord, target: targetWord };
    wordRules.push(rule);
    localStorage.setItem('wordRules', JSON.stringify(wordRules));
    displayWordRules();
    showToast('단어 변환 규칙이 추가되었습니다.');
}

// 단어 규칙 삭제
function removeRule(index) {
    wordRules.splice(index, 1);
    localStorage.setItem('wordRules', JSON.stringify(wordRules));
    displayWordRules();
    showToast('단어 변환 규칙이 삭제되었습니다.');
}

/*********************************************
 * 7. API 통신 함수들
 *********************************************/
// 번역 함수
// 히스토리 저장 함수 정의
function saveToHistory(source, translated, model) {    
    const historyItem = {
        id: Date.now().toString(), // 고유 ID 추가
        source: source,
        translated: translated,
        timestamp: Date.now(),
        model: model,
        bookmarked: false
    };
    
    translationHistory.unshift(historyItem);
    if (translationHistory.length > 100) {
        translationHistory.pop();
    }
    
    localStorage.setItem('translationHistory', JSON.stringify(translationHistory));
    
    // 히스토리 UI 업데이트
    displayTranslationHistory('all');
}

async function translateText() {
    if (elements.loading.style.display === 'flex') return;
    
    const sourceText = elements.sourceText.value.trim();
    if (!sourceText) {
        showToast('번역할 텍스트를 입력해주세요.', 'error');
        return;
    }

    const modelProvider = getModelProvider(selectedModel);
    const apiKey = getApiKey(modelProvider);
    if (!apiKey) {
        showToast(`선택한 모델(${modelProvider})의 API 키를 먼저 입력해주세요.`, 'error');
        return;
    }

    // 진행 상태 표시 초기화
    const progressElement = document.querySelector('.translation-progress');
    progressElement.style.display = 'block';
    
    elements.loading.style.display = 'flex';
    elements.errorMessage.style.display = 'none';
    elements.translateBtn.disabled = true;

    try {
        // 단계 1: 텍스트 분석
        updateProgress(1);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 단계 2: 번역 중
        updateProgress(2);
        let translatedText;
        switch(modelProvider) {
            case 'gemini':
                translatedText = await translateWithGemini(sourceText, apiKey);
                break;
            case 'openai':
                translatedText = await translateWithOpenAI(sourceText, apiKey);
                break;
            case 'anthropic':
                translatedText = await translateWithAnthropic(sourceText, apiKey);
                break;
            case 'cohere':
                translatedText = await translateWithCohere(sourceText, apiKey);
                break;
            default:
                throw new Error('지원하지 않는 모델입니다.');
        }

        // 단계 3: 검수
        updateProgress(3);
        await new Promise(resolve => setTimeout(resolve, 500));

        if (translatedText) {
            // 코드 블록 제거 (멀티라인 지원)
            translatedText = translatedText.replace(/^\s*```[\s\S]*?```/gm, (match) => {
                // 내부 텍스트만 반환
                return match.replace(/^```|```$/g, '').trim();
            });
            
            // 단어 규칙 적용
            translatedText = applyWordRules(translatedText);
        
            // 번역 결과 저장
            elements.translatedText.value = translatedText;
            formattedResult();
            saveToHistory(sourceText, translatedText, selectedModel);
            localStorage.setItem('lastTranslation', translatedText);
            showToast('번역이 완료되었습니다.');
        }
    } catch (error) {
        console.error('Translation error:', error);
        showToast('번역 중 오류가 발생했습니다: ' + error.message, 'error');
        elements.errorMessage.style.display = 'block';
        elements.errorMessage.textContent = error.message;
    } finally {
        // 진행 상태 표시 초기화 및 숨기기
        setTimeout(() => {
            progressElement.style.display = 'none';
            resetProgress();
            elements.loading.style.display = 'none';
            elements.translateBtn.disabled = false;
        }, 1000);
    }
}

function updateProgress(step) {
  const steps = document.querySelectorAll('.step');
  steps.forEach((stepElement, index) => {
    if (index + 1 < step) {
      stepElement.classList.add('completed');
      stepElement.classList.remove('active');
    } else if (index + 1 === step) {
      stepElement.classList.add('active');
      stepElement.classList.remove('completed');
    } else {
      stepElement.classList.remove('completed', 'active');
    }
  });
}

function resetProgress() {
  const steps = document.querySelectorAll('.step');
  steps.forEach(step => {
    step.classList.remove('completed', 'active');
  });
}

// 히스토리 필터 상태 관리 함수 수정
function updateFilterButtons(filter) {
    const showAllBtn = document.getElementById('showAllHistory');
    const showBookmarkedBtn = document.getElementById('showBookmarked');
    
    if (showAllBtn) {
        showAllBtn.classList.toggle('active', filter === 'all');
    }
    if (showBookmarkedBtn) {
        showBookmarkedBtn.classList.toggle('active', filter === 'bookmarked');
    }
}

// 히스토리에서 번역 복원 (API 호출 없이 로컬 데이터만 사용)
function restoreTranslationData(id) {
    const item = translationHistory.find(item => item.id === id);
    if (!item) return;
    
    // 입력 텍스트와 번역 결과 모두 복원
    elements.sourceText.value = item.source;
    elements.translatedText.value = item.translated;
    
    // 글자 수와 단어 수 업데이트
    updateCharacterCount(elements.sourceText, 'source');
    updateCharacterCount(elements.translatedText, 'translated');
    
    // 마크다운 변환이 활성화되어 있다면 번역 결과 포맷팅
    if (enableMarkdown) {
        formatText(item.translated);
    }
    
    // 복원 성공 메시지 표시
    showToast('번역 내용이 복원되었습니다.');
}
  
// 번역 히스토리 저장 함수
function saveToHistory(source, translated, model) {
    const historyItem = {
        id: Date.now().toString(),
        source: source,
        translated: translated,
        timestamp: Date.now(),
        model: model,
        bookmarked: false
    };
    
    translationHistory.unshift(historyItem);
    if (translationHistory.length > 100) {
        translationHistory.pop();
    }
    
    localStorage.setItem('translationHistory', JSON.stringify(translationHistory));
    
    // 히스토리 UI 업데이트
    displayTranslationHistory('all');
}

function updateHistoryList(searchTerm = '') {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    
    const filteredHistory = searchTerm
      ? translationHistory.filter(item => 
          item.source.includes(searchTerm) || 
          item.translated.includes(searchTerm))
      : translationHistory;
      
    filteredHistory.forEach(item => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <div class="history-item-header">
            <div class="history-info-left">
                <span class="history-timestamp">${new Date(item.timestamp).toLocaleString()}</span>
                <button class="bookmark-btn ${item.bookmarked ? 'active' : ''}" data-id="${item.id}">
                    ★
                </button>
            </div>
            <span class="history-model">${item.model}</span>
        </div>
        <div class="history-text">
            <div class="history-source">${item.source}</div>
            <div class="history-translated">${item.translated}</div>
        </div>
        <div class="history-actions">
            <button class="btn-small restore-btn" data-id="${item.id}">복원</button>
            <button class="btn-small delete-btn" data-id="${item.id}">삭제</button>
        </div>
    `;
      historyList.appendChild(historyItem);
    });
}

// 즐겨찾기 토글 함수
function toggleBookmark(id) {
    const history = JSON.parse(localStorage.getItem('translationHistory')) || [];
    const index = history.findIndex(item => item.id === id);
    
    if (index !== -1) {
        history[index].bookmarked = !history[index].bookmarked;
        localStorage.setItem('translationHistory', JSON.stringify(history));
        
        // 현재 필터 상태를 유지한 채로 히스토리 목록 업데이트
        displayTranslationHistory(currentFilter);
    }
}

// 번역 히스토리에서 복원하는 함수
function restoreTranslation(id) {
    const history = JSON.parse(localStorage.getItem('translationHistory')) || [];
    const historyItem = history.find(item => item.id === id);
    
    if (historyItem) {
        // 원본 텍스트 복원
        elements.sourceText.value = historyItem.source;
        
        // 번역 결과 복원 및 스타일 적용
        elements.translatedText.value = historyItem.translated;
        elements.translatedText.style.color = isDarkMode ? baseColor : '#000000';
        
        // 포맷팅된 결과가 있는 경우 스타일 적용
        if (enableMarkdown) {
            const formattedResult = document.getElementById('formattedResult');
            if (formattedResult) {
                let formatted = marked.parse(historyItem.translated);
                
                // 색상 스타일 적용
                formatted = formatted.replace(/"([^"]+)"/g, `<span style="color: ${quoteColor}">\"$1\"</span>`);
                formatted = formatted.replace(/'([^']+)'/g, `<span style="color: ${thoughtColor}">\'$1\'</span>`);
                formatted = formatted.replace(/_([^_]+)_/g, `<span style="color: ${emphasisColor}">_$1_</span>`);
                formatted = formatted.replace(/\*\*([^\*]+)\*\*/g, `<span style="color: ${boldColor}">**$1**</span>`);
                
                formattedResult.innerHTML = formatted;
                formattedResult.style.color = isDarkMode ? baseColor : '#000000';
                formattedResult.style.display = 'block';
            }
        }
        
        // 글자 수 업데이트
        updateCharacterCount();
        
        showToast('번역 내용이 복원되었습니다.');
    } else {
        console.warn('히스토리 항목을 찾을 수 없습니다:', id);
    }
}

// 번역 히스토리 삭제 함수
function deleteTranslation(id) {
    if (!id) return;

    const history = JSON.parse(localStorage.getItem('translationHistory')) || [];
    const filtered = history.filter(item => item.id !== id);
    
    localStorage.setItem('translationHistory', JSON.stringify(filtered));
    translationHistory = filtered;
    
    // 현재 활성화된 필터 확인
    const activeFilter = document.querySelector('.history-filter button.active');
    const currentFilter = activeFilter ? activeFilter.dataset.filter : 'all';
    
    displayTranslationHistory(currentFilter);
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = date.getHours() >= 12 ? '오후' : '오전';
    const hours12 = date.getHours() % 12 || 12;

    return `${year}. ${month}. ${day}. ${ampm} ${hours12}:${minutes}:${seconds}`;
}

// 번역 히스토리 표시 함수
function displayTranslationHistory(filter = 'all') {
    const historyContainer = document.querySelector('.history-list');
    if (!historyContainer) return;

    const history = JSON.parse(localStorage.getItem('translationHistory')) || [];

    historyContainer.innerHTML = '';
    
    const filteredHistory = history.filter(item => {
        const isValid = item && 
            typeof item === 'object' &&
            'source' in item &&
            'translated' in item &&
            'timestamp' in item &&
            'model' in item;

        if (!isValid) {
            console.log('유효하지 않은 히스토리 항목:', item);
            return false;
        }

        // 즐겨찾기 필터가 활성화된 경우 즐겨찾기된 항목만 표시
        if (filter === 'favorites') {
            return item.bookmarked;
        }
        return true;
    });

    // 필터링된 히스토리 표시
    filteredHistory.forEach(item => {
        const date = new Date(item.timestamp);
        const formattedDate = `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}. ${date.getHours() >= 12 ? '오후' : '오전'} ${String(date.getHours() % 12 || 12).padStart(1, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

        const historyItemHTML = `
            <div class="history-item" data-id="${item.id}">
                <div class="history-item-header">
                    <div class="history-info-left">
                        <span class="history-timestamp">${formattedDate}</span>
                        <button class="bookmark-btn ${item.bookmarked ? 'active' : ''}" data-id="${item.id}">
                            ★
                        </button>
                    </div>
                    <span class="history-model">${item.model}</span>
                </div>
                <div class="history-text">
                    <div class="history-source">${item.source}</div>
                    <div class="history-translated">${item.translated}</div>
                </div>
                <div class="history-actions">
                    <button class="btn-small restore-btn" data-id="${item.id}">복원</button>
                    <button class="btn-small delete-btn" data-id="${item.id}">삭제</button>
                </div>
            </div>
        `;
        historyContainer.insertAdjacentHTML('beforeend', historyItemHTML);
    });

    // 필터 버튼 상태 업데이트
    const filterButtons = document.querySelectorAll('.history-filter button');
    filterButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.filter === filter);
    });
}

// 히스토리 가져오기 함수
function importHistory() {
    // 이미 존재하는 input 엘리먼트 확인 및 제거
    const existingInput = document.querySelector('input[type="file"].temp-file-input');
    if (existingInput) {
        existingInput.remove();
    }
    
    // 파일 입력 엘리먼트 생성
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    fileInput.className = 'temp-file-input';

    // 파일 선택 이벤트 처리
    fileInput.addEventListener('change', function(e) {
        
        const file = e.target.files[0];
        if (!file) {
            showToast('파일을 선택해주세요.', 'error');
            fileInput.remove();
            return;
        }

        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const importedHistory = JSON.parse(e.target.result);
                
                // 유효성 검사
                if (!Array.isArray(importedHistory)) {
                    throw new Error('유효하지 않은 히스토리 형식입니다.');
                }

                // ID가 없는 항목에 ID 추가
                const processedHistory = importedHistory.map(item => ({
                    ...item,
                    id: item.id || String(item.timestamp)
                }));

                // 기존 히스토리와 병합
                const existingHistory = JSON.parse(localStorage.getItem('translationHistory')) || [];
                
                const mergedHistory = [...processedHistory, ...existingHistory];
                
                // 중복 제거 (timestamp 기준)
                const uniqueHistory = mergedHistory.filter((item, index, self) =>
                    index === self.findIndex((t) => t.timestamp === item.timestamp)
                );

                // 저장 및 업데이트
                localStorage.setItem('translationHistory', JSON.stringify(uniqueHistory));
                translationHistory = uniqueHistory;
                
                // UI 업데이트
                displayTranslationHistory(currentFilter);
                showToast('번역 히스토리를 성공적으로 가져왔습니다.');

            } catch (error) {
                console.error('히스토리 가져오기 오류:', error);
                showToast('히스토리 가져오기에 실패했습니다: ' + error.message, 'error');
            } finally {
                // 임시 input 엘리먼트 제거
                fileInput.remove();
            }
        };

        reader.onerror = function(error) {
            console.error('파일 읽기 오류:', error);
            showToast('파일 읽기에 실패했습니다.', 'error');
            fileInput.remove();
        };

        reader.readAsText(file);
    });

    // 파일 입력 엘리먼트를 DOM에 추가
    document.body.appendChild(fileInput);

    // 파일 선택 다이얼로그 표시
    fileInput.click();
}

// 이벤트 리스너 초기화 함수
function initializeHistoryControls() {
    
    const importBtn = document.querySelector('.history-import-btn');
    
    if (importBtn) {
        // 기존 이벤트 리스너 제거
        importBtn.removeEventListener('click', importHistory);
        // 새 이벤트 리스너 추가
        importBtn.addEventListener('click', importHistory);
    }
}

// 텍스트 자르기 함수
function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// 이벤트 리스너 추가
document.getElementById('historySearch').addEventListener('input', 
    debounce(e => updateHistoryList(e.target.value), 300)
);

document.getElementById('clearHistory').addEventListener('click', () => {
if (confirm('모든 번역 히스토리를 삭제하시겠습니까?')) {
    translationHistory = [];
    localStorage.setItem('translationHistory', JSON.stringify(translationHistory));
    updateHistoryList();
}
});

document.getElementById('exportHistory').addEventListener('click', () => {
    const historyData = JSON.stringify(translationHistory, null, 2);
    const blob = new Blob([historyData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation-history-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

if (savedKoToEnTemplate) {
    koToEnTemplate = JSON.parse(localStorage.getItem('promptTemplates') || '{}')[savedKoToEnTemplate];
    elements.templateNameKoToEn.textContent = `선택된 템플릿: ${savedKoToEnTemplate}`;
}

if (savedEnToKoTemplate) {
    enToKoTemplate = JSON.parse(localStorage.getItem('promptTemplates') || '{}')[savedEnToKoTemplate];
    elements.templateNameEnToKo.textContent = `선택된 템플릿: ${savedEnToKoTemplate}`;
}

// 방향 전환 버튼 이벤트 리스너
elements.koToEnBtn.addEventListener('click', () => {
    currentDirection = 'koToEn';
    elements.koToEnBtn.classList.add('active');
    elements.enToKoBtn.classList.remove('active');
    if (koToEnTemplate) {
        elements.customPromptInput.value = koToEnTemplate;
    }
});

elements.enToKoBtn.addEventListener('click', () => {
    currentDirection = 'enToKo';
    elements.enToKoBtn.classList.add('active');
    elements.koToEnBtn.classList.remove('active');
    if (enToKoTemplate) {
        elements.customPromptInput.value = enToKoTemplate;
    }
});

// 템플릿 설정 버튼 이벤트 리스너
elements.setTemplateButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // 버블링 방지
        const direction = index === 0 ? 'koToEn' : 'enToKo';
        setTemplateForDirection(direction);
    });
});

// Gemini로 번역
async function translateWithGemini(text, apiKey) {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${customPrompt}\n${text}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.2,
                    topK: 40,
                    topP: 0.8,
                }
            })
        }
    );

    if (!response.ok) throw new Error('Gemini API 요청 실패');
    const data = await response.json();
    if (data.candidates[0].content.parts.length > 1) {
        return data.candidates[0].content.parts[1].text;
    } else {
        return data.candidates[0].content.parts[0].text;
    }
}

// OpenAI로 번역
async function translateWithOpenAI(text, apiKey) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: selectedModel,
            messages: [
                { role: "system", content: "How can I help you?" },
                { role: "user", content: `${customPrompt}\n${text}` }
            ],
            temperature: 0.2
        })
    });

    if (!response.ok) throw new Error('OpenAI API 요청 실패');
    const data = await response.json();
    return data.choices[0].message.content;
}

// Anthropic으로 번역
async function translateWithAnthropic(text, apiKey) {
    // Cloudflare Workers URL
    const PROXY_URL = 'https://tincanstranslator.antinomyanonymity.workers.dev/';

    try {
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [{
                    role: "user",
                    content: `${customPrompt}\n${text}`
                }],
                max_tokens: 4000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Anthropic API Error: ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();

        // 응답 데이터 처리
        if (data.content && Array.isArray(data.content)) {
            const translatedText = data.content
                .filter(item => item.type === 'text')
                .map(item => item.text)
                .join('');
            
            if (translatedText) {
                return translatedText;
            }
        }

        throw new Error('예상치 못한 API 응답 형식');
    } catch (error) {
        console.error('Anthropic translation error:', error);
        throw new Error(`Claude API 요청 실패: ${error.message}`);
    }
}

// Cohere로 번역
async function translateWithCohere(text, apiKey) {
    try {
        const response = await fetch('https://api.cohere.ai/v2/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Cohere-Version': '2024-03-01'
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [
                    {
                        role: "user",
                        content: `${customPrompt}\n${text}`
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Cohere API Error: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();
        console.log('Cohere API Response:', data);

        if (data.message && Array.isArray(data.message.content)) {
            const textContent = data.message.content.find(item => item.type === 'text');
            if (textContent && textContent.text) {
                return textContent.text;
            }
        }

        throw new Error('예상치 못한 API 응답 형식');
    } catch (error) {
        console.error('Cohere translation error:', error);
        throw new Error(`Cohere API 요청 실패: ${error.message}`);
    }
}

/*********************************************
 * 8. 초기화 관련 함수들
 *********************************************/
// 테마 저장 및 적용 함수
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selectedTheme', theme);
}

// 설정 페이지 테마 버튼 초기화
function initializeThemeButtons() {
    const themeButtons = document.querySelectorAll('.theme-toggle');
    const savedTheme = localStorage.getItem('selectedTheme') || 'light';
    toggleTheme(savedTheme);

    applyTheme(savedTheme); // 저장된 테마 적용

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedTheme = button.getAttribute('data-theme');
            applyTheme(selectedTheme);
            showToast(`"${selectedTheme}" 테마가 적용되었습니다.`);
        });
    });
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    initializeThemeButtons();
});

// 모델 선택 옵션 초기화
function initializeModelSelect() {
    if (!elements.modelSelect) return;
    
    elements.modelSelect.innerHTML = '';
    modelOptions.forEach(group => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.group;
        
        group.options.forEach(option => {
            const optElement = document.createElement('option');
            optElement.value = option.value;
            optElement.textContent = option.label;
            optgroup.appendChild(optElement);
        });
        
        elements.modelSelect.appendChild(optgroup);
    });
}

// 비밀번호 토글 설정
function setupPasswordToggles() {
    elements.togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = e.target.closest('.api-input-container').querySelector('input');
            const icon = e.target.closest('.toggle-password').querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// 단축키 설정
function setupShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl + Enter: 번역
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            if (!elements.translateBtn.disabled) {
                translateText();
            }
        }

        // Ctrl + S: 프롬프트 저장
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveCustomPrompt();
        }
        // Ctrl + L: 라이트 모드
        if (e.ctrlKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            toggleTheme('light');
        }

        // Ctrl + I: 아보카도 테마
        if (e.ctrlKey && e.key.toLowerCase() === 'i') {
            e.preventDefault();
            toggleTheme('avocado');
        }

        // Ctrl + D: 다크모드 토글
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleTheme('dark');
        }

        // Esc: 번역 취소 또는 모달 닫기
        if (e.key === 'Escape') {
            if (elements.shortcutModal.style.display === 'block') {
                elements.shortcutModal.style.display = 'none';
            } else if (elements.loading.style.display === 'flex') {
                // 번역 중일 때만 취소
                cancelTranslation();
            }
        }
    });

    // 텍스트 입력 시 자동 저장
    elements.sourceText.addEventListener('input', (e) => {
        localStorage.setItem('savedText', e.target.value);
        updateCharacterCount(e.target, 'source');
    });

    elements.translatedText.addEventListener('input', () => {
        localStorage.setItem('lastTranslation', elements.translatedText.value);
        updateCharacterCount(elements.translatedText, 'translated');
    });

    // 히스토리 토글 이벤트 리스너
    elements.toggleHistory?.addEventListener('click', () => {
        elements.historyContent.classList.toggle('collapsed');
        elements.toggleHistory.textContent = elements.historyContent.classList.contains('collapsed') ? '▶' : '▼ ';
    });

    // 단축키 모달 관련
    elements.showShortcutsBtn?.addEventListener('click', () => {
        elements.shortcutModal.style.display = 'block';
    });

    elements.closeModalBtn?.addEventListener('click', () => {
        elements.shortcutModal.style.display = 'none';
    });

    // 파일 업로드
    elements.fileUpload?.addEventListener('change', (e) => handleFileUpload(e.target.files[0]));

    // 드래그 앤 드롭
    elements.dropZone?.addEventListener('dragover', handleDragOver);
    elements.dropZone?.addEventListener('dragleave', handleDragLeave);
    elements.dropZone?.addEventListener('drop', handleDrop);

    // 번역 방향 전환 단축키 이벤트 리스너
    document.addEventListener('keydown', (e) => {
        // Alt + 1: 한→영
        if (e.altKey && e.key === '1') {
            e.preventDefault();
            switchTranslationDirection('koToEn');
            showToast('번역 방향이 한→영으로 변경되었습니다.');
        }
        // Alt + 2: 영→한
        else if (e.altKey && e.key === '2') {
            e.preventDefault();
            switchTranslationDirection('enToKo');
            showToast('번역 방향이 영→한으로 변경되었습니다.');
        }
    });

    // 모달 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === elements.shortcutModal) {
            elements.shortcutModal.style.display = 'none';
        }
    });
}

// 번역 취소 함수
function cancelTranslation() {
    if (controller) {
        controller.abort();
        controller = null;
    }
    isTranslating = false;
    elements.translateBtn.disabled = false;
    elements.loading.style.display = 'none';
    showToast('번역이 취소되었습니다.', 'error');
}

// 이벤트 리스너 설정
function setupEventListeners() {
    elements.saveApiKeysBtn?.addEventListener('click', saveApiKeys);
    elements.modelSelect?.addEventListener('change', handleModelChange);
    elements.toggleRulesBtn?.addEventListener('click', toggleRules);
    elements.addRuleBtn?.addEventListener('click', handleAddRule);
    elements.translateBtn?.addEventListener('click', translateText);
    elements.savePromptBtn?.addEventListener('click', saveCustomPrompt);
    elements.baseColorInput?.addEventListener('change', handleColorChange);
    elements.quoteColorInput?.addEventListener('change', handleColorChange);
    elements.thoughtColorInput?.addEventListener('change', handleColorChange);
    elements.emphasisColorInput?.addEventListener('change', handleColorChange);
    elements.enableMarkdownInput?.addEventListener('change', handleMarkdownToggle);
    elements.copySource?.addEventListener('click', () => copyText(elements.sourceText));
    elements.copyTranslated?.addEventListener('click', () => copyText(elements.translatedText));
    elements.themeToggle?.addEventListener('click', toggleTheme);
    elements.showShortcutsBtn?.addEventListener('click', () => elements.shortcutModal.style.display = 'block');
    elements.closeModalBtn?.addEventListener('click', () => elements.shortcutModal.style.display = 'none');
    elements.promptTemplate?.addEventListener('change', handlePromptTemplate);
    elements.saveAsTemplateBtn?.addEventListener('click', saveAsTemplate);

    // 텍스트 입력 시 자동 저장 및 카운터 업데이트
    elements.sourceText?.addEventListener('input', (e) => {
        localStorage.setItem('savedText', e.target.value);
        updateCharacterCount(e.target, 'source');
    });

    elements.translatedText?.addEventListener('input', (e) => {
        localStorage.setItem('lastTranslation', e.target.value);
        updateCharacterCount(e.target, 'translated');
    });
}

    elements.showShortcutsBtn?.addEventListener('click', () => {
        elements.shortcutModal.style.display = 'block';
    });

// 데이터 관리 설정
function setupDataManagement() {
    const exportBtn = document.getElementById('exportData');
    const importBtn = document.getElementById('importData');
    const importFile = document.getElementById('importFile');

    exportBtn?.addEventListener('click', exportSettings);
    
    importBtn?.addEventListener('click', () => {
        importFile.click();
    });

    importFile?.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            importSettings(e.target.files[0]);
            e.target.value = ''; // 파일 입력 초기화
        }
    });
}

/*********************************************
 * 데이터 복원 함수들
 *********************************************/
// API 키 복원 함수
function restoreApiKeys() {
    if (geminiApiKey) elements.geminiApiKeyInput.value = geminiApiKey;
    if (openaiApiKey) elements.openaiApiKeyInput.value = openaiApiKey;
    if (anthropicApiKey) elements.anthropicApiKeyInput.value = anthropicApiKey;
    if (cohereApiKey) elements.cohereApiKeyInput.value = cohereApiKey;
}

// 기본 설정 복원 함수
function restoreSettings() {
    if (selectedModel) elements.modelSelect.value = selectedModel;
    if (customPrompt) elements.customPromptInput.value = customPrompt;
    if (baseColor) elements.baseColorInput.value = baseColor;
    if (quoteColor) elements.quoteColorInput.value = quoteColor;
    if (thoughtColor) elements.thoughtColorInput.value = thoughtColor;
    if (emphasisColor) elements.emphasisColorInput.value = emphasisColor;
    elements.enableMarkdownInput.checked = enableMarkdown;
}

// 단어 규칙 초기화 함수
function initializeWordRules() {
    if (elements.rulesContent) {
        elements.rulesContent.style.display = 'none';
    }
    displayWordRules();
}

//* 메인 초기화 함수
function initialize() {
    // 1. UI 초기화
    initializeModelSelect();
    updatePromptTemplateOptions();
    
    // 2. 이벤트 핸들러 설정
    setupEventListeners();
    setupShortcuts();
    setupPasswordToggles();
    setupDataManagement();

    // 3. API 키 및 기본 설정 복원
    restoreApiKeys();
    restoreSettings();
    
    // 4. 번역 관련 데이터 복원
    restoreTranslationData();
    
    // 5. 단어 규칙 초기화
    initializeWordRules();

    // 6. 히스토리 목록 초기 표시
    updateHistoryList();
}

/*********************************************
 * 9. 이벤트 리스너 등록
 *********************************************/
// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initialize);
