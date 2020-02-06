export default function checkNestedKey(obj, args) {
    for (let i = 0; i < args.length; i++) {
        if (!obj || !obj.hasOwnProperty(args[i])) {
            return false;
        }
        obj = obj[args[i]];
    }
    return true;
}

/**
 * Usage: 
 * checkNestedKey(obj, ['level1', 'level2', 'level3']); // true
 * checkNestedKey(obj, ['level1', 'level2', 'foo']); // false
 */
