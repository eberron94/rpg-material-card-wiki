const { toCamelCase } = require('../util/stringHelper');

const md = require('markdown-it')().use(require('markdown-it-anchor'), {});

const extractSidebar = (content) => {
    const index = content.indexOf('+++');
    if (index < 0) return [content, ''];
    const top = content.substring(0, index) || '';
    const footer = content.substring(index + 3) || '';

    return [top, footer];
};

class ArtifactMDX {
    constructor(filePath, fileBody, metadata, options) {
        const [body, sidebar] = extractSidebar(fileBody);
        const markupBody = md.render(body);
        const markupSidebar = md.render(sidebar);

        var indexAnchor = '/pages/';
        var index = filePath.indexOf(indexAnchor);

        // Move index in case of alternate target
        if (index === -1) {
            indexAnchor = `/pages/${options?.target}/`;
            index = filePath.indexOf(indexAnchor);
        }

        this.id = 'mdx' + toCamelCase(metadata.name);
        this.frontMatter = metadata;
        this.slug = filePath
            .substring(index + indexAnchor.length)
            .split('/')
            .filter((folderName) => !folderName.startsWith('_'))
            .join('/');
        this.html = markupBody
            .replace(/\<p/g, `<div class="p"`)
            .replace(/<\/p/g, `</div`);
        this.sidebar = markupSidebar
            .replace(/\<p/g, `<div class="p"`)
            .replace(/<\/p/g, `</div`);
    }
}

exports.ArtifactMDX = ArtifactMDX;
