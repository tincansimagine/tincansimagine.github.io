// 1. 전역 변수 초기화
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

// 2. DOM 요소 참조
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

// 3. 상수 정의
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

const promptTemplates = {
    basic: 'Translate the following text to Korean naturally:\n',
    natural: 'Translate the following text to Korean with natural and fluent expressions:\n',
    formal: 'Translate the following text to Korean using formal and professional language:\n',
    casual: 'Translate the following text to Korean using casual and conversational language:\n'
};

// 4. marked 설정
marked.setOptions({
    breaks: true,
    gfm: true,
    pedantic: false,
    smartLists: true,
    smartypants: false
});

// 5. 유틸리티 함수들
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            elements.toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

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

function updateTextCounts(textarea, type) {
    const text = textarea.value;
    const charCount = text.length;
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    
    elements[`${type}CharCount`].textContent = charCount;
    elements[`${type}WordCount`].textContent = wordCount;
}

async function copyText(element) {
    try {
        await navigator.clipboard.writeText(element.value);
        showToast('텍스트가 클립보드에 복사되었습니다.');
    } catch (err) {
        showToast('텍스트 복사에 실패했습니다.', 'error');
    }
}

function applyWordRules(text) {
    let result = text;
    wordRules.forEach(rule => {
        const regex = new RegExp(rule.source, 'g');
        result = result.replace(regex, rule.target);
    });
    return result;
}

function displayWordRules() {
    const list = elements.rulesList;
    if (!list) return;
    
    list.innerHTML = '';
    wordRules.forEach((rule, index) => {
        const item = document.createElement('div');
        item.className = 'rule-item';
        item.innerHTML = `
            <span>${rule.source} → ${rule.target}</span>
            <button class="delete-rule" data-index="${index}">❌</button>
        `;
        
        const deleteBtn = item.querySelector('.delete-rule');
        deleteBtn.addEventListener('click', () => {
            wordRules.splice(index, 1);
            localStorage.setItem('wordRules', JSON.stringify(wordRules));
            displayWordRules();
            showToast('단어 규칙이 삭제되었습니다.');
        });
        
        list.appendChild(item);
    });
}

function updateFormattedResult() {
    if (!enableMarkdown) {
        elements.formattedResult.style.display = 'none';
        elements.translatedText.style.display = 'block';
        return;
    }

    const text = elements.translatedText.value;
    if (text) {
        elements.formattedResult.innerHTML = marked.parse(text);
        elements.formattedResult.style.display = 'block';
        elements.translatedText.style.display = 'none';
    }
}

// 6. 초기화 관련 함수들
function initializeModelSelect() {
    const select = elements.modelSelect;
    if (!select) return;
    
    select.innerHTML = '';
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
    
    if (selectedModel) {
        select.value = selectedModel;
    }
}

// API 호출 함수들
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

// 색상 변경 핸들러
function handleColorChange(e) {
    const type = e.target.id.replace('Color', '');
    const color = e.target.value;
    
    switch(type) {
        case 'base':
            baseColor = color;
            localStorage.setItem('baseColor', color);
            break;
        case 'quote':
            quoteColor = color;
            localStorage.setItem('quoteColor', color);
            break;
        case 'thought':
            thoughtColor = color;
            localStorage.setItem('thoughtColor', color);
            break;
        case 'emphasis':
            emphasisColor = color;
            localStorage.setItem('emphasisColor', color);
            break;
    }
    
    updateFormattedResult();
}

// 마크다운 토글 핸들러
function handleMarkdownToggle(e) {
    enableMarkdown = e.target.checked;
    localStorage.setItem('enableMarkdown', enableMarkdown);
    updateFormattedResult();
}

// 이벤트 리스너들
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    if (typeof marked === 'undefined') {
        console.error('marked library is not loaded');
        showToast('마크다운 라이브러리 로딩 실패', 'error');
    }
    initialize();
});

window.addEventListener('beforeunload', () => {
    localStorage.setItem('savedText', elements.sourceText.value);
    localStorage.setItem('lastTranslation', elements.translatedText.value);
});

window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
    showToast('예기치 않은 오류가 발생했습니다.', 'error');
    return false;
};