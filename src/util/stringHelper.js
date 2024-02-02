const decode = require('unescape');

const toTitleCase = (str) => {
    switch (typeof str) {
        case 'string':
            return str
                .toLowerCase()
                .split(' ')
                .map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                })
                .join(' ');
        case 'number':
            return str;
        case 'object':
        default:
    }

    if (Array.isArray(str)) {
        return str.map((ss) => toTitleCase(ss));
    }
};

const toCamelCase = (str) =>
    str && typeof str === 'string'
        ? str
              .replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) =>
                  idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()
              )
              .replace(/\s+/g, '')
        : '';

const toDashCase = (str) =>
    str && typeof str === 'string'
        ? toCamelCase(str)
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .toLowerCase()
        : '';

const toUnderscoreCase = (str) =>
    str && typeof str === 'string'
        ? _toCamelCase(str)
              .replace(/([a-z])([A-Z])/g, '$1_$2')
              .toLowerCase()
        : '';

const joinConjugation = (arr, conjugation = 'and') =>
    Array.isArray(arr) && arr.length > 1
        ? arr.slice(0, -1).join(', ') +
          (arr.length > 2 ? ', ' : ' ') +
          (typeof conjugation === 'string' ? conjugation : 'and') +
          ' ' +
          arr.slice(-1)
        : arr;

const uuidv4 = () => {
    return 'xxx4xxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

const escapeStr = (str) => {
    return decode(str);
};

const splitAt = (str, pattern = ' ') => {
    const index = str.indexOf(pattern);
    return [str.substr(0, index).trim(), str.substr(index + 1).trim()];
};

const nthNumber = (num) => {
    switch (String(num)) {
        case '1':
            return '1st';
        case '2':
            return '2nd';
        case '3':
            return '3rd';
        default:
            return num + 'th';
    }
};

const markup = (str) => {
    switch (typeof str) {
        case 'object':
            if (Array.isArray(str)) {
                return str.map(markup);
            }
        case 'string':
            break;
        default:
            return str;
    }

    //Handle Lists
    str = str.replace(/\n- +([^\n]+)/g, '\n<li>$1</li>');
    str = str.replace(/(\<li>.+?\<\/li>\n*)+,?/gs, (match) => {
        return `<ul class="list-body">\n${match.trim()}\n</ul>\n\n`;
    });

    //Handle Link
    str = str.replace(/(\[[^\[]+\]\(.*\))/g, (string, match) => {
        const matches = match.match(/\[([^\[]+)\]\((.*)\)/);

        return `<a href='${matches[2]}' rel='noopener'>${matches[1]}</a>`;
    });

    //Handle styling
    str = str.replace(
        /\*\*\*([^\*]+)\*\*\*/g,
        (string, match) =>
            `<strong class='text-bold-italics'><em>${match}</em></strong>`
    );

    str = str.replace(
        /\*\*([^\*]+)\*\*/g,
        (string, match) => `<strong class='text-bold'>${match}</strong>`
    );

    str = str.replace(
        /\*([^\*]+)\*/g,
        (string, match) => `<em class='text-italics'>${match}</em>`
    );

    str = str.replace(/\^\^/g, '<br />');

    str = str.replace(
        /\^([^^]+)\^/g,
        (string, match) => `<sup class='text-superscript'>${match}</sup>`
    );

    str = str.replace(
        /,,([^,]+),,/g,
        (string, match) => `<sup class='text-subscript'>${match}</sup>`
    );

    str = str.replace(
        /\[\[\[+([^\]]+)\]\]\]+/g,
        (string, match) => `<div class="castle-body">${match.trim()}</div>`
    );

    str = str.replace(/-----\n/g, '<hr />');

    str = str.replace(/ *--- */g, '&mdash;');

    str = str.replace(/ *-- */g, '&ndash;');

    str = str.replace(/&nbsp;/g, ' ');

    str = str.replace(/&rsquo;/g, "'");

    str = str.replace(
        /(\{one-action\}|\[\[one-action\]\])/g,
        () => `<span class="pf2e-action one-action">1</span>`
    );

    str = str.replace(
        /(\{two-action\}|\[\[two-action\]\])/g,
        () => `<span class="pf2e-action two-action">2</span>`
    );

    str = str.replace(
        /(\{three-action\}|\[\[three-action\]\])/g,
        () => `<span class="pf2e-action three-action">3</span>`
    );

    str = str.replace(
        /(\{reaction\}|\[\[reaction\]\])/g,
        () => `<span class="pf2e-action reaction">R</span>`
    );

    str = str.replace(
        /(\{free-action\}|\[\[free-action\]\])/g,
        () => `<span class="pf2e-action free-action">F</span>`
    );

    str = str.replace(/  +/g, ' ');

    return str;
};

module.exports = {
    toTitleCase,
    toCamelCase,
    toDashCase,
    toUnderscoreCase,
    joinConjugation,
    uuidv4,
    escapeStr,
    nthNumber,
    markup,
    splitAt,
};
