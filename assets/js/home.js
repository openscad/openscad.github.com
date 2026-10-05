"use strict";

let fileinfo = {};

function setSnapshotFileInfo(key, name, size, url) {
    fileinfo[`${key}_NAME`] = name;
    fileinfo[`${key}_SIZE`] = size;
    fileinfo[`${key}_URL`] = url;
    fileinfo[`${key}_ASC_URL`] = `${url}.asc`;
    fileinfo[`${key}_SHA256_URL`] = `${url}.sha256`;
    fileinfo[`${key}_SHA512_URL`] = `${url}.sha512`;
}

const doUpdateDownloadLink = () => {
    const armPatterns = ['arm', 'armv', 'aarch', 'aarch64', 'arm64;', 'android'];
    const x64Patterns = ['x86_64', 'x86-64', 'win64', 'x64;', 'amd64', 'wow64', 'x64_64',];
    const isArm = () => { return armPatterns.some((pattern) => userAgent.includes(pattern))};
    const isX64 = () => { return x64Patterns.some((pattern) => userAgent.includes(pattern))};
    
    const appVersion = navigator.appVersion.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();
    
    let OSName = "Unknown OS";
    let DLName = "OpenSCAD";
    let downloadLink = "";
    let downloadLinkDirect = false;
    
    console.debug('Architecture detection:', isArm() ? 'arm' : isX64() ? 'x64' : 'unknown');
    
    if(appVersion.includes("win")) {
        OSName = "Windows";
        if(isArm()) {
            // Currently not available.
        } else if(isX64()) {
            DLName = fileinfo['WIN64_RELEASE_INSTALLER_NAME'];
            downloadLink = fileinfo['WIN64_RELEASE_INSTALLER_URL'];
            downloadLinkDirect = true;
        } else {
            DLName = fileinfo['WIN32_RELEASE_INSTALLER_NAME'];
            downloadLink = fileinfo['WIN32_RELEASE_INSTALLER_URL'];
            downloadLinkDirect = true;
        }
    } else if(appVersion.includes("mac")) {
        OSName = "Mac OS X";
        DLName = fileinfo['MAC_RELEASE_NAME'];
        downloadLink = fileinfo['MAC_RELEASE_URL'];
        downloadLinkDirect = true;
    } else if(appVersion.includes("x11") || appVersion.includes("linux")) {
        OSName = "Linux";
        DLName = fileinfo['LIN64_RELEASE_NAME'];
        downloadLink = "downloads.html#linux";
    }
    
    if(0 < downloadLink.length) {
        document.querySelector('#home-download a#download-link').href = downloadLink;
    }
    if(downloadLinkDirect) {
        document.querySelector('#home-download a#download-link').setAttribute('download', '');
    }
    document.querySelector('#home-download-link h4').textContent = `${DLName} for ${OSName}`;
}

const doCreateSidebarNews = async () => {
    const sidebarList = document.querySelector('#sidebar ul');
    if(!sidebarList) return;
    let res;
    try {
        res = await fetch('news.html');
    } catch (err) {
        console.error('Failed to load news.html:', err);
        return;
    }
    if(!res.ok) {
        console.error(`Could not load news.html but got HTTP ${res.status}`);
        return;
    }
    
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    
    const entries = doc.querySelectorAll('article section');
    
    let i = 0;
    for (const entry of entries) {
        if(i >= 3) return;
        
        const content = entry.querySelector('.entry')?.innerHTML ?? '';
        const date = entry.querySelector('.date')?.innerHTML ?? '';
        const id = entry.id ? `#${entry.id}` : '';
        const title = entry.querySelector('.title')?.innerHTML ?? '';
        
        const shortContent = content.trim().split(/\s+/).slice(0, 15).join(' ').replace(/\s+$/, '') + (content.trim().split(/\s+/).length > 15 ? '...' : '');
        
        sidebarList.insertAdjacentHTML(
            'beforeend',
            `<li style="padding-bottom:10px;">
                    <strong><small>${date}</small></strong><br>
                    <a class="underline" href="news.html${id}">${title}</a><br>
                    <small>${shortContent}</small>
                </li>
                <br class="clear">`
        );
        
        i++;
    }
};

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', doUpdateDownloadLink);
    document.addEventListener('DOMContentLoaded', doCreateSidebarNews);
} else {
    doUpdateDownloadLink();
    doCreateSidebarNews().then();
}
