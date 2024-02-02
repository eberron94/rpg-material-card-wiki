exports.colatePages = (targets) => {
    const mdxFiles = {};

    targets.forEach((target) => {
        const files = readMarkdownFilesSync(target);
        Object.entries(files).forEach(([filePath, { content, metadata }]) => {
            mdxFiles['file-id'] = new ArtifactMDX(filePath, content, metadata);
        });
    });
};
