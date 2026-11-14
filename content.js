// Writed by me not ai - above is the userscript header for a script that do our job it have info like where it runs,authors,and description,name,version etc
//  the next code is like using css based to hide like short shelvesd and section hat have short shevles,shorts sidebar like ,grid shorts,in home fees,one like shorts items and etc
(function () {
    'use strict';
   const style = document.createElement('style');
style.textContent = `
   yt-lockup-view-model:has(a[href*="/shorts/"]),
ytd-rich-grid-slim-media:has(a[href*="/shorts/"]),
ytd-rich-grid-media:has(a[href*="/shorts/"]),
ytd-reel-video-renderer:has(a[href*="/shorts/"]),
ytm-shorts-lockup-view-model,
    ytd-reel-shelf-renderer,
    ytd-reel-item-renderer,
    ytd-rich-section-renderer:has(ytd-reel-shelf-renderer),
    ytd-rich-shelf-renderer:has(a[href*="/shorts/"]),
    ytd-guide-entry-renderer:has(a[href*="/shorts"]),
ytd-mini-guide-entry-renderer:has(a[href*="/shorts"]),
ytd-guide-entry-renderer:has(a[title="Shorts"]),
ytd-mini-guide-entry-renderer:has(a[title="Shorts"]),
    ytd-grid-video-renderer:has(a[href*="/shorts/"]),
    ytd-rich-item-renderer:has(a[href*="/shorts/"]),
    ytd-video-renderer:has(a[href*="/shorts/"]) {
        display: none !important;
    }
`;
document.head.appendChild(style);

const homeStyle = document.createElement('style'); 

homeStyle.textContent = `
    body.hide-home ytd-browse[page-subtype="home"] ytd-rich-grid-renderer {
        display: none !important;
    }
`;
document.head.appendChild(homeStyle);
    // i am jazil not ai so next we are apppending the style to the youtube
    // next we are creating a button to toggle focus mode on or off like someone wanted it can on
    const toggle = document.createElement('button');
    const hometoggle = document.createElement('button');
    let focusmode = true;
let hidehome = false;
let hidecomments = false;
    const commentstyle = document.createElement('style');
    commentstyle.textContent = `
      body.hide-comments ytd-comments#comments {
        display: none !important;
      }
    `;
    document.head.appendChild(commentstyle);
    const commentbtn = document.createElement('button');
    // eveytime it is like on
    toggle.textContent = 'Focus Mode: ON';
    // next we are giving styles
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
    // We are giving styles to that button for disbalng home recomedations
    hometoggle.textContent = 'Hide Home: OFF';
    hometoggle.style.position = 'fixed';
    hometoggle.style.bottom = '60px';
    hometoggle.style.right = '20px';
    hometoggle.style.zIndex = '9999';
    hometoggle.style.padding = '12px 18px';
    hometoggle.style.background = '#181818';
    hometoggle.style.border = '1px solid #444';
    hometoggle.style.borderRadius = '8px';
    hometoggle.style.cursor = 'pointer';
    // next for comment button
    commentbtn.textContent = 'Hide Comments: OFF';
    commentbtn.style.position = 'fixed';
    commentbtn.style.bottom = '100px';
    commentbtn.style.right = '20px';
    commentbtn.style.zIndex = '9999';
    commentbtn.style.padding = '12px 18px';
    commentbtn.style.background = '#181818';
    commentbtn.style.border = '1px solid #444';
    commentbtn.style.borderRadius = '8px';
    commentbtn.style.cursor = 'pointer';
    commentbtn.style.color = 'white';
    document.body.appendChild(hometoggle);
    document.body.appendChild(commentbtn);
    // We are next saying what to do when that hometoggle button clicked like it will do tha home recomedation off
    hometoggle.addEventListener('click', () =>{
        hidehome = !hidehome;
        document.body.classList.toggle('hide-home', hidehome);
        hometoggle.textContent = `Hide Home: ${hidehome ? 'ON' : 'OFF'}`;
    });
    // next about comment button
    commentbtn.addEventListener('click', () =>{
        hidecomments = !hidecomments;
        document.body.classList.toggle('hide-comments', hidecomments);
        commentbtn.textContent = `Hide Comments: ${hidecomments ? 'ON' : 'OFF'}`;
    })
    document.body.appendChild(toggle);
    toggle.addEventListener('mouseenter' , () => {
        toggle.style.background = '#333';
    });
    toggle.addEventListener('mouseleave', () => {
        toggle.style.background = '#181818';
    });
    // next like when it clicked that on or off like ut will hide or show that its function is next saying
    toggle.addEventListener('click', () => {
      focusmode = !focusmode;
      style.disabled = !focusmode;
      toggle.textContent = `Focus Mode: ${focusmode ? 'ON' : 'OFF'}`;
toggle.style.borderColor = focusmode ? '#4caf50' : '#444';
      hideShorts();
    })
    // next it saying about that function called dometime before like hiding shorts
    function hideShorts() {
    document.querySelectorAll(
    'ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer, ytd-reel-item-renderer, yt-lockup-view-model, ytd-rich-grid-slim-media, ytd-rich-grid-media, ytd-reel-video-renderer, ytm-shorts-lockup-view-model'
).forEach(video => {
        const isShort = video.querySelector(
            'a[href*="/shorts/"]'
        );
        if (focusmode && isShort) {
            video.style.setProperty('display', 'none', 'important');
        } else {
            video.style.removeProperty('display');
        }
    });
}
    // it is acting like if clicked when it is hide it will make show and reverse using js funtion ? :
const observer = new MutationObserver(() => {
    hideShorts();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
hideShorts();
})();