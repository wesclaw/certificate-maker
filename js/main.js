// const canvasWidth = window.innerWidth - 400;
// const canvasHeight = window.innerHeight - 50; 

// const canvas = new fabric.Canvas('canvas', {
//   width: canvasWidth,
//   height: canvasHeight,
//   backgroundColor: 'transparent'
// });

// let themeImage;

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
//     selectable: false, 
//     hasControls: false,
//     hasBorders: false, 
//     lockMovementX: true,
//     lockMovementY: true,
//     hoverCursor: 'default'
//   });

//   img.getElement().classList.add('theme-image');
//   // Add image to canvas
//   canvas.add(img);

//   themeImage = img;

//   // Render canvas after adding image
//   canvas.renderAll();
// });

// const printBtn = document.querySelector('.print-btn');

// printBtn.addEventListener('click', copy);

// function copy(e) {
//     e.preventDefault();
//     if (!themeImage) {
//         console.error('Image not loaded yet.');
//         return;
//     }

//     const left = themeImage.left || 0;
//     const top = themeImage.top || 0;
//     const width = (themeImage.width || 0) * (themeImage.scaleX || 1);
//     const height = (themeImage.height || 0) * (themeImage.scaleY || 1);

//     html2canvas(document.querySelector("#canvas"), {
//         x: left,
//         y: top,
//         width: width,
//         height: height,
//         scale: 5
//     }).then(canvas => {
//         canvas.style.margin = '0px';
//         canvas.style.width = '100%';
//         canvas.style.height = '100%';
//         const newWindow = window.open('', '_blank');
//         newWindow.document.body.style.margin = '0px';
//         newWindow.document.body.appendChild(canvas);
//         newWindow.print();
//     });
// }

// const resetBtn = document.querySelector('.reset-btn');

// resetBtn.addEventListener('click', e => {
//   window.location.reload();
// });


const canvasWidth = window.innerWidth - 400;
const canvasHeight = window.innerHeight - 50; 

const canvas = new fabric.Canvas('canvas', {
    width: canvasWidth,
    height: canvasHeight,
    backgroundColor: 'transparent'
});

let themeImage;

fabric.Image.fromURL('themes/theme1.jpg', function(img) {
    // Set canvas dimensions to match viewport size
    canvas.setDimensions({
        width: canvasWidth,
        height: canvasHeight
    });

    // Calculate the scale to fit the image within the canvas
    const scaleFactor = Math.min(
        canvasWidth / img.width,
        canvasHeight / img.height
    );

    // Set image dimensions and position
    img.scale(scaleFactor).set({
        left: (canvasWidth - img.width * scaleFactor) / 2,
        top: (canvasHeight - img.height * scaleFactor) / 2,
        selectable: false, 
        hasControls: false,
        hasBorders: false, 
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: 'default'
    });

   
    canvas.add(img);
    
    themeImage = img;

    const text = new fabric.IText('Certificate for graduation', {
        left: canvasWidth / 2, 
        top: canvasHeight / 2, 
        fontSize: 30, 
        fill: 'black',
        editable: true,
        textAlign: 'center',
        lineHeight: 0.8,
        
    });

    canvas.add(text);
    canvas.renderAll();
});

const printBtn = document.querySelector('.print-btn');

printBtn.addEventListener('click', copy);

async function copy(e) {
    e.preventDefault();
    printBtn.textContent = 'Please wait...';
    if (!themeImage) {
        console.error('Image not loaded yet.');
        printBtn.textContent = 'Print'; 
        return;
    }

    // Adjust to capture the specific part of the canvas where the image is located
    const left = themeImage.left || 0;
    const top = themeImage.top || 0;
    const width = (themeImage.width || 0) * (themeImage.scaleX || 1);
    const height = (themeImage.height || 0) * (themeImage.scaleY || 1);

    try {
        const canvasElement = await html2canvas(document.querySelector("#canvas"), {
            x: left,
            y: top,
            width: width,
            height: height,
            scale: 5
        });

        // Convert the canvas to an image data URL
        const imgData = canvasElement.toDataURL('image/png');

        // A4 size in points
        const a4Width = 841.89;
        const a4Height = 595.28;

        // Create a jsPDF instance in landscape orientation with A4 size
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'pt',
            format: [a4Width, a4Height]
        });

        // Add the image to the PDF with scaling to fit A4 size
        pdf.addImage(imgData, 'PNG', 0, 0, a4Width, a4Height);

        // Generate the PDF as a Blob
        const pdfBlob = pdf.output('blob');

        // Create a URL for the Blob and open it in a new window
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const newWindow = window.open(pdfUrl, '_blank');
        if (newWindow) {
            newWindow.focus();
            newWindow.onload = function() {
                newWindow.print();
            };
        } else {
            console.error('Failed to open new window. Please allow popups for this website.');
            printBtn.textContent = 'Allow popups for this website';
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
        printBtn.textContent = 'Print';
    }
    printBtn.textContent = 'Print'
}

const resetBtn = document.querySelector('.reset-btn');

resetBtn.addEventListener('click', e => {
    window.location.reload();
});






