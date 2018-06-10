let styleLoader = function (style) {
  return `
    let style = document.createElement('style')
    style.innerText = ${JSON.stringify(style).replace(/\\n/g, '')}
    document.head.appendChild(style)
  `;
}

module.exports = styleLoader
