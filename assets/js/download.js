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

const doCreateNews = () => {
    for (const [fileid, value] of Object.entries(fileinfo)) {
        if(fileid.endsWith('_URL')) {
            document.querySelector(`a[id="${fileid}"]`)?.setAttribute('href', value);
        } else {
            const el = document.getElementById(fileid);
            if(el) el.textContent = value;
        }
    }
};

const showReleaseCandidate = () => {
    document.querySelector('#rc')?.style.removeProperty('display');
    document.querySelector('#nav-rc')?.style.removeProperty('display');
};

// Failsafe loading pattern.
if(document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", doCreateNews);
} else {
    doCreateNews();
}
