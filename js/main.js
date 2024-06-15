// const canvasWidth = window.innerWidth - 400;
// ///the width was 400
// const canvasHeight = window.innerHeight - 50; 


// const canvas = new fabric.Canvas('canvas', {
//     width: canvasWidth,
//     height: canvasHeight,
//     backgroundColor: 'transparent'
// });

// let themeImage;

// fabric.Image.fromURL('themes/theme1.jpg', function(img) {
//     // Set canvas dimensions to match viewport size
//     canvas.setDimensions({
//         width: canvasWidth,
//         height: canvasHeight
//     });

//     // Calculate the scale to fit the image within the canvas
//     const scaleFactor = Math.min(
//         canvasWidth / img.width,
//         canvasHeight / img.height
//     );

//     // Set image dimensions and position
//     img.scale(scaleFactor).set({
//         left: (canvasWidth - img.width * scaleFactor) / 2,
//         top: (canvasHeight - img.height * scaleFactor) / 2,
//         selectable: false, 
//         hasControls: false,
//         hasBorders: false, 
//         lockMovementX: true,
//         lockMovementY: true,
//         hoverCursor: 'default',

//         crossOrigin: 'anonymous', // Enable cross-origin requests
//         imageSmoothing: true,
//         imageSmoothingQuality: 'high'
//     });

   
//     canvas.add(img);
    
//     themeImage = img;

//     const text = new fabric.IText('Certificate for graduation', {
//         left: canvasWidth / 2, 
//         top: canvasHeight / 2, 
//         fontSize: 30, 
//         fill: 'black',
//         editable: true,
//         textAlign: 'center',
//         lineHeight: 0.8,
//         fontFamily: 'cursive',
//     });

//     canvas.add(text);
//     canvas.renderAll();
// });


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

//     try {
//         const canvasElement = await html2canvas(document.querySelector("#canvas"), {
//             x: left,
//             y: top,
//             width: width,
//             height: height,
//             //scale: 5,
//         });

//         // Convert the canvas to an image data URL
//         const imgData = canvasElement.toDataURL('image/png');

//         // A4 size in points
//         const a4Width = 841.89;
//         const a4Height = 595.28;

//         // Create a jsPDF instance in landscape orientation with A4 size
//         const { jsPDF } = window.jspdf;
//         const pdf = new jsPDF({
//             orientation: 'landscape',
//             unit: 'pt',
//             format: [a4Width, a4Height]
//         });

//         // Add the image to the PDF with scaling to fit A4 size
//         pdf.addImage(imgData, 'PNG', 0, 0, a4Width, a4Height);

//         // Generate the PDF as a Blob
//         const pdfBlob = pdf.output('blob');

//         // Create a URL for the Blob and open it in a new window
//         const pdfUrl = URL.createObjectURL(pdfBlob);
//         const newWindow = window.open(pdfUrl, '_blank');
//         if (newWindow) {
//             newWindow.focus();
//             newWindow.onload = function() {
//                 newWindow.print();
//             };
//         } else {
//             console.error('Failed to open new window. Please allow popups for this website.');
//             printBtn.textContent = 'Allow popups for this website';
//         }
//     } catch (error) {
//         console.error('Error generating PDF:', error);
//         printBtn.textContent = 'Print';
//     }
//     printBtn.textContent = 'Print'
// }

// const resetBtn = document.querySelector('.reset-btn');

// resetBtn.addEventListener('click', e => {
//     window.location.reload();
// });



///////////////////////////without JSPDF creates positioned text elements onload


// const wrapperForThemes = document.querySelector('.wrapper-for-themes');



// const canvasWidth = window.innerWidth - 400;
// const canvasHeight = window.innerHeight - 50; 

// const canvas = new fabric.Canvas('canvas', {
//     width: canvasWidth,
//     height: canvasHeight,
//     backgroundColor: 'transparent'
// });

// let themeImage;

// fabric.Image.fromURL('themes/theme1.jpg', function(img) {
//     // Set canvas dimensions to match viewport size
//     canvas.setDimensions({
//         width: canvasWidth,
//         height: canvasHeight
//     });

//     // Calculate the scale to fit the image within the canvas
//     const scaleFactor = Math.min(
//         canvasWidth / img.width,
//         canvasHeight / img.height
//     );

//     // Set image dimensions and position
//     img.scale(scaleFactor).set({
//         left: (canvasWidth - img.width * scaleFactor) / 2,
//         top: (canvasHeight - img.height * scaleFactor) / 2,
//         selectable: false, 
//         hasControls: false,
//         hasBorders: false, 
//         lockMovementX: true,
//         lockMovementY: true,
//         hoverCursor: 'default',
//         crossOrigin: 'anonymous', 
//         imageSmoothing: true,
//         imageSmoothingQuality: 'high'
//     });

//     canvas.add(img);
//     themeImage = img;

//     const fontSize = Math.min(img.width * scaleFactor, img.height * scaleFactor) * 0.1;
//     const textLeft = img.left + (img.width * scaleFactor) / 2; 
//     const textTop = img.top + (img.height * scaleFactor) * 0.28 ////change this for text top position

//     const text = new fabric.Textbox('Certificate Of Graduation', {
//         // left: canvasWidth / 2, 
//         // top: canvasHeight / 2, 
//         left: textLeft,
//         top: textTop,
//         fontSize: fontSize,
//         fill: '#87cefa',
//         fontWeight: '600',
//         editable: true,
//         textAlign: 'center',
//         lineHeight: 0.8,
//         fontFamily: 'cursive',
//         originX: 'center',
//         originY: 'center',

//         width: canvasWidth * 0.48, ////change this for the starting text wrap pos
//     });

//     canvas.add(text);

//     const text2Top = textTop + fontSize * 1.5; // Adjust this value as needed for spacing
//     const text2 = new fabric.Textbox('This certificate is granted to', {
//         left: textLeft,
//         top: text2Top,
//         fontSize: fontSize * 0.4, // Adjust font size if needed
//         fill: 'black', // Light blue color
//         fontWeight: '200',
//         editable: true,
//         textAlign: 'center',
//         lineHeight: 0.8,
//         fontFamily: 'serif',
//         originX: 'center',
//         originY: 'center',
//         width: canvasWidth * 0.5,
//     });

//     canvas.add(text2);

//     const text3Top = text2Top + fontSize * .8; // Adjust this value as needed for spacing
//     const text3 = new fabric.Textbox('FULL NAME', {
//         left: textLeft,
//         top: text3Top,
//         fontSize: fontSize * 0.7, // Adjust font size if needed
//         fill: 'black', // Light blue color
//         fontWeight: 'bold',
//         editable: true,
//         textAlign: 'center',
//         lineHeight: 0.8,
//         fontFamily: 'serif',
//         originX: 'center',
//         originY: 'center',
//         width: canvasWidth * 0.5,
//     });

//     canvas.add(text3);

//     const text4Top = text3Top + fontSize * 1; // Adjust this value as needed for spacing
//     const text4 = new fabric.Textbox('For completing the Sunshine Preschool class of 2024', {
//         left: textLeft,
//         top: text4Top,
//         fontSize: fontSize * 0.4, // Adjust font size if needed
//         fill: 'black', // Light blue color
//         fontWeight: '200',
//         editable: true,
//         textAlign: 'center',
//         lineHeight: 0.8,
//         fontFamily: 'serif',
//         originX: 'center',
//         originY: 'center',
//         width: canvasWidth * 0.4,
//         lineHeight: 1.1,
//     });

//     canvas.add(text4);

//     const signatureLineTop = text4Top + (fontSize * 0.6) * 2; // Adjust this value for spacing

//     const signatureLineWidth = canvasWidth * 0.15; 

//     const signatureLine = new fabric.Line(
//         [textLeft - canvasWidth * 0.2, signatureLineTop, textLeft - canvasWidth * 0.05, signatureLineTop],
//         {
//             stroke: '#000000', // Black color
//             strokeWidth: 2, // Adjust the line width here
//             selectable: true, // Make the line selectable
//             hasControls: true, // Enable controls for resizing
//             hasBorders: true, // Enable borders for the line
//             lockRotation: true, // Lock rotation
//             originX: 'left',
//             originY: 'center'
//         }
//     );

//     canvas.add(signatureLine);

//     const signatureLine2 = new fabric.Line(
//         [textLeft + canvasWidth * 0.05, signatureLineTop, textLeft + canvasWidth * 0.05 + signatureLineWidth, signatureLineTop],
//         {
//             stroke: '#000000', // Black color
//             strokeWidth: 2, // Adjust the line width here
//             selectable: true, // Make the line selectable
//             hasControls: true, // Enable controls for resizing
//             hasBorders: true, // Enable borders for the line
//             lockRotation: true, // Lock rotation
//             originX: 'left',
//             originY: 'center'
//         }
//     );

//     canvas.add(signatureLine2);

//     const nameTextBoxTop = signatureLineTop + fontSize * 0.1; // Adjust this value for spacing
//     const nameTextBox1 = new fabric.Textbox('Director', {
//         left: textLeft - canvasWidth * 0.125, // Center under the left signature line
//         top: nameTextBoxTop,
//         fontSize: fontSize * 0.3, // Adjust font size if needed
//         fill: '#000000', // Black color
//         editable: true,
//         textAlign: 'center',
//         lineHeight: 1.2, // Adjust line height as needed
//         fontFamily: 'cursive',
//         originX: 'center',
//         originY: 'top',
//         width: signatureLineWidth,
//     });

//     canvas.add(nameTextBox1);

//     const nameTextBox2 = new fabric.Textbox('Teacher', {
//         left: textLeft + canvasWidth * 0.125, // Center under the right signature line
//         top: nameTextBoxTop,
//         fontSize: fontSize * 0.3, // Adjust font size if needed
//         fill: '#000000', // Black color
//         editable: true,
//         textAlign: 'center',
//         lineHeight: 1.2, // Adjust line height as needed
//         fontFamily: 'cursive',
//         originX: 'center',
//         originY: 'top',
//         width: signatureLineWidth,
//     });

//     canvas.add(nameTextBox2);

//     canvas.renderAll();
// });

// /////////////////////////////////
// wrapperForThemes.addEventListener('click', function(e) {
//     const target = e.target;

//     if (target.classList.contains('theme1')) {
//         fabric.Image.fromURL('themes/theme1.jpg', function(img) {
//             setThemeImage(img); // Set theme image for theme1
//         });
//     } else if (target.classList.contains('theme2')) {
//         fabric.Image.fromURL('themes/theme2.jpg', function(img) {
//             setThemeImage(img); // Set theme image for theme2
//         });
//     }
    
// });
/////////////////////////////////






























/////////////////////////good version






const wrapperForThemes = document.querySelector('.wrapper-for-themes');
const canvas = new fabric.Canvas('canvas'); // Assuming you have a canvas element with id 'c'
let canvasWidth = window.innerWidth - 400;
let canvasHeight = window.innerHeight - 50;
let themeImage;
const textElements = [];

// Function to set the initial theme image
function setInitialThemeImage(img) {
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
        crossOrigin: 'anonymous',
        imageSmoothing: true,
        imageSmoothingQuality: 'high'
    });

    canvas.add(img);
    themeImage = img;

    // Add text elements
    let fontSize = Math.min(img.width * scaleFactor, img.height * scaleFactor) * 0.1;
    const textLeft = img.left + (img.width * scaleFactor) / 2;
    const textTop = img.top + (img.height * scaleFactor) * 0.28;

    const text = new fabric.Textbox('Certificate Of Graduation', {
        left: textLeft,
        top: textTop,
        fontSize: fontSize,
        fill: '#87cefa',
        fontWeight: '600',
        editable: true,
        textAlign: 'center',
        lineHeight: 0.8,
        fontFamily: 'cursive',
        originX: 'center',
        originY: 'center',
        width: canvasWidth * 0.48,
    });

    
    canvas.add(text);
    textElements.push(text);

    const text2Top = textTop + fontSize * 1.5;
    const text2 = new fabric.Textbox('This certificate is granted to', {
        left: textLeft,
        top: text2Top,
        fontSize: fontSize * 0.4,
        fill: 'black',
        fontWeight: '200',
        editable: true,
        textAlign: 'center',
        lineHeight: 0.8,
        fontFamily: 'serif',
        originX: 'center',
        originY: 'center',
        width: canvasWidth * 0.5,
    });

    canvas.add(text2);
    textElements.push(text2);

    const text3Top = text2Top + fontSize * .8;
    const text3 = new fabric.Textbox('FULL NAME', {
        left: textLeft,
        top: text3Top,
        fontSize: fontSize * 0.7,
        fill: 'black',
        fontWeight: 'bold',
        editable: true,
        textAlign: 'center',
        lineHeight: 0.8,
        fontFamily: 'serif',
        originX: 'center',
        originY: 'center',
        width: canvasWidth * 0.5,
    });

    canvas.add(text3);
    textElements.push(text3);

    const text4Top = text3Top + fontSize * 1;
    const text4 = new fabric.Textbox('For completing the Sunshine Preschool class of 2024', {
        left: textLeft,
        top: text4Top,
        fontSize: fontSize * 0.4,
        fill: 'black',
        fontWeight: '200',
        editable: true,
        textAlign: 'center',
        lineHeight: 1.1,
        fontFamily: 'serif',
        originX: 'center',
        originY: 'center',
        width: canvasWidth * 0.4,
    });

    canvas.add(text4);
    textElements.push(text4);

    const signatureLineTop = text4Top + (fontSize * 0.6) * 2;
    const signatureLineWidth = canvasWidth * 0.15;

    const signatureLine = new fabric.Line(
        [textLeft - canvasWidth * 0.2, signatureLineTop, textLeft - canvasWidth * 0.05, signatureLineTop],
        {
            stroke: '#000000',
            strokeWidth: 2,
            selectable: true,
            hasControls: true,
            hasBorders: true,
            lockRotation: true,
            originX: 'left',
            originY: 'center'
        }
    );

    canvas.add(signatureLine);

    const signatureLine2 = new fabric.Line(
        [textLeft + canvasWidth * 0.05, signatureLineTop, textLeft + canvasWidth * 0.05 + signatureLineWidth, signatureLineTop],
        {
            stroke: '#000000',
            strokeWidth: 2,
            selectable: true,
            hasControls: true,
            hasBorders: true,
            lockRotation: true,
            originX: 'left',
            originY: 'center'
        }
    );

    canvas.add(signatureLine2);

    const nameTextBoxTop = signatureLineTop + fontSize * 0.1;
    const nameTextBox1 = new fabric.Textbox('Director', {
        left: textLeft - canvasWidth * 0.125,
        top: nameTextBoxTop,
        fontSize: fontSize * 0.3,
        fill: '#000000',
        editable: true,
        textAlign: 'center',
        lineHeight: 1.2,
        fontFamily: 'cursive',
        originX: 'center',
        originY: 'top',
        width: signatureLineWidth,
    });

    canvas.add(nameTextBox1);
    textElements.push(nameTextBox1);

    const nameTextBox2 = new fabric.Textbox('Teacher', {
        left: textLeft + canvasWidth * 0.125,
        top: nameTextBoxTop,
        fontSize: fontSize * 0.3,
        fill: '#000000',
        editable: true,
        textAlign: 'center',
        lineHeight: 1.2,
        fontFamily: 'cursive',
        originX: 'center',
        originY: 'top',
        width: signatureLineWidth,
    });

    canvas.add(nameTextBox2);
    textElements.push(nameTextBox2);

    canvas.renderAll();

    // 
    
    

    
}

function changeFont(text){
    const activeObject = canvas.getActiveObject();
    if (activeObject === text) {
        console.log('nameTextBox2 is selected');
    } else {
        console.log('nameTextBox2 is not selected');
    }
}

changeFont()

// Load the initial theme image
fabric.Image.fromURL('themes/theme1.jpg', function(img) {
    setInitialThemeImage(img);
});

// Function to change the background image
function changeBackgroundImage(url) {
    fabric.Image.fromURL(url, function(img) {
        const scaleFactor = Math.min(
            canvasWidth / img.width,
            canvasHeight / img.height
        );

        img.scale(scaleFactor).set({
            left: (canvasWidth - img.width * scaleFactor) / 2,
            top: (canvasHeight - img.height * scaleFactor) / 2,
            selectable: false,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true,
            hoverCursor: 'default',
            crossOrigin: 'anonymous',
            imageSmoothing: true,
            imageSmoothingQuality: 'high'
        });

        if (themeImage) {
            canvas.remove(themeImage);
        }
        canvas.add(img);
        canvas.sendToBack(img);
        themeImage = img;
        canvas.renderAll();
    });
}

// Handle the click events on the theme buttons
document.querySelector('.wrapper-for-themes').addEventListener('click', function(e) {
    const target = e.target;

    if (target.classList.contains('theme1')) {
        changeBackgroundImage('themes/theme1.jpg');
    } else if (target.classList.contains('theme2')) {
        changeBackgroundImage('themes/theme2.jpg');
    }
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
            scale: 5,
        });

        // Convert the canvas to an image data URL
        const imgData = canvasElement.toDataURL('image/jpeg');

        // Create a Blob from the image data URL
        const response = await fetch(imgData);
        const blob = await response.blob();

        // Create a URL for the Blob and open it in a new window
        const blobUrl = URL.createObjectURL(blob);
        const newWindow = window.open(blobUrl, '_blank');
        if (newWindow) {
            newWindow.focus();
        } else {
            console.error('Failed to open new window. Please allow popups for this website.');
            printBtn.textContent = 'Allow popups for this website';
        }
    } catch (error) {
        console.error('Error generating image:', error);
        printBtn.textContent = 'Print';
    }
    printBtn.textContent = 'Print';
}

const resetBtn = document.querySelector('.reset-btn');

resetBtn.addEventListener('click', e => {
    window.location.reload();
});









