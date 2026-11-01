// ==UserScript==
// @name     Youtube Focus Mode
// @namespace https://jaziljafar.com/
// @version 1.0.0
// @description  A simple script to make youtube less distracting
// @author   Jazil Jafar
// @match   https://*.youtube.com/*
// @grant  none
// ==/UserScript==
(function(){
    'use strict';
    const style = document.createElement('style');
    style.textContent = `
      ytd-reel-shelf-renderer,
      ytd-guide-entry-renderer a[title="Shorts"] {
        display: none !important;  
      }
    `;
    document.head.appendChild(style);
    console.log("Focus Mode: Shorts hidden")
})();