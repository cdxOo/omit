'use strict';
module.exports = (filter, src) => {
    var out = {};
    
    var check = (value, key) => {
        // filter will be an object when this function is called
        var condition = filter[key],
            shouldOmit = false;

        if (typeof condition === 'function') {
            shouldOmit = condition(value);
        }
        else {
            shouldOmit = condition;
        }

        return shouldOmit;
    };

    if (Array.isArray(filter)) {
        filter = filter.reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
        );
    }
    else if (typeof filter === 'object') {
        // nothing to do
    }
    else if (typeof filter === 'function') {
        check = filter;
        filter = undefined;
    }
    else {
        filter = { [filter]: true }
    }

    Object.keys(src).forEach(key => {
        var value = src[key],
            shouldOmit = false;

        shouldOmit = check(value, key);

        if (!shouldOmit) {
            out[key] = value;
        }
    });

    return out;
};
