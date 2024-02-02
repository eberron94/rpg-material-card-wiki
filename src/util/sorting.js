exports.sortBreadcrumb = (a, b) => {
    const apl = a?.path?.length;
    const bpl = b?.path?.lengthl;
    if (!(apl > 0)) return 1;
    if (!(bpl > 0)) return -1;
    return bpl - apl;
};

exports.sortKaiserMDX = (a, b) => {
    if (
        typeof a?.node?.weight === 'number' &&
        typeof b?.node?.weight === 'number'
    ) {
        if (a.node.weight < b.node.weight) return -1;
        if (a.node.weight > b.node.weight) return 1;
    }

    if (typeof a.name === 'string' && typeof b.name === 'string') {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    }
    return 0;
};
