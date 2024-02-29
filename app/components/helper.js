const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const cloneIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 55.699 55.699' width='100px' height='100px' xml:space='preserve'%3E%3Cpath style='fill:%23010002;' d='M51.51,18.001c-0.006-0.085-0.022-0.167-0.05-0.248c-0.012-0.034-0.02-0.067-0.035-0.1 c-0.049-0.106-0.109-0.206-0.194-0.291v-0.001l0,0c0,0-0.001-0.001-0.001-0.002L34.161,0.293c-0.086-0.087-0.188-0.148-0.295-0.197 c-0.027-0.013-0.057-0.02-0.086-0.03c-0.086-0.029-0.174-0.048-0.265-0.053C33.494,0.011,33.475,0,33.453,0H22.177 c-3.678,0-6.669,2.992-6.669,6.67v1.674h-4.663c-3.678,0-6.67,2.992-6.67,6.67V49.03c0,3.678,2.992,6.669,6.67,6.669h22.677 c3.677,0,6.669-2.991,6.669-6.669v-1.675h4.664c3.678,0,6.669-2.991,6.669-6.669V18.069C51.524,18.045,51.512,18.025,51.51,18.001z M34.454,3.414l13.655,13.655h-8.985c-2.575,0-4.67-2.095-4.67-4.67V3.414z M38.191,49.029c0,2.574-2.095,4.669-4.669,4.669H10.845 c-2.575,0-4.67-2.095-4.67-4.669V15.014c0-2.575,2.095-4.67,4.67-4.67h5.663h4.614v10.399c0,3.678,2.991,6.669,6.668,6.669h10.4 v18.942L38.191,49.029L38.191,49.029z M36.777,25.412h-8.986c-2.574,0-4.668-2.094-4.668-4.669v-8.985L36.777,25.412z M44.855,45.355h-4.664V26.412c0-0.023-0.012-0.044-0.014-0.067c-0.006-0.085-0.021-0.167-0.049-0.249 c-0.012-0.033-0.021-0.066-0.036-0.1c-0.048-0.105-0.109-0.205-0.194-0.29l0,0l0,0c0-0.001-0.001-0.002-0.001-0.002L22.829,8.637 c-0.087-0.086-0.188-0.147-0.295-0.196c-0.029-0.013-0.058-0.021-0.088-0.031c-0.086-0.03-0.172-0.048-0.263-0.053 c-0.021-0.002-0.04-0.013-0.062-0.013h-4.614V6.67c0-2.575,2.095-4.67,4.669-4.67h10.277v10.4c0,3.678,2.992,6.67,6.67,6.67h10.399 v21.616C49.524,43.26,47.429,45.355,44.855,45.355z'/%3E%3C/svg%3E%0A";

var deleteImage = document.createElement("img");
deleteImage.src = deleteIcon;

var cloneImg = document.createElement("img");
cloneImg.src = cloneIcon;

export function SetTextBoxProperties(textBox, position) {
  const options = {
    text: "Your Text Here", // Set the text content
    left: position.left,
    top: position.top,
    width: 500,
    height: 700,
    fontSize: 16, // Fixed font size
    fill: "#000",
    // fontFamily: "Arial",
    fontFamily: "Century Gothic",
    textAlign: "left",
    selectable: 1,
  };
  textBox.set(options);
  cornerControl(textBox);
  borderControl(textBox);
}

export function SetRectBoxProperties(rectBox, position) {
  const options = {
    left: position.left,
    top: position.top,
    width: 250,
    height: 100,
    padding: 0,
    fill: "#f7f7f7", // Default fill color
    stroke: "68b3fd", // Default border color
    strokeWidth: 1, // Default border width
    selectable: true, // Object is selectable by default
    hasControls: false,
  };
  rectBox.set(options);
  // Custom controls
  cornerControl(rectBox);
  borderControl(rectBox);
}

export function SetLineProperties(obj, position) {
  const options = {
    left: position.left,
    top: position.top,
    stroke: "black", // Line color
    strokeWidth: 2, // Line width
    // strokeDashArray: [3, 3] // Dashed pattern: 5px dash, 5px gap
  };
  obj.set(options);
  cornerControl(obj);
  borderControl(obj);
}

export function createCustodmControls2(object, type) {
  if (type == "delete") {
    object.controls.deleteControl = new fabric.Control({
      x: 0.4,
      y: 0.5,
      offsetY: 16,
      cursorStyle: "scale",
      mouseUpHandler: deleteObject,
      render: renderIcon(deleteImage),
      cornerSize: 24,
    });
  } else if (type == "clone") {
    object.controls.clone = new fabric.Control({
      x: 0.35,
      y: 0.5,
      offsetY: 16,
      // offsetX: -16,
      cursorStyle: "pointer",
      mouseUpHandler: cloneObject,
      render: renderIcon(cloneImg),
      cornerSize: 24,
    });
  }
}

// Define a function to handle scaling action
function scaleObject(target, mouseDownEvent, mouseMoveEvent) {
  // const pointer = currentCanvas.getPointer(mouseMoveEvent.e);
  // const scaleX = (pointer.x - target.left) / (target.width * target.scaleX);
  // const scaleY = (pointer.y - target.top) / (target.height * target.scaleY);
  // console.log("scaleX == > ", scaleX);
  // console.log("scaleY == > ", scaleY);
  // // target.scaleX = scaleX;
  // target.scaleY = scaleY;
  // target.setCoords();
  // currentCanvas.requestRenderAll();
}

function iconHorizontal(ctx, left, top, styleOverride, fabricObject) {
  var topYScale = top + (fabricObject.height * fabricObject.scaleY) / 2;
  ctx.beginPath();
  ctx.lineWidth = 3; // stroke width adjustment
  ctx.strokeStyle = "#68b3fd";
  ctx.fillStyle = "white";
  if (fabricObject.type == "line") {
    ctx.roundRect(0, 0, 0, 0, 0);
  } else {
    ctx.roundRect(left - 10, topYScale, 21, 4, 2);
  }
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

// Define a function to render the scaling icon
function iconVertical(ctx, left, top, styleOverride, fabricObject) {
  var topYScale = top + (fabricObject.height * fabricObject.scaleY) / 2;
  if (fabricObject.type == "rect") {
    topYScale = topYScale - 8;
  } else if (fabricObject.type == "line") {
    topYScale = topYScale + 10;
  } else if (fabricObject.type == "image") {
    topYScale = topYScale - 8;
  }
  ctx.beginPath();
  ctx.lineWidth = 3; // stroke width adjustment
  ctx.strokeStyle = "#68b3fd";
  ctx.fillStyle = "white";
  ctx.roundRect(left - 1.5, topYScale, 4, 21, 2);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function deleteObject(eventData, transform) {
  const canvas = transform.target.canvas;
  canvas.remove(transform.target);
  canvas.requestRenderAll();
}

function cloneObject(eventData, transform) {
  var target = transform.target;
  var canvas = target.canvas;
  target.clone(function (cloned) {
    cloned.left += 10;
    cloned.top += 10;
    canvas.add(cloned);
  });
}
function renderIcon(icon) {
  return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
    var size = this.cornerSize;
    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
    ctx.drawImage(icon, -size / 2, -size / 2, size, size);
    ctx.arc(left, top, 30 / 2, 0, 10 * Math.PI, false);
    ctx.restore();
  };
}

export function borderControl(object) {
  let padding = 2;
  if (object.type == "textbox") {
    padding = 10;
  } else if (object.type == "line") {
    padding = 20;
  }
  const options = {
    borderColor: "#124fea",
    cornerColor: "transparent",
    // cornerColor: "#0098e5",
    hasControls: true,
    selectable: 1,
    lockMovementX: false,
    lockMovementY: false,
    editable: true,
    centeredScaling: false, // Prevent resizing from center
    cornerStyle: "circle", // Use circular corner controls
    transparentCorners: false, // Make corner controls more visible
    cornerSize: 25, // Set corner control size
    padding: padding, // Set padding inside the textbox
    lockRotation: true, // Allow rotation
    // cornerStrokeColor:'#124fea',
    // cornerStrokeWidth: 15,
  };
  object.set(options);
}

export function customCorner(object) {
  if (
    object.type == "rect" ||
    object.type == "line" ||
    object.type == "image"
  ) {
    // Middle Left
    object.controls.scaleMiddleLeft = new fabric.Control({
      x: -0.5,
      y: -0.5,
      actionName: "scale", // Action to perform when clicked
      cursorStyle: "pointer",
      render: iconVertical, // Render the icon
      mouseUpHandler: scaleObject, // Handle scaling on mouse down
      cornerSize: 24, // Control corner size
    });
  }

  // Right Middle
  object.controls.scaleRightMiddle = new fabric.Control({
    x: 0.5,
    y: -0.5,
    actionName: "scale", // Action to perform when clicked
    cursorStyle: "pointer",
    render: iconVertical, // Render the icon
    // mouseUpHandler: scaleObject, // Handle scaling on mouse down
    cornerSize: 24, // Control corner size
  });

  if (object.type == "rect" || object.type == "image") {
    // Bottom Middle
    object.controls.scaleBottomMiddle = new fabric.Control({
      x: 0,
      y: 0,
      actionName: "scale", // Action to perform when clicked
      cursorStyle: "pointer",
      render: iconHorizontal, // Render the icon
      mouseUpHandler: scaleObject, // Handle scaling on mouse down
      cornerSize: 24, // Control corner size
    });
  }

  if (object.type == "rect" || object.type == "image") {
    // Bottom Middle
    object.controls.scaleTopMiddle = new fabric.Control({
      x: 0,
      y: -1,
      actionName: "scale", // Action to perform when clicked
      cursorStyle: "pointer",
      render: iconHorizontal, // Render the icon
      mouseUpHandler: scaleObject, // Handle scaling on mouse down
      cornerSize: 24, // Control corner size
    });
  }
}
export function cornerControl(obj) {
  const controlPoints = {
    mt: false,
    ml: false,
    mr: false,
    mb: false,
    tl: false,
    tr: false,
    bl: false,
    br: false,
    mtr: false, // rotation
  };
  if (obj.type == "textbox") {
    controlPoints.mr = true;
    controlPoints.br = true;
  } else if (obj.type == "rect") {
    controlPoints.mt = true;
    controlPoints.ml = true;
    controlPoints.mr = true;
    controlPoints.mb = true;
    controlPoints.tl = true;
    controlPoints.tr = true;
    controlPoints.bl = true;
    controlPoints.br = true;
  } else if (obj.type == "line") {
    controlPoints.ml = true;
    controlPoints.mr = true;
  } else if (obj.type == "image") {
    controlPoints.mt = true;
    controlPoints.ml = true;
    controlPoints.mr = true;
    controlPoints.mb = true;
    controlPoints.tl = true;
    controlPoints.tr = true;
    controlPoints.bl = true;
    controlPoints.br = true;
    controlPoints.mtr = true;
  }
  obj.setControlsVisibility(controlPoints);
  const control = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: -0.5,
    actionHandler: function (dim, finalMatrix, fabricObject, options) {
      fabricObject.set("rotatingPointOffset", dim.y);
      canvas.current.requestRenderAll();
    },
    actionName: "set",
  });
  obj.controls.mtr = control;
  obj.setCoords();
  customCorner(obj); // Set custom corners
}
