/*********************************************
 * 1. 전역 변수 및 상수 정의
 *********************************************/
// 1. 전역 변수 정의
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let geminiApiKey = localStorage.getItem('geminiApiKey') || '';
let openaiApiKey = localStorage.getItem('openaiApiKey') || '';
let anthropicApiKey = localStorage.getItem('anthropicApiKey') || '';
let wordRules = JSON.parse(localStorage.getItem('wordRules')) || [];
let selectedModel = localStorage.getItem('selectedModel') || 'gemini-1.5-pro-002';
let customPrompt = localStorage.getItem('customPrompt') || 'Translate the following text to Korean naturally, maintaining a formal and professional tone:\n';
let baseColor = localStorage.getItem('baseColor') || (isDarkMode ? '#ffffff' : '#000000');
let quoteColor = localStorage.getItem('quoteColor') || '#2E5CB8';
let thoughtColor = localStorage.getItem('thoughtColor') || '#6B4C9A';
let emphasisColor = localStorage.getItem('emphasisColor') || '#7B3B3B';
let enableMarkdown = localStorage.getItem('enableMarkdown') !== 'false';
let savedText = localStorage.getItem('savedText') || '';
let lastTranslation = localStorage.getItem('lastTranslation') || '';

// 상수 정의
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

// 프롬프트 템플릿 정의
const promptTemplates = {
    basic: 'Translate the following text to Korean naturally:\n',
    natural: 'Translate the following text to Korean with natural and fluent expressions:\n',
    formal: 'Translate the following text to Korean using formal and professional language:\n',
    casual: 'Translate the following text to Korean using casual and conversational language:\n'
};

// marked 라이브러리 설정
marked.setOptions({
    breaks: true,
    gfm: true,
    pedantic: false,
    smartLists: true,
    smartypants: false
});

/*********************************************
 * 2. DOM 요소 참조
 *********************************************/
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
    closeModalBtn: document.querySelector('.close-modal')
};

/*********************************************
 * 3. 유틸리티 함수들
 *********************************************/
// 토스트 메시지 표시
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            elements.toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

//* API 관련
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

//* 텍스트 처리
// 글자 수 업데이트
function updateTextCounts(element, type) {
    const text = element.value;
    const charCount = text.length;
    const wordCount = text.trim().split(/\s+/).length;
    
    elements[`${type}CharCount`].textContent = charCount;
    elements[`${type}WordCount`].textContent = wordCount;
}

// 텍스트 복사
async function copyText(element) {
    try {
        const textToCopy = element === elements.translatedText && enableMarkdown ? 
            elements.formattedResult.innerText : 
            element.value;
        await navigator.clipboard.writeText(textToCopy);
        showToast('텍스트가 클립보드에 복사되었습니다.');
    } catch (err) {
        showToast('복사에 실패했습니다.', 'error');
    }
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
        option.textContent = key;
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

/*********************************************
 * 4. 데이터 관리 함수들
 *********************************************/
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
            // 사용자 정의 템플릿 저장
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
        translateBtn: document.getElementById('translateButton'),
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
    
    updateFormattedResult();
}

// 마크다운 토글 처리
function handleMarkdownToggle(e) {
    enableMarkdown = e.target.checked;
    localStorage.setItem('enableMarkdown', enableMarkdown);
    updateFormattedResult();
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
        showToast('API 키가 저장되었습니다.');
    } else {
        showToast('최소 하나의 API 키를 입력해주세요.', 'error');
    }
}

// 테마 관리
function toggleTheme() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        if (!localStorage.getItem('baseColor')) {
            baseColor = '#ffffff';
            elements.baseColorInput.value = baseColor;
            updateFormattedResult();
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (!localStorage.getItem('baseColor')) {
            baseColor = '#333333';
            elements.baseColorInput.value = baseColor;
            updateFormattedResult();
        }
    }
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
function updateFormattedResult() {
    const text = elements.translatedText.value;
    if (text) {
        elements.formattedResult.innerHTML = formatText(text);
    }
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
async function translateText() {
    const modelProvider = getModelProvider(selectedModel);
    const apiKey = getApiKey(modelProvider);
    
    if (!apiKey) {
        showToast(`선택한 모델(${modelProvider})의 API 키를 먼저 입력해주세요.`, 'error');
        return;
    }

    const sourceText = elements.sourceText.value.trim();
    if (!sourceText) {
        showToast('번역할 텍스트를 입력해주세요.', 'error');
        return;
    }

    elements.loading.style.display = 'flex';
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
        
        translatedText = applyWordRules(translatedText);
        elements.translatedText.value = translatedText;
        updateFormattedResult();
        showToast('번역이 완료되었습니다.');

    } catch (error) {
        console.error('Translation error:', error);
        showToast('번역 중 오류가 발생했습니다: ' + error.message, 'error');
    } finally {
        elements.loading.style.display = 'none';
        elements.translateBtn.disabled = false;
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
            max_tokens: 5000
        })
    });

    if (!response.ok) throw new Error('Anthropic API 요청 실패');
    const data = await response.json();
    return data.content[0].text;
}

/*********************************************
 * 8. 초기화 관련 함수들
 *********************************************/
//* 개별 초기화 함수들
// 테마 초기화
function initializeTheme() {
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        if (!localStorage.getItem('baseColor')) {
            baseColor = '#ffffff';
            elements.baseColorInput.value = baseColor;
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (!localStorage.getItem('baseColor')) {
            baseColor = '#333333';
            elements.baseColorInput.value = baseColor;
        }
    }
}

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
            translateText();
        }
        // Ctrl + S: 프롬프트 저장
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveCustomPrompt();
        }
        // Ctrl + D: 다크모드 토글
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            toggleTheme();
        }
        // Esc: 번역 취소 또는 모달 닫기
        if (e.key === 'Escape') {
            if (elements.shortcutModal.style.display === 'block') {
                elements.shortcutModal.style.display = 'none';
            }
        }
    });

    // 텍스트 입력 시 자동 저장
    elements.sourceText.addEventListener('input', (e) => {
        localStorage.setItem('savedText', e.target.value);
        updateTextCounts(e.target, 'source');
    });

    elements.translatedText.addEventListener('input', () => {
        updateTextCounts(elements.translatedText, 'translated');
    });
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
        updateTextCounts(e.target, 'source');
    });

    elements.translatedText?.addEventListener('input', (e) => {
        localStorage.setItem('lastTranslation', e.target.value);
        updateTextCounts(e.target, 'translated');
    });
}

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

//* 데이터 복원 함수들
// API 키 복원 함수
function restoreApiKeys() {
    if (geminiApiKey) elements.geminiApiKeyInput.value = geminiApiKey;
    if (openaiApiKey) elements.openaiApiKeyInput.value = openaiApiKey;
    if (anthropicApiKey) elements.anthropicApiKeyInput.value = anthropicApiKey;
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

// 번역 데이터 복원 함수
function restoreTranslationData() {
    if (savedText) {
        elements.sourceText.value = savedText;
        updateTextCounts(elements.sourceText, 'source');
    }
    
    if (lastTranslation) {
        elements.translatedText.value = lastTranslation;
        updateTextCounts(elements.translatedText, 'translated');
        updateFormattedResult();
    }
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
    initializeTheme();
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
}

/*********************************************
 * 9. 이벤트 리스너 등록
 *********************************************/
// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', initialize);