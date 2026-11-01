"use strict";

let fileinfo = {};

function setSnapshotFileInfo(key, name, size, url) {
    fileinfo[`${key}_NAME`] = name;
    fileinfo[`${key}_SIZE`] = size;
    fileinfo[`${key}_URL`] = url;
    fileinfo[`${key}_ASC_URL`] = `${url}.asc`;
    fileinfo[`${key}_SHA256_URL`] = `${url}.sha256`;
    fileinfo[`${key}_SHA512_URL`] = `${url}.sha512`;
    if (document.readyState !== "loading") {
        updateDownloadLinks();
    }
}

const updateDownloadLinks = () => {
    for (const [fileid, value] of Object.entries(fileinfo)) {
        if(fileid.endsWith('_URL')) {
            const link = document.querySelector(`a[id="${fileid}"]`);
            if(link) {
                link.setAttribute('href', value);
                link.closest('.download-button')?.style.removeProperty('display');
            }
        } else {
            const el = document.getElementById(fileid);
            if(el) el.textContent = value;
        }
    }
};

const showReleaseCandidate = () => {
    const show = () => {
        document.querySelector('#rc')?.style.removeProperty('display');
        document.querySelector('#nav-rc')?.style.removeProperty('display');
        updateDownloadLinks();
    };
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", show);
    } else {
        show();
    }
};

// Failsafe loading pattern.
if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateDownloadLinks);
} else {
    updateDownloadLinks();
}
