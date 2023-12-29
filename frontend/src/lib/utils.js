export function getTimeToText(time) {
    let res = "";

    if (time / (1000 * 60 * 60 * 24 * 365) >= 1) {
        res += parseInt(time / (1000 * 60 * 60 * 24 * 365)) + " yıl ";
        time = time % (1000 * 60 * 60 * 24 * 365);
    }
    if (time / (1000 * 60 * 60 * 24 * 30) >= 1) {
        res += parseInt(time / (1000 * 60 * 60 * 24 * 30)) + " ay ";
        time = time % (1000 * 60 * 60 * 24 * 30);
    }
    if (time / (1000 * 60 * 60 * 24 * 7) >= 1) {
        res += parseInt(time / (1000 * 60 * 60 * 24 * 7)) + " hafta ";
        time = time % (1000 * 60 * 60 * 24 * 7);
    }
    if (time / (1000 * 60 * 60 * 24) >= 1) {
        res += parseInt(time / (1000 * 60 * 60 * 24)) + " gün ";
        time = time % (1000 * 60 * 60 * 24);
    }
    if (time / (1000 * 60 * 60) >= 1) {
        res += parseInt(time / (1000 * 60 * 60)) + " saat ";
        time = time % (1000 * 60 * 60);
    }
    if (time / (1000 * 60) >= 1) {
        res += parseInt(time / (1000 * 60)) + " dakika ";
        time = time % (1000 * 60);
    }
    if (time / 1000 >= 1) {
        res += parseInt(time / (1000)) + " saniye ";
        time = time % 1000;
    }

    return res;
}