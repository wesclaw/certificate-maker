////if i click on any of the html text elements on the document, the 1px solid border wraps around the element. else the border is removed. use textareas instead of html text tags like p or h1. 

const textarea1 = document.querySelector('.textarea1')


textarea1.addEventListener('click', e=>{
  if(textarea1){
    textarea1.style.border = '3px dashed black'
    textarea1.style.resize = 'both'
  }
})

document.body.addEventListener('click', e => {
  if (e.target !== textarea1) {
      textarea1.style.border = 'none';
      textarea1.style.resize = 'none'
  }
});


const textarea2 = document.querySelector('.textarea2')

textarea2.addEventListener('click', e=>{
  if(textarea2){
    textarea2.style.border = '3px dashed black'
    textarea2.style.resize = 'both'
  }
})

document.body.addEventListener('click', e => {
  if (e.target !== textarea2) {
      textarea2.style.border = 'none';
      textarea2.style.resize = 'none'
  }
});









// // Get the textarea element
// var textarea = document.querySelector(".textarea1");

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







