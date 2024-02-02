class Kaiser {
    constructor() {
        console.time('Kaiser');
        this.options = { target: process.argv[2] || '' };

        const corePageData = colatePages(this.target);

        console.log('parsing', Object.keys(corePageData));

        this.data = {};
    }
}


exports.kaiser = new Kaiser();