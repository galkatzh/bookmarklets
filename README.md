# Bookmarklets

Small tools that live in your bookmarks bar. The catalog is at <https://bookmarklets.galk.cc>.

Each bookmarklet has its own installer page: an `.html` file in this folder with a
link you drag to the bookmarks bar. The index page (`index.html`) finds the installers and lists
them on its own, so adding a bookmarklet never means editing the index.

## Adding a bookmarklet

Add an installer page to the root of the repo. Put these tags in its `<head>`:

```html
<meta name="bookmarklet:name" content="Short name">
<meta name="description" content="One or two sentences on what it does and how to use it.">
<meta name="bookmarklet:works-on" content="Which sites or pages it runs on">
<meta name="bookmarklet:data" content="What, if anything, leaves the browser and where it goes">
```

| Tag | Required | Shown on the index as |
| --- | --- | --- |
| `bookmarklet:name` | Yes. Pages without it are not listed. | Card title |
| `description` | Recommended | Card text |
| `bookmarklet:works-on` | Recommended | "Works on" line |
| `bookmarklet:data` | Recommended | "Data" line |

Values are plain text. Cards are sorted by name.

## Page layout

All pages share `style.css`, a minimal layout with warm colors and automatic dark mode. Link it in
the installer's `<head>` and use this structure for the body:

```html
<link rel="stylesheet" href="style.css">
…
<main>
  <p class="back"><a href="./">← All bookmarklets</a></p>
  <h1>Short name</h1>
  <p class="lead">One line on what it does.</p>

  <div class="install-box">
    <a class="bookmarklet" href="javascript:…">Bookmark name</a>
    <p class="hint">Drag this button to your bookmarks bar.</p>
  </div>

  <ol>
    <li>How to use it, step by step.</li>
  </ol>

  <p class="note">What data leaves the browser, and any caveats.</p>
</main>
```

Page-specific rules can go in a small `<style>` block after the stylesheet link.

The drag button's `href` must hold the full `javascript:` URL in the HTML itself, not one set by a
script. The index reads it from there to build the bookmarks file.

## Bookmarks file

The index offers a "Download all as a bookmarks file" link. It builds a standard bookmarks file (the
format browsers import from their bookmark manager) with every bookmarklet. They sit in a folder
marked as the bookmarks toolbar, which Firefox imports straight onto the toolbar rather than into
a new folder. Each bookmark is named after its drag button's label and gets an icon: the first letter of
`bookmarklet:name` on a terracotta square. Browsers give bookmarklets dragged to the bar a generic
icon, but an imported file can carry its own. Firefox should show these icons; other browsers may
ignore them.

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
