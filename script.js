// script.js

// String karakter QWERTY dan Alphabet biasa
const qwertyChars = "QWERTYUIOPASDFGHJKLZXCVBNM";

const abcChars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// Membuat objek (setara dictionary di Python) otomatis
const encodeMap = {};
const decodeMap = {};

for (let i = 0; i < qwertyChars.length; i++) {
    encodeMap[qwertyChars[i]] = abcChars[i];
    decodeMap[abcChars[i]] = qwertyChars[i];
}

// Fungsi Encode
function encode(text) {
    return text
        .toUpperCase()
        .split('') // Memecah string menjadi array karakter
        .map(ch => encodeMap[ch] || ch) // Jika karakter ada di map, ganti. Jika tidak, biarkan (angka/spasi).
        .join(''); // Gabungkan kembali menjadi string
}

// Fungsi Decode
function decode(code) {
    return code
        .toUpperCase()
        .split('')
        .map(ch => decodeMap[ch] || ch)
        .join('');
}

// === PENGHUBUNG HTML & JAVASCRIPT (DOM MANIPULATION) ===

// Mengambil elemen-elemen dari HTML berdasarkan ID
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const outputLabel = document.getElementById('outputLabel');
const btnEncode = document.getElementById('btnEncode');
const btnDecode = document.getElementById('btnDecode');
const btnCopy = document.getElementById('btnCopy');

function updateOutput(transform, labelText) {
    const teksInput = inputText.value;
    outputText.value = transform(teksInput);
    outputLabel.innerText = labelText;
}

btnEncode.addEventListener('click', () => {
    updateOutput(encode, 'Teks yang hanya dimengerti oleh teks itu sendiri.');
});

btnDecode.addEventListener('click', () => {
    updateOutput(decode, 'Teks yang bisa kamu interpretasikan.');
});

async function copyOutput() {
    const teksOutput = outputText.value;

    if (!teksOutput) {
        btnCopy.textContent = 'Kosong';
        window.setTimeout(() => {
            btnCopy.textContent = 'Copy';
        }, 1200);
        return;
    }

    try {
        await navigator.clipboard.writeText(teksOutput);
    } catch (error) {
        outputText.focus();
        outputText.select();
        document.execCommand('copy');
        outputText.setSelectionRange(outputText.value.length, outputText.value.length);
    }

    btnCopy.textContent = 'Copied';
    window.setTimeout(() => {
        btnCopy.textContent = 'Copy';
    }, 1200);
}

btnCopy.addEventListener('click', copyOutput);

function initMusCustomCursor() {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches || reducedMotionQuery.matches) {
        return;
    }

    const root = document.documentElement;
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    const interactiveSelector = 'a, button, input, textarea, select, summary, [role="button"], [data-cursor="hover"]';
    const textSelector = 'input, textarea, [contenteditable="true"], p, span, h1, h2, h3, h4, h5, h6, label, li, blockquote, code, pre';
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let rafId = null;

    dot.className = 'mus-cursor-dot';
    ring.className = 'mus-cursor-ring';
    document.body.append(dot, ring);
    root.classList.add('mus-custom-cursor-enabled');

    function render() {
        ringX += (pointerX - ringX) * 0.18;
        ringY += (pointerY - ringY) * 0.18;

        dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%) scale(var(--mus-cursor-dot-scale, 1))`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(var(--mus-cursor-ring-scale, 1))`;
        rafId = window.requestAnimationFrame(render);
    }

    function setVisibility(isVisible) {
        dot.classList.toggle('is-visible', isVisible);
        ring.classList.toggle('is-visible', isVisible);
    }

    function updatePointer(event) {
        pointerX = event.clientX;
        pointerY = event.clientY;

        if (!dot.classList.contains('is-visible')) {
            ringX = pointerX;
            ringY = pointerY;
            setVisibility(true);
        }

        const target = event.target;
        const isHoverTarget = target instanceof Element && target.closest(interactiveSelector);
        const isTextTarget = target instanceof Element && target.closest(textSelector);

        dot.classList.toggle('mus-cursor-hover', Boolean(isHoverTarget));
        ring.classList.toggle('mus-cursor-hover', Boolean(isHoverTarget));
        root.classList.toggle('mus-cursor-over-text', Boolean(isTextTarget));
    }

    function pressCursor() {
        dot.classList.add('mus-cursor-click');
        ring.classList.add('mus-cursor-click');
    }

    function releaseCursor() {
        dot.classList.remove('mus-cursor-click');
        ring.classList.remove('mus-cursor-click');
    }

    document.addEventListener('pointermove', updatePointer, { passive: true });
    document.addEventListener('pointerdown', pressCursor, { passive: true });
    document.addEventListener('pointerup', releaseCursor, { passive: true });
    document.addEventListener('pointercancel', releaseCursor, { passive: true });
    document.addEventListener('mouseleave', () => {
        setVisibility(false);
        root.classList.remove('mus-cursor-over-text');
    });
    window.addEventListener('blur', () => {
        setVisibility(false);
        releaseCursor();
    });

    render();

    window.addEventListener('beforeunload', () => {
        if (rafId) {
            window.cancelAnimationFrame(rafId);
        }
    });
}

initMusCustomCursor();
