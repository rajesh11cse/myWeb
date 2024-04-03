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
                        width: ${element.width*element.scaleX}px;
                        height: ${element.height*element.scaleY}px;
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
                        white-space: pre-wrap;
                      }`;
  } else if (element.type === "line") {
    className = `line${index}`;
    styledClass = `.${className}{
        position: absolute;
        left: ${element.left}px;
        top: ${element.top}px;
        width: ${element.width*element.scaleX}px;
        height: ${element.strokeWidth*element.scaleY}px;
        background-color: ${element.stroke};
        opacity: ${element.opacity};
    }`;
  } else if (element.type === "rect") {
    className = `rect${index}`;
    styledClass = `.${className}{
        position: absolute;
        left: ${element.left}px;
        top: ${element.top}px;
        width: ${element.width*element.scaleX}px;
        height: ${element.height*element.scaleY}px;
        background-color: ${element.fill};
        border: 1px solid #fff;
        border-radius: 0px;
    }`;
  }else if (element.type === "image") {
    className = `image${index}`;
    styledClass = `.${className}{
        position: absolute;
        left: ${element.left}px;
        top: ${element.top}px;
        width: ${element.width*element.scaleX}px;
        height: ${element.height*element.scaleY}px;
    }`;
  }
  return { className: className, styledClass: styledClass };
}

export function GetBodyContent(element, className) {
  let content = "";
  if (element.type === "textbox" || element.type === "i-text") {
    content = `<div> <p class="${className}">${element.text}</p> </div>`;
  } else if (element.type === "rect" || element.type === "line") {
    content = `<div class="${className}"></div>`;
  }
  else if (element.type === "rect" || element.type === "line") {
    content = `<div class="${className}"></div>`;
  }else if (element.type === "image"){
    content = `<img class="${className}" src="${element.src}" alt="image not found" width="${element.width}" height="${element.height}">`;

  }
  return { bodyContent: content };
}
