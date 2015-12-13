# SVG Data URI

A lightweight (1.2kb minified) JavaScript plugin for extracting SVGs from background image data URIs and embedding them into the DOM for further manipulation using CSS and JavaScript.

## Install
SVG Data URI can be installed with Bower or npm.
```
$ bower install svg-data-uri
$ npm install svg-data-uri
```

## Usage
```html
<i class="icon icon-home svg-home" svg-data-uri></i>
<script type="text/javascript" src="./svg-data-uri.js"></script>
<script type="text/javascript">
    new SvgDataUri();
</script>
```

### Configuration Options
  - `selector: '[svg-data-uri]'` - selector to match elements with SVGs that should be embedded.
  - `addClass: undefined` - a string or function to add class(es) to each matched element. The current element is passed to function arguments.
  - `removeClass: undefined` - a string or function to remove class(es) from each matched element. The current element is passed to function arguments.
  - `base64: window.atob` - function used to decode Base64 encoded data-URI values.
  - `utf8: window.decodeURIComponent` - function used to decode UTF-8 encoded data-URI values.

## Supported Browsers
SVG Data URI supports all modern browsers, including IE 10+.

The plugin will work with IE 9, but requires an external library for the decoding Base64 encoded data-URI values due to the unavailability of the `atob` function.

The tiny [base64](https://github.com/mathiasbynens/base64) library (1.5kb minified) has been included as a Bower dependency and provides a good fallback. Alternatively, you can specify your own.

```html
<script type="text/javascript" src="./bower_components/base-64/base64.js"></script>
<script type="text/javascript" src="./svg-data-uri.js"></script>
<script type="text/javascript">
    new SvgDataUri({
        base64: window.base64.decode
    });
</script>
```

## Contributing
Contributions are welcome and should be submitted as pull requests. Pull requests should include the unminified and minified scripts, updated demo HTML and an explanation of the changes you have made.

```
$ npm install
$ gulp build
```
