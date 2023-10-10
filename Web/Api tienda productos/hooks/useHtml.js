/** @param {string} newTitle */
export function useHtmlTitle(newTitle, onDocument=document) {
  if (!(onDocument instanceof Document && typeof newTitle === 'string')) return;
  onDocument.title = newTitle;
}

export default {
  useHtmlTitle
}
