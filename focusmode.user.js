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
    ytd-browse[page-subtype="home"] ytd-rich-grid-renderer {
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
    toggle.style.background = '#222';
    toggle.style.color = 'white';
    toggle.style.border = 'none';
    toggle.style.borderRadius = '8px';
    toggle.style.cursor = 'pointer';
    document.body.appendChild(toggle);
    let focusMode = true;
    toggle.addEventListener('click', () => {
      focusMode = !focusMode;
      style.disabled = !focusMode;
      toggle.textContent = `Focus Mode: ${focusMode ? 'ON' : 'OFF'}`;
    })
    const observer = new MutationObserver(()=> {
        document.querySelectorAll(
            'ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer'
        ).forEach(video => {
            if(video.querySelector('a[href*="/shorts/"]')){
                video.style.display = focusMode ? 'none' : '';
            }
        })
    })
    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
    console.log("Focus Mode: Shorts hidde");
})();