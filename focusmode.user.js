// ==UserScript==
// @name     Youtube Focus Mode
// @namespace https://jaziljafar.com/
// @version 1.0.0
// @description  A simple script to make youtube less distracting
// @author   Jazil Jafar
// @match   https://*.youtube.com/*
// @grant  none
// ==/UserScript==
(function () {
    'use strict';
    const style = document.createElement('style');
style.textContent = `
        ytd-reel-shelf-renderer,
        ytd-rich-section-renderer:has(ytd-reel-shelf-renderer),
        ytd-guide-entry-renderer a[href="/feed/shorts"],
         ytd-grid-video-renderer:has(a[href*="/shorts/"]),
    ytd-rich-item-renderer:has(a[href*="/shorts/"]) {
        display: none !important;
    }
    ytd-reel-item-renderer,
ytd-reel-shelf-renderer,
ytd-rich-shelf-renderer:has(a[href*="/shorts/"]) {
    display: none !important;
}
    `;
    document.head.appendChild(style);
    const toggle = document.createElement('button');
    toggle.textContent = 'Focus Mode: ON';
    toggle.style.position = 'fixed';
    toggle.style.bottom = '20px';
    toggle.style.right = '20px';
    toggle.style.zIndex = '9999';
    toggle.style.padding = '12px 18px';
    toggle.style.background = '#181818';
    toggle.style.border = '1px solid #444';
    toggle.style.fontSize = '13px';
    toggle.style.fontWeight = '600';
    toggle.style.transition = 'background 0.2s ease';
    toggle.style.color = 'white';
    toggle.style.borderRadius = '8px';
    toggle.style.cursor = 'pointer';
    document.body.appendChild(toggle);
    toggle.addEventListener('mouseenter' , () => {
        toggle.style.background = '#333';
    });
    toggle.addEventListener('mouseleave', () => {
        toggle.style.background = '#181818';
    })
    let focusMode = true;
    toggle.addEventListener('click', () => {
      focusMode = !focusMode;
      style.disabled = !focusMode;
      toggle.textContent = `Focus Mode: ${focusMode ? 'ON' : 'OFF'}`;
toggle.style.borderColor = focusMode ? '#4caf50' : '#444';
      hideShorts();
    })
    function hideShorts() {
    document.querySelectorAll(
        'ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer, ytd-reel-item-renderer'
    ).forEach(video => {
        const isShort = video.querySelector('a[href*="/shorts/"]');

        video.style.display = focusMode && isShort ? 'none' : '';
    });
}

const observer = new MutationObserver(() => {
    hideShorts();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
hideShorts();
})();