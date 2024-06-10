// const textarea1 = document.querySelector('.textarea1')

// textarea1.addEventListener('click', e=>{
//   if(textarea1){
//     textarea1.style.border = '3px dashed black'
//     textarea1.style.resize = 'both'
//   }
// })

// document.body.addEventListener('click', e => {
//   if (e.target !== textarea1) {
//       textarea1.style.border = 'none';
//       textarea1.style.resize = 'none'
//   }
// });

// const textarea2 = document.querySelector('.textarea2')

// textarea2.addEventListener('click', e=>{
//   if(textarea2){
//     textarea2.style.border = '3px dashed black'
//     textarea2.style.resize = 'both'
//   }
// })

// document.body.addEventListener('click', e => {
//   if (e.target !== textarea2) {
//       textarea2.style.border = 'none';
//       textarea2.style.resize = 'none'
//   }
// });

// const textareas = document.querySelectorAll('.textarea');

// textareas.forEach(textarea => {
//     textarea.addEventListener('click', e => {
//         textareas.forEach(ta => {
//             ta.style.border = 'none';
//             ta.style.resize = 'none';
//         });
//         textarea.style.border = '3px dashed black';
//         textarea.style.resize = 'both';
//     });
// });

// document.body.addEventListener('click', e => {
//     if (!Array.from(textareas).includes(e.target)) {
//         textareas.forEach(textarea => {
//             textarea.style.border = 'none';
//             textarea.style.resize = 'none';
//         });
//     }
//   })

///////removing the border after unclick

// var textarea = document.querySelector(".textarea");

// // Initialize variables for drag functionality
// var offsetX = 0;
// var offsetY = 0;
// var isDragging = false;

// // Function to handle mouse down event
// function handleMouseDown(e) {
//     isDragging = true;
//     // Calculate the offset between mouse position and textarea position
//     offsetX = e.clientX - textarea.offsetLeft;
//     offsetY = e.clientY - textarea.offsetTop;
// }

// // Function to handle mouse move event
// function handleMouseMove(e) {
//     if (!isDragging) return;
//     // Set the new position of the textarea based on mouse position and offset
//     textarea.style.left = (e.clientX - offsetX) + "px";
//     textarea.style.top = (e.clientY - offsetY) + "px";
// }

// // Function to handle mouse up event
// function handleMouseUp() {
//     isDragging = false;
// }

// // Event listeners for mouse events
// textarea.addEventListener("mousedown", handleMouseDown);
// document.addEventListener("mousemove", handleMouseMove);
// document.addEventListener("mouseup", handleMouseUp);
 


//////printing the img


//////forcing a drag on the border



// const div = document.querySelector('.border');

// // Initialize variables for drag functionality
// let offsetX = 0;
// let offsetY = 0;
// let isResizing = false;

// // Function to handle mouse down event
// function handleMouseDown(e) {
//     isResizing = true;
//     // Store the initial mouse position
//     offsetX = e.clientX;
//     offsetY = e.clientY;
//     // Store the initial width and height of the div
//     initialWidth = parseFloat(getComputedStyle(div).width);
//     initialHeight = parseFloat(getComputedStyle(div).height);
// }

// // Function to handle mouse move event
// function handleMouseMove(e) {
//     if (!isResizing) return;
//     // Calculate the change in mouse position
//     const deltaX = e.clientX - offsetX;
//     const deltaY = e.clientY - offsetY;
//     // Update the width and height of the div based on the mouse movement
//     div.style.width = initialWidth + deltaX + 'px';
//     div.style.height = initialHeight + deltaY + 'px';
// }

// // Function to handle mouse up event
// function handleMouseUp() {
//     isResizing = false;
// }

// // Event listeners for mouse events
// div.addEventListener("mousedown", handleMouseDown);
// document.addEventListener("mousemove", handleMouseMove);
// document.addEventListener("mouseup", handleMouseUp);




// $(function() {
//   var isResizing = false;
//   var $resizable = $(".border");
//   var originalWidth, originalHeight, originalX, originalY;

//   $resizable.mousedown(function(e) {
//       isResizing = true;
//       originalWidth = $resizable.width();
//       originalHeight = $resizable.height();
//       originalX = e.pageX;
//       originalY = e.pageY;
//   });

//   $(document).mousemove(function(e) {
//       if (isResizing) {
//           var width = originalWidth + (e.pageX - originalX);
//           var height = originalHeight + (e.pageY - originalY);
//           $resizable.width(width).height(height);
//       }
//   }).mouseup(function() {
//       isResizing = false;
//   });
// });







////////////////////////////// this is the zoomed up canvas image

// const canvas = new fabric.Canvas('canvas', {
//   width: 700,
//   height: 500,
//   backgroundColor: 'red'
// });

// fabric.Image.fromURL('themes/theme1.jpg', function(img) {
//   // Set image dimensions to match canvas dimensions
//   img.set({
//     width: canvas.width,
//     height: canvas.height,
//     selectable: false, // Prevent selection
//     hasControls: false, // Disable controls
//     hasBorders: false, // Disable borders
//     lockMovementX: true, // Lock horizontal movement
//     lockMovementY: true // Lock vertical movement
//   });
  
//   // Add image to canvas
//   canvas.add(img);
// });

// // Render canvas after adding image
// canvas.renderAll();



//////this is the good size but porr quality on print

const canvas = new fabric.Canvas('canvas', {
  width: 600,
  height: 400,
  backgroundColor: 'red'
});

fabric.Image.fromURL('themes/theme1.jpg', function(img) {
  // Calculate the scale to fit the image within the canvas
  const scaleFactor = Math.min(
    canvas.width / img.width,
    canvas.height / img.height
  );

  // Set image dimensions and position
  img.scale(scaleFactor).set({
    left: (canvas.width - img.width * scaleFactor) / 2,
    top: (canvas.height - img.height * scaleFactor) / 2,
    selectable: false, // Prevent selection
    hasControls: false, // Disable controls
    hasBorders: false, // Disable borders
    lockMovementX: true, // Lock horizontal movement
    // lockMovementY: true // Lock vertical movement
  });
  
  // Add image to canvas
  canvas.add(img);
});

// Render canvas after adding image
canvas.renderAll();



const printBtn = document.querySelector('.print-btn');

printBtn.addEventListener('click', copy);

function copy(e) {
    e.preventDefault();
    html2canvas(document.querySelector("#canvas"), { scale: 5 }).then(canvas => {
        canvas.style.margin = '0px';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        const newWindow = window.open(' ', '_blank');
        newWindow.document.body.style.margin = '0px'
        newWindow.document.body.appendChild(canvas);
        newWindow.print();
    });
}

const resetBtn = document.querySelector('.reset-btn')

resetBtn.addEventListener('click',e=>{
  window.location.reload()
})




//////////making the canvas the whole width of the edit mode and then dragging the img onto the canvas

// const canvasWidth = window.innerWidth - 400; // 400px less than the viewport width
// const canvasHeight = window.innerHeight - 50; // 50px less than the viewport height

// const canvas = new fabric.Canvas('canvas', {
//   width: canvasWidth,
//   height: canvasHeight,
//   backgroundColor: 'red'
// });

// fabric.Image.fromURL('themes/theme1.jpg', function(img) {
//   // Set canvas dimensions to match viewport size
//   canvas.setDimensions({
//     width: canvasWidth,
//     height: canvasHeight
//   });

//   // Calculate the scale to fit the image within the canvas
//   const scaleFactor = Math.min(
//     canvasWidth / img.width,
//     canvasHeight / img.height
//   );

//   // Set image dimensions and position
//   img.scale(scaleFactor).set({
//     left: (canvasWidth - img.width * scaleFactor) / 2,
//     top: (canvasHeight - img.height * scaleFactor) / 2,
    
//   });

//   img.getElement().classList.add('theme-image');
//   // Add image to canvas
//   canvas.add(img);

//   // Render canvas after adding image
//   canvas.renderAll();
// });



