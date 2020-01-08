// misc useful functions -- very simple JQuery alternative
class __ {
    /**
     * deep merge
     */
    static merge() {
        // Variables
        const extended = {};
        let i = 0;

        // Merge the object into the extended object
        const _merge = function (obj) {
            for (let prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    if (Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        // If we're doing a deep merge and the property is an object
                        extended[prop] = __.merge(extended[prop], obj[prop]);
                    } else {
                        // Otherwise, do a regular merge
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        // Loop through each object and conduct a merge
        for (; i < arguments.length; i++) {
            _merge(arguments[i]);
        }

        return extended;
    };

    static ach(parent, element) {
        return parent.appendChild(element);
    };

    static ib(parent, newNode, referenceNode) {
        parent.insertBefore(newNode, referenceNode);
        return newNode;
    }

    static ctn(text, parent = false) {
        const node = document.createTextNode(text);
        if (parent) {
            this.ach(parent, node);
        }
        return node;
    };

    static props(element, props) {
        for (let key in props) {
            if (props[key] === "undefined") {
                continue;
            }
            if (key === 'text' || key === 'innerText') {
                this.ctn(props[key], element);
                continue;
            }
            if (key === 'class') {
                typeof props[key] === "object" ? element.classList.add(...props[key]) : element.classList.add(props[key]);
                continue;
            }
            if (typeof props[key] === "object") {
                this.props(element[key], props[key]);
                continue;
            }
            element[key] = props[key];
        }
    };

    static attrs(element, attributes) {
        for (let key in attributes) {
            if (attributes[key] === "undefined") {
                continue;
            }
            element.setAttribute(key, attributes[key]);
        }
    }

    static cel(tag, properties = {}, parent = null) {
        const node = document.createElement(tag);
        if (parent) {
            this.ach(parent, node);
        }
        this.props(node, properties);
        return node;
    };

    static imp(id) {
        return document.importNode(__.gid(id).content, true).firstElementChild
    }

    static gid(id) {
        return document.getElementById(id);
    }

    static clr(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    /**
     *
     * @param selector string
     * @param parentElement HTMLElement
     * @returns {HTMLElement|null}
     */
    static q(selector, parentElement = document) {
        let result = parentElement.querySelector(selector);
        if (!(result instanceof HTMLElement)) {
            throw `Can't find element with selector ${selector}`;
        }
        return result;
    }

    static qq(selector, element = document) {
        let result = element.querySelectorAll(selector);
        return Array.from(result);
    }

    /**
     * current time in seconds
     * @returns {number}
     */
    static now() {
        return Math.round(new Date().getTime() / 1000);
    }

    static isDescendant(parent, child) {
        let node = child.parentNode;
        while (node != null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
}
