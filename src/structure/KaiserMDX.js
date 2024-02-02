class PageNode {
    constructor(slug, weight, name, navName, tabName) {
        this.slug = String(slug);
        this.weight = Number(weight);
        this.path = this.slug.split('/').filter((e) => e);
        this.name = String(name);
        this.navName = String(navName) || name;
        this.tabName = String(tabName) || name;
        this.children = {};
        this.parent = {};
        this.orphan = [];
    }

    get breadName() {
        return this.name;
    }

    get depth() {
        return this.path.length;
    }

    putChild(childNode) {
        const myNodeLevel = this.depth;
        const childNodeLevel = childNode.depth;

        //IGNORE INVALID CHILDREN
        if (
            childNodeLevel <= myNodeLevel ||
            !this.path.every((s, i) => childNode.path[i] === s)
        ) {
            return;
        }

        const nextLevelPath = childNode.path[myNodeLevel];

        //Check and handle grandchild
        if (this.children[nextLevelPath]) {
            console.trace(
                '[GRAND]',
                childNode.name,
                'is grandchild to',
                this.name
            );
            // this.children[nextLevelPath].putChild(childNode);
            return;
        }

        //Check and handle Direct child
        if (childNodeLevel === myNodeLevel + 1) {
            console.trace('[CHILD]', childNode.name, 'is child to', this.name);
            this.children[nextLevelPath] = childNode;
            childNode.parent = this;
            return;
        }

        //Handle Orphan
        console.trace('[ORPHN]', childNode.name, 'is an orphan to', this.name);
        this.orphans.push(childNode.name);
    }

    get navigationArray() {
        return Object.values(this.children).sort(PageNode.sort);
    }

    static sort(a, b) {
        if (typeof a.weight === 'number' && typeof b.weight === 'number') {
            if (a.weight < b.weight) return -1;
            if (a.weight > b.weight) return 1;
        }

        if (typeof a.name === 'string' && typeof b.name === 'string') {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        }
        return 0;
    }
}

class KaiserMDX {
    constructor(mdxArtifact) {

        this.node = new PageNode();//TODO FILL IN ARGS
    }

    static sort(a, b) {
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
    }
}

exports.KaiserMDX = KaiserMDX;
