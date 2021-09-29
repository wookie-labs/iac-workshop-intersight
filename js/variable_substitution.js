/** @type {Renderer} */
class HTMLRenderer {
    /**
     * Creates a new HTMLRenderer
     *
     * @param {Tree} parseTree - the parse tree (must support `walk` API)
     * @param {{classPrefix: string}} options
     */
    constructor(parseTree, options) {
        this.buffer = "";
        this.classPrefix = options.classPrefix;
        parseTree.walk(this);
    }

    /**
     * Adds texts to the output stream
     *
     * @param {string} text */
    addText(text) {
        this.buffer += escapeHTML(this.renderVars(text));
    }


    /**
     * Applies string interpolation from localStorage values
     *
     * @param {string} text */
    renderVars(text) {
        // console.log(text);
        const contains_curlies = /\{\{.*?\}\}/g
        let matches = text.match(contains_curlies);
        if (matches && matches.length > 0) {
            const p = matches[0].replace('{{','').replace('}}','').trim();
            return text.replace(contains_curlies, localStorage.getItem(p) != null ? localStorage.getItem(p) : 'X');
        }
        return text;
    }

    /**
     * Adds a node open to the output stream (if needed)
     *
     * @param {Node} node */
    openNode(node) {
        if (!emitsWrappingTags(node)) return;

        let scope = node.kind;
        if (node.sublanguage) {
            scope = `language-${scope}`;
        } else {
            scope = expandScopeName(scope, { prefix: this.classPrefix });
        }
        this.span(scope);
    }

    /**
     * Adds a node close to the output stream (if needed)
     *
     * @param {Node} node */
    closeNode(node) {
        if (!emitsWrappingTags(node)) return;

        this.buffer += SPAN_CLOSE;
    }

    /**
     * returns the accumulated buffer
    */
    value() {
        return this.buffer;
    }

    // helpers

    /**
     * Builds a span element
     *
     * @param {string} className */
    span(className) {
        // console.log(node);
        this.buffer += `<span class="${className}">`;
    }
}