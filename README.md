# Eleventy Filter Relative URL

This `relativeUrl` filter was created for outputs that don't internally depend
on the absolute path to their files.  I made it to deploy my
[Eleventy](https://11ty.dev) static site on [IPFS](https://ipfs.io/).

## Installation

The easiest way to install this is to enable it in your `.eleventy.js` as a
replacement for the `url` filter:

```js
const relativeUrl = require('eleventy-filter-relative-url');

module.exports = function(eleventyConfig) {
  // Override the default `url` filter with a relative one.
  eleventyConfig.addFilter('url', relativeUrl);
}
```

## Usage

The `relativeUrl` filter is sensitive to the rendering context, so it should be able to (without any arguments) generate the relative URL from the current page to the target.

Say you are in `/some/page/markdown.md`.  The following input:

```html
<!-- in /some/page/markdown.md -->
This is a <a href="{{ /some/where/else | url }}">relative link</a>
```

will expand with a relative link, like this:

```html
<!-- written to _site/some/page/markdown/index.html -->
This is a <a href="../../where/else/index.html">relative link</a>
```

## Reporting bugs

Please make issues on
https://github.com/michaelfig/eleventy-filter-relative-url/issues .

## Thanks

Thanks for the [11ty Github discussion](https://github.com/11ty/eleventy/issues/648#issuecomment-596718708) that got me started.

Thanks to `Raymond Camden#0144` on the 11ty Discord for the key insight that we
can find the `page`'s context via the `this` variable of a JS filter function (but
not an arrow-function, since those aren't `this`-sensitive).

Also, thanks to the 11ty community in general.  I'm glad to be able to contribute.

Michael FIG <michael+11ty@fig.org>, 2021-12-05
