// keyboard.js - Virtual Keyboard Logic (Glassmorphism, Windows OSK style)

document.addEventListener("DOMContentLoaded", () => {
    // Inject the keyboard trigger and container into the body
    const keyboardHTML = `
        <button id="kb-trigger-btn" class="keyboard-trigger-btn" title="Open Keyboard">⌨️</button>
        <div id="virtual-keyboard" class="virtual-keyboard-container">
            <div class="keyboard-header">
                <span style="font-weight:700; color:var(--kb-text);">MegaMart Virtual Keyboard</span>
                <div>
                    <!-- Language selector should persist the language -->
                    <select id="kb-lang-select" class="keyboard-lang-select">
                        <option value="en">English (US)</option>
                        <option value="ur">Urdu (اردو)</option>
                    </select>
                    <button id="kb-close-btn" class="keyboard-close-btn">✖</button>
                </div>
            </div>
            <div id="keyboard-keys" class="keyboard-keys-container">
                <!-- Keys generated via JS based on selected language -->
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', keyboardHTML);

    const triggerBtn = document.getElementById("kb-trigger-btn");
    const kbContainer = document.getElementById("virtual-keyboard");
    const closeBtn = document.getElementById("kb-close-btn");
    const langSelect = document.getElementById("kb-lang-select");
    const keysContainer = document.getElementById("keyboard-keys");

    let activeInput = null;
    let currentLang = localStorage.getItem('kb_lang') || 'en';
    langSelect.value = currentLang;

    // Layouts
    const layouts = {
        en: [
            ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
            ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
            ['{shift}', '{space}', '{bksp}', '{enter}']
        ],
        ur: [
            ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠', '-', '='],
            ['ق', 'و', 'ع', 'ر', 'ت', 'ے', 'ء', 'ی', 'ہ', 'پ', '[', ']'],
            ['ا', 'س', 'د', 'ف', 'گ', 'ح', 'ج', 'ک', 'ل', '؛', "'"],
            ['ز', 'ش', 'چ', 'ط', 'ب', 'ن', 'م', '،', '۔', '/'],
            ['{shift}', '{space}', '{bksp}', '{enter}']
        ]
    };

    let shiftActive = false;

    const renderKeys = () => {
        keysContainer.innerHTML = '';
        const layout = layouts[currentLang] || layouts['en'];
        layout.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'keyboard-row';
            row.forEach(key => {
                const keyDiv = document.createElement('div');
                keyDiv.className = 'keyboard-key';
                let displayKey = shiftActive && key.length === 1 ? key.toUpperCase() : key;

                if (key === '{shift}') {
                    displayKey = '⇧ Shift';
                    keyDiv.classList.add('key-wide', 'key-action');
                } else if (key === '{space}') {
                    displayKey = 'Space';
                    keyDiv.classList.add('key-space');
                } else if (key === '{bksp}') {
                    displayKey = '⌫ Bksp';
                    keyDiv.classList.add('key-wide', 'key-action');
                } else if (key === '{enter}') {
                    displayKey = '↵ Enter';
                    keyDiv.classList.add('key-wide', 'key-action');
                }

                keyDiv.textContent = displayKey;

                // Add preventDefault on mousedown to stop focus loss
                keyDiv.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    handleKeyPress(key);
                });

                rowDiv.appendChild(keyDiv);
            });
            keysContainer.appendChild(rowDiv);
        });
    };

    const handleKeyPress = (key) => {
        if (!activeInput) return;

        const start = activeInput.selectionStart;
        const end = activeInput.selectionEnd;
        let val = activeInput.value;

        if (key === '{bksp}') {
            if (end > start) val = val.slice(0, start) + val.slice(end);
            else if (start > 0) {
                val = val.slice(0, start - 1) + val.slice(start);
                activeInput.value = val;
                activeInput.setSelectionRange(start - 1, start - 1);
                return;
            }
        } else if (key === '{space}') {
            val = val.slice(0, start) + ' ' + val.slice(end);
            activeInput.value = val;
            activeInput.setSelectionRange(start + 1, start + 1);
            return;
        } else if (key === '{enter}') {
            if (activeInput.tagName === 'TEXTAREA') {
                val = val.slice(0, start) + '\\n' + val.slice(end);
                activeInput.value = val;
                activeInput.setSelectionRange(start + 1, start + 1);
            } else if (activeInput.form) {
                activeInput.form.submit();
                closeKeyboard();
            }
            return;
        } else if (key === '{shift}') {
            shiftActive = !shiftActive;
            renderKeys();
            return;
        } else {
            const char = shiftActive ? key.toUpperCase() : key;
            val = val.slice(0, start) + char + val.slice(end);
            activeInput.value = val;
            activeInput.setSelectionRange(start + 1, start + 1);
        }
        activeInput.value = val;

        // Native input event to trigger any React/framework handlers if present
        activeInput.dispatchEvent(new Event('input', { bubbles: true }));
    };

    const closeKeyboard = () => {
        kbContainer.classList.remove('active');
        triggerBtn.classList.remove('visible');
        activeInput = null;
    };

    // Events
    langSelect.addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('kb_lang', currentLang);
        renderKeys();
    });

    closeBtn.addEventListener('click', closeKeyboard);

    triggerBtn.addEventListener('mousedown', (e) => {
        e.preventDefault();
        if (kbContainer.classList.contains('active')) {
            closeKeyboard();
        } else {
            kbContainer.classList.add('active');
            if (activeInput) activeInput.focus();
        }
    });

    document.addEventListener('focusin', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            if (e.target.type !== 'password' && e.target.type !== 'checkbox' && e.target.type !== 'radio' && e.target.type !== 'submit') {
                activeInput = e.target;
                triggerBtn.classList.add('visible');
            }
        }
    });

    document.addEventListener('focusout', (e) => {
        if (e.relatedTarget && (e.relatedTarget === kbContainer || kbContainer.contains(e.relatedTarget) || e.relatedTarget === triggerBtn)) {
            // Keep active if clicked inside keyboard
            return;
        }
        // Don't close immediately to allow clicking trigger button
        setTimeout(() => {
            if (!document.activeElement || (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
                if (!kbContainer.classList.contains('active')) {
                    triggerBtn.classList.remove('visible');
                }
            }
        }, 100);
    });

    // Close on clicking outside
    document.addEventListener('mousedown', (e) => {
        if (kbContainer.classList.contains('active') &&
            !kbContainer.contains(e.target) &&
            e.target !== triggerBtn &&
            e.target.tagName !== 'INPUT' &&
            e.target.tagName !== 'TEXTAREA') {
            closeKeyboard();
        }
    });

    // Initial render
    renderKeys();
});
