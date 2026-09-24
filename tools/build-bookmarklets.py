#!/usr/bin/env python3
"""Regenerate installer drag buttons from their readable source.

An installer can keep its bookmarklet's readable code in
<script id="bookmarklet-source" type="text/plain">. This script encodes that code
as a javascript: URL (like encodeURIComponent) and writes it into the href of the
page's <a class="bookmarklet"> button. Run it from the repo root after editing a
source block:

    python3 tools/build-bookmarklets.py
"""
import pathlib
import re
import sys
from urllib.parse import quote

SOURCE = re.compile(r'<script id="bookmarklet-source" type="text/plain">\n(.*?)</script>', re.S)
BUTTON = re.compile(r'(<a\b[^>]*\bclass="bookmarklet"[^>]*\bhref=")[^"]*(")')

root = pathlib.Path(__file__).resolve().parent.parent
changed = 0
for page in sorted(root.glob('*.html')):
    text = page.read_text(encoding='utf-8')
    source = SOURCE.search(text)
    if not source:
        continue
    if len(BUTTON.findall(text)) != 1:
        sys.exit(f'{page.name}: expected exactly one <a class="bookmarklet" href="…">')
    url = 'javascript:' + quote(source.group(1).strip(), safe="'()!*")
    updated = BUTTON.sub(lambda m: m.group(1) + url + m.group(2), text)
    if updated != text:
        page.write_text(updated, encoding='utf-8')
        changed += 1
        print(f'{page.name}: updated ({len(url):,} characters)')
    else:
        print(f'{page.name}: already up to date')
print(f'{changed} page(s) changed')
