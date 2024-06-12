const canvasWidth = window.innerWidth - 400;
///the width was 400
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
        hoverCursor: 'default',

        crossOrigin: 'anonymous', // Enable cross-origin requests
        imageSmoothing: true,
        imageSmoothingQuality: 'high'
    });

   
    canvas.add(img);
    
    themeImage = img;

    const text = new fabric.IText('Certificate for graduation', {
        left: canvasWidth / 2, 
        top: canvasHeight / 2, 
        fontSize: 50, 
        fill: 'black',
        editable: true,
        textAlign: 'center',
        lineHeight: 0.8,
        fontFamily: 'cursive',
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
            // scale: 2,
            scale: window.devicePixelRatio, 
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





// const printBtn = document.querySelector('.print-btn');

// printBtn.addEventListener('click', copy);

// async function copy(e) {
//     e.preventDefault();
//     printBtn.textContent = 'Please wait...';
//     if (!themeImage) {
//         console.error('Image not loaded yet.');
//         printBtn.textContent = 'Print';
//         return;
//     }

//     const left = themeImage.left || 0;
//     const top = themeImage.top || 0;
//     const width = (themeImage.width || 0) * (themeImage.scaleX || 1);
//     const height = (themeImage.height || 0) * (themeImage.scaleY || 1);

//     // Set a delay to ensure all dynamic content is fully loaded
//     setTimeout(async () => {
//         try {
//             const canvasElement = await html2canvas(document.querySelector("#canvas"), {
//                 x: left,
//                 y: top,
//                 width: width,
//                 height: height,
//                 scale: window.devicePixelRatio
//             });

//             // Convert the canvas to an image data URL
//             const imgData = canvasElement.toDataURL('image/png');

//             // A4 size in points
//             const a4Width = 841.89;
//             const a4Height = 595.28;

//             // Create a jsPDF instance in landscape orientation with A4 size
//             const { jsPDF } = window.jspdf;
//             const pdf = new jsPDF({
//                 orientation: 'landscape',
//                 unit: 'pt',
//                 format: [a4Width, a4Height]
//             });

//             // Add the image to the PDF with scaling to fit A4 size
//             pdf.addImage(imgData, 'PNG', 0, 0, a4Width, a4Height);

//             // Generate the PDF as a Blob
//             const pdfBlob = pdf.output('blob');

//             // Create a URL for the Blob and open it in a new window
//             const pdfUrl = URL.createObjectURL(pdfBlob);
//             const newWindow = window.open(pdfUrl, '_blank');
//             if (newWindow) {
//                 newWindow.onload = function() {
//                     newWindow.print();
//                     URL.revokeObjectURL(pdfUrl); // Clean up the object URL after printing
//                 };
//             } else {
//                 console.error('Failed to open new window. Please allow popups for this website.');
//                 printBtn.textContent = 'Allow popups for this website';
//                 return;
//             }
//         } catch (error) {
//             console.error('Error generating PDF:', error);
//         }
//         printBtn.textContent = 'Print';
//     }, 1000); // Adjust the delay as needed
// }

// const resetBtn = document.querySelector('.reset-btn');

// resetBtn.addEventListener('click', e => {
//     window.location.reload();
// });
