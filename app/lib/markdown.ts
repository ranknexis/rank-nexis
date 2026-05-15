function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .substring(0, 100);
}

export function convertMarkdownToHtml(md: string) {
  const lines = md.split('\n');
  let html = '';
  let inList = false;
  let inOrderedList = false;

  lines.forEach((line, index) => {
    let trimmed = line.trim();
    
    if (trimmed === '') {
        if (inList) { html += '    </ul>\n'; inList = false; }
        if (inOrderedList) { html += '    </ol>\n'; inOrderedList = false; }
        return;
    }

    if (trimmed === '---' || trimmed === '## ---' || trimmed === '### ---') {
      if (inList) { html += '    </ul>\n'; inList = false; }
      if (inOrderedList) { html += '    </ol>\n'; inOrderedList = false; }
      html += '    <hr />\n';
      return;
    }

    const hMatch = trimmed.match(/^(#{1,3})\s*(.*)/);
    if (hMatch) {
        const level = hMatch[1].length;
        let rawText = hMatch[2].trim().replace(/^\**|\**$/g, '').trim();
        if (rawText.length > 0 && rawText.length <= 120) {
            if (inList) { html += '    </ul>\n'; inList = false; }
            if (inOrderedList) { html += '    </ol>\n'; inOrderedList = false; }
            const id = slugify(rawText);
            const tag = `h${level === 1 ? 2 : level}`;
            html += `    <${tag} id="${id}">${rawText}</${tag}>\n`;
            return;
        }
    }

    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      if (!inList) {
        if (inOrderedList) { html += '    </ol>\n'; inOrderedList = false; }
        html += '    <ul>\n';
        inList = true;
      }
      let content = trimmed.substring(2).trim();
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `      <li>${content}</li>\n`;
      return;
    }

    if (/^\d+[\.\)]\s/.test(trimmed)) {
      if (!inOrderedList) {
        if (inList) { html += '    </ul>\n'; inList = false; }
        html += '    <ol>\n';
        inOrderedList = true;
      }
      let content = trimmed.replace(/^\d+[\.\)]\s/, '').trim();
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      html += `      <li>${content}</li>\n`;
      return;
    }

    if (inList) { html += '    </ul>\n'; inList = false; }
    if (inOrderedList) { html += '    </ol>\n'; inOrderedList = false; }

    let content = trimmed;
    content = content.replace(/^#{1,6}\s*/, '');
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    html += `    <p>${content}</p>\n`;
  });

  if (inList) html += '    </ul>\n';
  if (inOrderedList) html += '    </ol>\n';

  return html;
}
