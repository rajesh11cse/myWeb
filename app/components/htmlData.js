export function GetStyledClass(element, index) {
  let styledClass = "";
  let className = "";
  if (element.type === "textbox" || element.type === "i-text") {
    className = `${element.type}${index}`;

    element.textDecoration = element.underline
      ? "underline"
      : element.overline
      ? "overline"
      : element.linethrough
      ? "line-through"
      : "none";
    styledClass = `.${className}{
                        position: absolute;
                        left: ${element.left}px;
                        top: ${element.top}px;
                        width: ${element.width}px;
                        height: ${element.height}px;
                        line-height: ${element.lineHeight} !important;
                        font-family: ${element.fontFamily};
                        color:${element.fill};
                        text-decoration: ${element.textDecoration};
                        text-align: ${element.textAlign};
                        font-style: ${element.fontStyle};
                        font-weight: ${element.fontWeight};
                        font-size: ${element.fontSize}px;
                        line-height: ${element.lineHeight};
                        overflow-wrap: break-word;
                        transform: scale(${element.scaleX}, ${element.scaleY});
                        transform-origin: top left;
                      }`;
  } else if (element.type === "line") {
    className = `line${index}`;
    styledClass = `.${className}{
        position: absolute;
        left: ${element.left}px;
        top: ${element.top}px;
    }`;
  } else if (element.type === "rect") {
    className = `rect${index}`;
    styledClass = `.${className}{
        position: absolute;
        left: ${element.left}px;
        top: ${element.top}px;
        width: ${element.width}px;
        height: ${element.height}px;
        background-color: ${element.fill};
        border: 1px solid #fff;
        border-radius: 0px;
    }`;
  }
  return { className: className, styledClass: styledClass };
}

export function GetBodyContent(element, className) {
  let content = "";
  if (element.type === "textbox" || element.type === "i-text") {
    content = `<div> <p class="${className}">${element.text}</p> </div>`;
  } else if (element.type === "line") {
    content = `<svg class="${className}" width="${element.width}" height="${element.strokeWidth}" viewBox="${element.x1} ${element.y1} ${element.width} ${element.strokeWidth}">
    <line
      x1="${element.x1}"
      y1="${element.y1}"
      x2="${element.x2}"
      y2="${element.y2}"
      style="stroke: ${element.stroke}; strokeWidth: ${element.strokeWidth}; opacity:  ${element.opacity};"
    />
  </svg>`;
  } else if (element.type === "rect") {
    content = `<div class="${className}"></div>`;
  }
  return { bodyContent: content };
}
