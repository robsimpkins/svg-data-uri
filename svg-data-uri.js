(function (window) {
    'use strict';

    /**
     * @type Object Plugin instance
     */
    var _;

    /**
     * Create a new plugin instance.
     *
     * @param  Object options
     * @return void
     */
    var Plugin = function (options) {
        _ = this;
        _.options = extend(defaults, options);
        embed();
    };

    /**
     * @type Object Default plugin options
     */
    var defaults = {
        selector: '[svg-data-uri]',
        addClass: undefined,
        removeClass: undefined,
        base64: window.atob,
        utf8: window.decodeURIComponent
    };

    /**
     * Extract SVG source from data URI and embed in DOM.
     *
     * @return void
     */
    var embed = function () {
        // Find elements matching selector
        var elements = find(_.options.selector);

        // Iterate through elements and embed SVG in DOM
        elements.forEach(function (element) {
            // Extract and embed SVG source into DOM
            element.innerHTML = extract(element);

            // Add class(es) to element where specified via callback or appending string
            if (typeof _.options.addClass === 'function') {
                _.options.addClass.call(null, element);
            }
            else if (typeof _.options.addClass === 'string') {
                element.className += ' ' + _.options.addClass;
            }

            // Remove class(es) from element where specified via callback or removing string
            if (typeof _.options.removeClass === 'function') {
                _.options.removeClass.call(null, element);
            }
            else if (typeof _.options.removeClass === 'string') {
                _.options.removeClass.split(' ').forEach(function (remove) {
                    element.className = element.className.replace(new RegExp('\\b' + remove + '\\b'), '');
                });
            }
        });
    };

    /**
     * Extract and decode SVG from data URI.
     *
     * @param  Object element
     * @return String
     */
    var extract = function (element) {
        // Get computed element styles
        var styles = window.getComputedStyle(element),
            uri = styles['background-image'].replace(/url\("?([^"]*)"?\)/gi, '$1') || '',
            expression = /data:image\/svg\+xml;(.*),(.*)/g,
            matches = null;

        // Match encoding and data in URI
        if ( ! (matches = expression.exec(uri))) return '';

        // Extract encoding and data from matches
        var encoding = matches[1],
            data = matches[2];

        // Decode data
        switch (encoding) {
            case 'base64':
                return _.options.base64.call(null, data);
            case 'utf8':
                return _.options.utf8.call(null, data);
            default:
                return '';
        }
    };

    /**
     * Find DOM elements matching selector.
     *
     * @param  String selector
     * @return Array
     */
    var find = function (selector) {
        return [].slice.call(document.querySelectorAll(selector));
    };

    /**
     * Utility function to merge the properties of two or more objects onto the first.
     *
     * @param  ...Object
     * @return Object
     */
    var extend = function () {
        // Prepare extended and extension objects
        var extended = {},
            extensions = [].slice.call(arguments);

        // Iterate through remaining extensions
        extensions.forEach(function (extension) {
            // Check if extension is object
            if (typeof extension !== 'object') return;

            // Append extension properties to extended object
            for (var property in extension) {
                if (extension.hasOwnProperty(property)) extended[property] = extension[property];
            }
        });

        return extended;
    };

    // Check for CommonJS support
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = Plugin;
    }
    // Fallback to window object
    else {
        window.SvgDataUri = Plugin;
    }
})(window);
