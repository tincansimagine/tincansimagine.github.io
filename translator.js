// 전역 변수 초기화
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let baseColor = localStorage.getItem('baseColor') || (isDarkMode ? '#ffffff' : '#000000');
let geminiApiKey = localStorage.getItem('geminiApiKey') || '';
let openaiApiKey = localStorage.getItem('openaiApiKey') || '';
let anthropicApiKey = localStorage.getItem('anthropicApiKey') || '';
let wordRules = JSON.parse(localStorage.getItem('wordRules')) || [];
let selectedModel = localStorage.getItem('selectedModel') || 'gemini-1.5-pro-002';
let customPrompt = localStorage.getItem('customPrompt') || 'Translate the following text to Korean naturally, maintaining a formal and professional tone:\n';
let quoteColor = localStorage.getItem('quoteColor') || '#2E5CB8';
let thoughtColor = localStorage.getItem('thoughtColor') || '#6B4C9A';
let emphasisColor = localStorage.getItem('emphasisColor') || '#7B3B3B';
let enableMarkdown = localStorage.getItem('enableMarkdown') !== 'false';
let savedText = localStorage.getItem('savedText') || '';
let lastTranslation = localStorage.getItem('lastTranslation') || '';

// DOM 요소 참조
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

// marked 설정
marked.setOptions({
    breaks: true,
    gfm: true,
    pedantic: false,
    smartLists: true,
    smartypants: false
});

// 초기화 함수
function initialize() {
    initializeModelSelect();
    initializeTheme();
    setupPasswordToggles();
    setupShortcuts();
    
    // 기존 값 복원
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
    
    // 저장된 텍스트 복원
    if (savedText) {
        elements.sourceText.value = savedText;
        updateTextCounts(elements.sourceText, 'source');
    }
    
    if (lastTranslation) {
        elements.translatedText.value = lastTranslation;
        updateTextCounts(elements.translatedText, 'translated');
        updateFormattedResult();
    }
    
    // 단어 규칙 섹션 초기 상태 설정
    elements.rulesContent.style.display = 'none';
    displayWordRules();
    setupEventListeners();
}

// 모델 선택 초기화 함수
function initializeModelSelect() {
    const select = elements.modelSelect;
    if (!select) return;
    
    // 기존 옵션 제거
    select.innerHTML = '';
    
    // 모델 옵션 추가
    modelOptions.forEach(group => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.group;
        
        group.options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option.value;
            opt.textContent = option.label;
            optgroup.appendChild(opt);
        });
        
        select.appendChild(optgroup);
    });
    
    // 저장된 모델 선택
    if (selectedModel) {
        select.value = selectedModel;
    }
}

// 토스트 메시지 표시 함수
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    elements.toastContainer.appendChild(toast);
    
    // 3초 후 제거
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            elements.toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// 테마 초기화 함수
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
}

// 비밀번호 토글 설정
function setupPasswordToggles() {
    elements.togglePasswordBtns?.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            btn.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
        });
    });
}

// 단축키 설정
function setupShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl + Enter: 번역
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            elements.translateBtn?.click();
        }
        
        // Ctrl + S: 프롬프트 저장
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            elements.savePromptBtn?.click();
        }
        
        // Esc: 번역 취소
        if (e.key === 'Escape') {
            elements.loading.style.display = 'none';
            elements.translateBtn.disabled = false;
        }
        
        // Ctrl + D: 다크모드 토글
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            elements.themeToggle?.click();
        }
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

// 유틸리티 함수들
function getModelProvider(model) {
    if (model.startsWith('gemini')) return 'gemini';
    if (model.startsWith('gpt')) return 'openai';
    if (model.startsWith('claude')) return 'anthropic';
    return '';
}

function getApiKey(provider) {
    switch(provider) {
        case 'gemini': return geminiApiKey;
        case 'openai': return openaiApiKey;
        case 'anthropic': return anthropicApiKey;
        default: return '';
    }
}

// API 요청 함수들
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

// 마크다운 적용 여부에 따른 포맷팅 업데이트
function updateFormattedResult() {
    if (!enableMarkdown) {
        elements.formattedResult.style.display = 'none';
        elements.translatedText.style.display = 'block';
        return;
    }

    const text = elements.translatedText.value;
    if (text) {
        elements.formattedResult.innerHTML = formatText(text);
        elements.formattedResult.style.display = 'block';
        elements.translatedText.style.display = 'none';
    }
}

// 창 닫을 때 현재 상태 저장
window.addEventListener('beforeunload', () => {
    localStorage.setItem('savedText', elements.sourceText.value);
    localStorage.setItem('lastTranslation', elements.translatedText.value);
});

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    if (typeof marked === 'undefined') {
        console.error('marked library is not loaded');
        showToast('마크다운 라이브러리 로딩 실패', 'error');
    }
    initialize();
});

// 전역 에러 핸들링
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    showToast('예기치 않은 오류가 발생했습니다.', 'error');
    return false;
};