export default function getFileSize(bytes, si = true) {
    var thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return {
            value: bytes,
            unit: 'B'
        };
    }
    var units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return {
        value: bytes.toFixed(0),
        unit: units[u]
    };
}