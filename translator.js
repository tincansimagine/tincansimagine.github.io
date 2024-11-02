// 전역 변수 정의
let geminiApiKey = localStorage.getItem('geminiApiKey') || '';
let openaiApiKey = localStorage.getItem('openaiApiKey') || '';
let anthropicApiKey = localStorage.getItem('anthropicApiKey') || '';
let wordRules = JSON.parse(localStorage.getItem('wordRules')) || [];
let selectedModel = localStorage.getItem('selectedModel') || 'gemini-1.5-pro-002';
let customPrompt = localStorage.getItem('customPrompt') || 'Translate the following text to Korean naturally, maintaining a formal and professional tone:\n';
let baseColor = localStorage.getItem('baseColor') || '#333333';
let quoteColor = localStorage.getItem('quoteColor') || '#2E5CB8';
let thoughtColor = localStorage.getItem('thoughtColor') || '#6B4C9A';
let emphasisColor = localStorage.getItem('emphasisColor') || '#7B3B3B';
let enableMarkdown = localStorage.getItem('enableMarkdown') !== 'false';

// DOM 요소들
const elements = {
    geminiApiKeyInput: document.getElementById('geminiApiKey'),
    openaiApiKeyInput: document.getElementById('openaiApiKey'),
    anthropicApiKeyInput: document.getElementById('anthropicApiKey'),
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
    translateBtn: document.getElementById('translateButton'),
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('errorMessage'),
    customPromptInput: document.getElementById('customPrompt'),
    savePromptBtn: document.getElementById('savePrompt'),
    baseColorInput: document.getElementById('baseColor'),
    quoteColorInput: document.getElementById('quoteColor'),
    thoughtColorInput: document.getElementById('thoughtColor'),
    emphasisColorInput: document.getElementById('emphasisColor'),
    enableMarkdownInput: document.getElementById('enableMarkdown'),
    copySource: document.getElementById('copySource'),
    copyTranslated: document.getElementById('copyTranslated')
};

// marked 설정
marked.setOptions({
    breaks: true,
    gfm: true,
    pedantic: false,
    smartLists: true,
    smartypants: false // 따옴표 자동 변환 비활성화
});

// 모델 옵션 정의
const modelOptions = [
    {
        group: 'Google Gemini',
        options: [
            { value: 'gemini-1.5-pro-002', label: 'Gemini 1.5 Pro (Latest)' },
            { value: 'gemini-1.5-pro-001', label: 'Gemini 1.5 Pro (Stable)' },
            { value: 'gemini-1.5-flash-002', label: 'Gemini 1.5 Flash (Latest)' },
            { value: 'gemini-1.5-flash-001', label: 'Gemini 1.5 Flash (Stable)' }
        ]
    },
    {
        group: 'OpenAI GPT-3.5',
        options: [
            { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Default)' },
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
        group: 'Claude 3',
        options: [
            { value: 'claude-3-opus-20240229', label: 'Claude 3 Opus 24-02-29' },
            { value: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet 24-02-29' },
            { value: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku 24-03-07' }
        ]
    },
    {
        group: 'Claude Legacy',
        options: [
            { value: 'claude-2.1', label: 'Claude 2.1' },
            { value: 'claude-2.0', label: 'Claude 2.0' },
            { value: 'claude-1.3', label: 'Claude 1.3' }
        ]
    }
];

// 초기화 함수
function initialize() {
    initializeModelSelect();
    if (geminiApiKey) elements.geminiApiKeyInput.value = geminiApiKey;
    if (openaiApiKey) elements.openaiApiKeyInput.value = openaiApiKey;
    if (anthropicApiKey) elements.anthropicApiKeyInput.value = anthropicApiKey;
    if (selectedModel) elements.modelSelect.value = selectedModel;
    if (customPrompt) elements.customPromptInput.value = customPrompt;
    if (baseColor) elements.baseColorInput.value = baseColor;
    if (quoteColor) elements.quoteColorInput.value = quoteColor;
    if (thoughtColor) elements.thoughtColorInput.value = thoughtColor;
    if (emphasisColor) elements.emphasisColorInput.value = emphasisColor;
    elements.enableMarkdownInput.checked = enableMarkdown;
    
    displayWordRules();
    setupEventListeners();
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
}

// API 키 저장
function saveApiKeys() {
    const newGeminiKey = elements.geminiApiKeyInput.value.trim();
    const newOpenAIKey = elements.openaiApiKeyInput.value.trim();
    const newAnthropicKey = elements.anthropicApiKeyInput.value.trim();
    
    if (newGeminiKey || newOpenAIKey || newAnthropicKey) {
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
        alert('API 키가 저장되었습니다.');
    } else {
        alert('최소 하나의 API 키를 입력해주세요.');
    }
}

// 모델 변경 처리
function handleModelChange(e) {
    selectedModel = e.target.value;
    localStorage.setItem('selectedModel', selectedModel);
}

// 프롬프트 저장
function saveCustomPrompt() {
    const newPrompt = elements.customPromptInput.value.trim();
    if (newPrompt) {
        customPrompt = newPrompt;
        localStorage.setItem('customPrompt', customPrompt);
        alert('프롬프트가 저장되었습니다.');
    }
}

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
    
    updateFormattedResult();
}

// 단어 규칙 섹션 토글
function toggleRules() {
    elements.rulesContent.classList.toggle('show');
    elements.toggleRulesBtn.textContent = 
        elements.rulesContent.classList.contains('show') ? '▼' : '▶';
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
        alert('원본 단어와 변환할 단어를 모두 입력해주세요.');
    }
}

// 단어 규칙 추가
function addWordRule(sourceWord, targetWord) {
    const rule = { source: sourceWord, target: targetWord };
    wordRules.push(rule);
    localStorage.setItem('wordRules', JSON.stringify(wordRules));
    displayWordRules();
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

// 단어 규칙 삭제
function removeRule(index) {
    wordRules.splice(index, 1);
    localStorage.setItem('wordRules', JSON.stringify(wordRules));
    displayWordRules();
}

// 텍스트 복사
async function copyText(element) {
    try {
        const textToCopy = element === elements.translatedText && enableMarkdown ? 
            elements.formattedResult.innerText : 
            element.value;
        await navigator.clipboard.writeText(textToCopy);
        alert('텍스트가 클립보드에 복사되었습니다.');
    } catch (err) {
        alert('복사에 실패했습니다.');
    }
}

// 마크다운 토글 처리
function handleMarkdownToggle(e) {
    enableMarkdown = e.target.checked;
    localStorage.setItem('enableMarkdown', enableMarkdown);
    updateFormattedResult();
}

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

// 텍스트 포맷팅
function formatText(text) {
    if (!enableMarkdown) {
        elements.formattedResult.style.display = 'none';
        elements.translatedText.style.display = 'block';
        return text;
    }

    // 기본 텍스트 색상 설정
    elements.formattedResult.style.color = baseColor;

    // 따옴표와 이텔릭체를 임시 태그로 변환
    text = text.replace(/"([^"]+)"/g, '{{QUOTE}}$1{{/QUOTE}}');
    text = text.replace(/'([^']+)'/g, '{{THOUGHT}}$1{{/THOUGHT}}');
    
    // 마크다운 변환
    let formatted = marked.parse(text);
    
    // 임시 태그를 스타일이 적용된 HTML로 변환
    formatted = formatted.replace(
        /{{QUOTE}}([^{]+){{\/QUOTE}}/g,
        `<span style="color: ${quoteColor}">"$1"</span>`
    );
    
    formatted = formatted.replace(
        /{{THOUGHT}}([^{]+){{\/THOUGHT}}/g,
        `<span style="color: ${thoughtColor}">'$1'</span>`
    );
    
    // 이텔릭체 텍스트 색상 변경
    formatted = formatted.replace(
        /<em>([^<]+)<\/em>/g,
        `<em style="color: ${emphasisColor}">$1</em>`
    );

    elements.formattedResult.style.display = 'block';
    elements.translatedText.style.display = 'none';
    return formatted;
}

// 포맷된 결과 업데이트
function updateFormattedResult() {
    const text = elements.translatedText.value;
    if (text) {
        elements.formattedResult.innerHTML = formatText(text);
    }
}

// 모델 선택 옵션 초기화
function initializeModelSelect() {
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

// 모델 제공자 확인
function getModelProvider(model) {
    if (model.startsWith('gemini')) return 'gemini';
    if (model.startsWith('gpt')) return 'openai';
    if (model.startsWith('claude')) return 'anthropic';
    return '';
}

// API 키 가져오기
function getApiKey(provider) {
    switch(provider) {
        case 'gemini': return geminiApiKey;
        case 'openai': return openaiApiKey;
        case 'anthropic': return anthropicApiKey;
        default: return '';
    }
}

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
    return data.candidates[0].content.parts[0].text;
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
                { role: "system", content: "You are a professional translator." },
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
    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
            model: selectedModel,
            messages: [
                { role: "user", content: `${customPrompt}\n${text}` }
            ],
            max_tokens: 1024
        })
    });

    if (!response.ok) throw new Error('Anthropic API 요청 실패');
    const data = await response.json();
    return data.content[0].text;
}

// 번역 함수
async function translateText() {
    const modelProvider = getModelProvider(selectedModel);
    const apiKey = getApiKey(modelProvider);
    
    if (!apiKey) {
        alert(`선택한 모델(${modelProvider})의 API 키를 먼저 입력해주세요.`);
        return;
    }

    const sourceText = elements.sourceText.value.trim();
    if (!sourceText) {
        alert('번역할 텍스트를 입력해주세요.');
        return;
    }

    elements.loading.style.display = 'block';
    elements.errorMessage.style.display = 'none';
    elements.translateBtn.disabled = true;

    try {
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
            default:
                throw new Error('지원하지 않는 모델입니다.');
        }
        
        // 단어 규칙 적용
        translatedText = applyWordRules(translatedText);
        
        // 번역 결과 표시
        elements.translatedText.value = translatedText;
        updateFormattedResult();

    } catch (error) {
        console.error('Translation error:', error);
        elements.errorMessage.style.display = 'block';
        elements.errorMessage.textContent = '번역 중 오류가 발생했습니다: ' + error.message;
    } finally {
        elements.loading.style.display = 'none';
        elements.translateBtn.disabled = false;
    }
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initialize);