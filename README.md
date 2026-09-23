# Bookmarklets

Small tools that live in your bookmarks bar. The catalog is at <https://bookmarklets.galk.cc>.

Each bookmarklet has its own installer page: a self-contained `.html` file in this folder with a
link you drag to the bookmarks bar. The index page (`index.html`) finds the installers and lists
them on its own, so adding a bookmarklet never means editing the index.

## Adding a bookmarklet

Add an installer page to the root of the repo. Put these tags in its `<head>`:

```html
<meta name="bookmarklet:name" content="Short name">
<meta name="description" content="One or two sentences on what it does and how to use it.">
<meta name="bookmarklet:icon" content="🔧">
<meta name="bookmarklet:works-on" content="Which sites or pages it runs on">
<meta name="bookmarklet:data" content="What, if anything, leaves the browser and where it goes">
```

| Tag | Required | Shown on the index as |
| --- | --- | --- |
| `bookmarklet:name` | Yes. Pages without it are not listed. | Card title |
| `description` | Recommended | Card text |
| `bookmarklet:icon` | No | An emoji before the title |
| `bookmarklet:works-on` | Recommended | "Works on" line |
| `bookmarklet:data` | Recommended | "Data" line |

Values are plain text. Cards are sorted by name. Also add a link back to the index near the top of
the page:

```html
<p><a href="./">← All bookmarklets</a></p>
```

## How the index finds installers

GitHub Pages builds this site with Jekyll. The front matter at the top of `index.html` makes Jekyll
write the list of every `.html` file in the site into the page. When the index loads, it fetches
each of those files, keeps the ones that have `bookmarklet:name`, and builds a card from their tags.

This only works on the built site. Opening `index.html` straight from disk shows a message instead
of the list. To preview locally, install Jekyll 3.10 (the version GitHub Pages uses) and run:

```sh
jekyll serve
```

Don't add a `.nojekyll` file: it turns off the Jekyll build and the index would find nothing.
