
export function SetTextBoxProperties(textBox, position) {
  const options = {
    text: 'Your Text Here', // Set the text content
    left: position.left,
    top: position.top,
    width: 500,
    height: 500,
    fontSize: 10, // Fixed font size
    fill: "#000",
    fontFamily: "Arial",
    textAlign: "left",
  };
  textBox.set(options);
  SetTextBoxControlsVisibility(textBox)
  SetTextBoxControlProperties(textBox)
}

export function SetTextBoxControlProperties(textBox) {
  const options = {
    borderColor: "red",
    cornerColor: "green",
    hasControls: true,
    lockMovementX: false,
    lockMovementY: false,
    editable: true,
    centeredScaling: false, // Prevent resizing from center
    // cornerStyle: "circle", // Use circular corner controls
    transparentCorners: false, // Make corner controls more visible
    cornerSize: 6, // Set corner control size
    padding: 10, // Set padding inside the textbox
    lockRotation: false, // Allow rotation
  }
  textBox.set(options);
}


export function SetTextBoxControlsVisibility(textBox) {
  textBox.setControlsVisibility({ mt: false, ml: false, mr: true, mb: true, tl: false, tr: false, bl: false, br: true, mtr: false});
  const control = new fabric.Control({
    x: -0.5,
    y: -0.5,
    offsetY: -0.5,
    actionHandler: function (dim, finalMatrix, fabricObject, options) {
      fabricObject.set("rotatingPointOffset", dim.y);
      canvas.current.requestRenderAll();
    },
    actionName: "set", // Action name
  });
  textBox.controls.mtr = control; // Assign the custom control to mtr control
  textBox.setCoords(); // Update object's coordinates
}