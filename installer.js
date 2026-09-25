// Shared behavior for installer pages: a "Copy code" button for browsers that can't drag links
// to the bookmarks bar (iPhone, iPad), and a hint instead of running the bookmarklet when its
// button is clicked here.
(function () {
  const button = document.querySelector('.install-box a.bookmarklet');
  if (!button) return;
  const code = button.getAttribute('href');
  const box = button.closest('.install-box');

  const copy = Object.assign(document.createElement('button'), { type: 'button', textContent: 'Copy code' });
  const status = Object.assign(document.createElement('span'), { className: 'copy-status' });
  status.setAttribute('role', 'status');
  const row = Object.assign(document.createElement('div'), { className: 'copy-row' });
  row.append(copy, status);
  const help = Object.assign(document.createElement('p'), {
    className: 'hint',
    textContent: 'On iPhone or iPad: tap Copy code, bookmark any page (Share → Add Bookmark), then edit that bookmark and replace its address with the copied code.',
  });
  box.append(row, help);

  button.addEventListener('click', event => {
    event.preventDefault();
    status.textContent = 'Drag the button to your bookmarks bar, or use Copy code.';
  });

  copy.addEventListener('click', async () => {
    status.textContent = (await copyText(code)) ? 'Copied. Paste it as a bookmark’s address.' : 'Couldn’t copy. Your browser blocked access to the clipboard.';
  });

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Older Safari and pages without clipboard access: copy from a selected text field instead.
      const field = Object.assign(document.createElement('textarea'), { value: text, readOnly: true });
      field.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;font-size:16px;';
      document.body.append(field);
      field.focus();
      field.setSelectionRange(0, text.length);
      let copied = false;
      try { copied = document.execCommand('copy'); } catch {}
      field.remove();
      return copied;
    }
  }
})();
