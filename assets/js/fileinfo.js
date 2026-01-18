function setSnapshotFileInfo(key, name, size, url) {
    fileinfo[key + "_NAME"] = name;
    fileinfo[key + "_SIZE"] = size;
    fileinfo[key + "_URL"] = url;
    fileinfo[key + "_ASC_URL"] = url + ".asc";
    fileinfo[key + "_SHA256_URL"] = url + ".sha256";
    fileinfo[key + "_SHA512_URL"] = url + ".sha512";
}
jQuery(document).ready(function () {
    for (var fileid in fileinfo) {
        if (fileid.indexOf("_URL") >= 0) {
            $("a[id=" + fileid + "]").attr('href', fileinfo[fileid]);
        } else {
            $("#" + fileid).text(fileinfo[fileid]);
        }
    }
});