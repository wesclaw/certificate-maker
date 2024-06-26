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

/////////////////above is with JSPDF

const wrapperForThemes = document.querySelector('.wrapper-for-themes');

const canvas = new fabric.Canvas('canvas'); 

let canvasWidth = window.innerWidth - 400;
let canvasHeight = window.innerHeight - 50;

let themeImage;

const textElements = [];

let fontFamily;
let fontSize;
let textColor;
let lineHeight;

function setInitialThemeImage(img) {
    
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
        objectCaching: false,
        transparentCorners: false,
    });
    
    canvas.add(text);
    textElements.push(text);
    createOptionsBubble(text);

    const text2Top = textTop + fontSize * 1.5;

    const text2 = new fabric.Textbox('This certificate is granted to', {
        left: textLeft,
        top: text2Top,
        fontSize: fontSize * 0.4,
        fill: '#000000',
        fontWeight: '200',
        editable: true,
        textAlign: 'center',
        lineHeight: 0.8,
        fontFamily: 'serif',
        originX: 'center',
        originY: 'center',
        transparentCorners: false,
        width: canvasWidth * 0.48
    });

    canvas.add(text2);
    textElements.push(text2);
    createOptionsBubble(text2);

    const text3Top = text2Top + fontSize * 0.8;
    const text3 = new fabric.Textbox('FULL NAME', {
        left: textLeft,
        top: text3Top,
        fontSize: fontSize * 0.7,
        fill: '#000000',
        fontWeight: 'bold',
        editable: true,
        textAlign: 'center',
        lineHeight: 0.8,
        fontFamily: 'serif',
        originX: 'center',
        originY: 'center',
        width: canvasWidth * 0.5,
        transparentCorners: false,
    });

    canvas.add(text3);
    textElements.push(text3);
    createOptionsBubble(text3);

    const lineTop = text3Top + (fontSize * 0.7) / 2 + 5; // 5 pixels below text3
    const lineLeftStart = textLeft - (canvasWidth * 0.22);
    const lineLeftEnd = textLeft + (canvasWidth * 0.22);

    // Create and add the dashed line
    const dashedLine = new fabric.Line([lineLeftStart, lineTop, lineLeftEnd, lineTop], {
        stroke: '#000000',
        strokeWidth: 4,
        strokeDashArray: [5, 5], // 5px dash, 5px gap
        originX: 'center',
        originY: 'center'
    });
    canvas.add(dashedLine);
    createOptionsBubble(dashedLine);

    const text4Top = text3Top + fontSize * 1.2;
    const text4 = new fabric.Textbox('For completing the Sunshine Preschool class of 2024', {
        left: textLeft,
        top: text4Top,
        fontSize: fontSize * 0.4,
        fill: '#000000',
        fontWeight: '200',
        editable: true,
        textAlign: 'center',
        lineHeight: 1.1,
        fontFamily: 'serif',
        originX: 'center',
        originY: 'center',
        transparentCorners: false,
        width: canvasWidth * 0.4,
    });

    canvas.add(text4);
    textElements.push(text4);
    createOptionsBubble(text4);

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
            originY: 'center',
            transparentCorners: false,
        }
    );

    canvas.add(signatureLine);
    createOptionsBubble(signatureLine);

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
            originY: 'center',
            transparentCorners: false,
        }
    );

    canvas.add(signatureLine2);
    createOptionsBubble(signatureLine2);

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
        transparentCorners: false,
    });

    canvas.add(nameTextBox1);
    textElements.push(nameTextBox1);
    createOptionsBubble(nameTextBox1);

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
        transparentCorners: false,
    });

    canvas.add(nameTextBox2);
    textElements.push(nameTextBox2);
    createOptionsBubble(nameTextBox2);

    canvas.renderAll();
}

// Function to create the options bubble for each text element
function createOptionsBubble(textElement) {
    const optionsBubble = document.createElement('div');
    optionsBubble.className = 'optionsBubble';
    optionsBubble.style.position = 'absolute';
    optionsBubble.style.display = 'none';
    optionsBubble.style.background = 'white';
    optionsBubble.style.border = '1px solid #ccc';
    optionsBubble.style.padding = '5px';
    optionsBubble.style.borderRadius = '5px';
    optionsBubble.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    optionsBubble.style.zIndex = '1000';

    const deleteButton = document.createElement('button');
    deleteButton.style.background = 'lightgray';
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.borderRadius = '3px';

    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'icons/delete.png';
    deleteIcon.style.width = '30px'; 
    deleteIcon.style.height = '30px'; 
    deleteIcon.style.verticalAlign = 'middle'; 
    deleteButton.appendChild(deleteIcon);

    const centerButton = document.createElement('button');
    centerButton.style.background = 'ghostwhite';
    centerButton.style.padding = '5px 10px';
    centerButton.style.cursor = 'pointer';
    centerButton.style.borderRadius = '3px';
    centerButton.style.marginLeft = '5px';

    const centerIcon = document.createElement('img');
    centerIcon.src = 'icons/center.png'; 
    centerIcon.style.width = '30px'; 
    centerIcon.style.height = '30px'; 
    centerIcon.style.verticalAlign = 'middle'; 

    centerButton.appendChild(centerIcon);

    optionsBubble.appendChild(deleteButton);
    optionsBubble.appendChild(centerButton);
    document.body.appendChild(optionsBubble);

    document.body.appendChild(optionsBubble);

    const canvasElement = canvas.upperCanvasEl; 
    const rect = canvasElement.getBoundingClientRect();
    optionsBubble.style.left = `${rect.left}px`; 
    optionsBubble.style.top = `${rect.top - optionsBubble.offsetHeight}px`; 
    document.body.appendChild(optionsBubble);

    //////////////////////////////////////////////////////////////

    const fontSelect = document.getElementById('fontSelect');
    const fontSizeInput = document.getElementById('fontSizeInput');
    const fontColorInput = document.getElementById('fontColorInput')

    function changeStyles(textElement) {
        const getFontFamily = fontSelect.value;
        textElement.set('fontFamily', getFontFamily);
        textElement.canvas.renderAll(); 
    }

    function changeFontSize(textElement) {
        const getFontSize = fontSizeInput.value;
        const fontSize = Math.floor(parseInt(getFontSize, 10));
        textElement.set('fontSize', fontSize);
        textElement.canvas.renderAll();
    }

    function changeFontColor(textElement){
        const getFontColor = fontColorInput.value;
        textElement.set('fill', getFontColor);
        textElement.set('stroke', getFontColor);
        textElement.canvas.renderAll();
    }

    textElement.on('selected', () => {
        optionsBubble.style.display = 'block';
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            fontSelect.value = activeObject.fontFamily || 'Arial'; 
            fontSizeInput.value = Math.ceil(activeObject.fontSize) || 40;
            fontColorInput.value = activeObject.fill || '#000000';
        }else if(activeObject.type === 'line'){
            fontColorInput.value = activeObject.stroke || '#000000';
        }
    });

    fontSelect.addEventListener('change', () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            changeStyles(activeObject);
        }
    })

    fontSizeInput.addEventListener('input', () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            changeFontSize(activeObject);
        }
    });

    fontColorInput.addEventListener('input', () => {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox' || activeObject.type==='line') {
            changeFontColor(activeObject);
        }
    });



    textElement.on('deselected', () => {
        optionsBubble.style.display = 'none';
    });

    deleteButton.addEventListener('click', () => {
        canvas.remove(textElement);
        optionsBubble.style.display = 'none';
    });

    centerButton.addEventListener('click', () => {
        textElement.set({
            left: canvasWidth / 2
        });
        textElement.setCoords();  
        canvas.renderAll();
    });



    if (!window.fabricEventListenersAdded) {
        window.fabricEventListenersAdded = true;

        ////selecting more than one element
    
        canvas.on('selection:created', function(e) {
            const selectedObjects = e.selected;

            if (e.selected.length > 1) {
            
            const existingBubbles = document.querySelectorAll('.optionsBubble');
            existingBubbles.forEach(bubble => bubble.style.display = 'none');

            const newOptionsBubble = document.createElement('div');
            newOptionsBubble.className = 'newOptionsBubble'; 
            newOptionsBubble.style.position = 'absolute';
            newOptionsBubble.style.display = 'block';
            newOptionsBubble.style.background = 'white';
            newOptionsBubble.style.border = '1px solid #ccc';
            newOptionsBubble.style.padding = '5px';
            newOptionsBubble.style.borderRadius = '5px';
            newOptionsBubble.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
            newOptionsBubble.style.zIndex = '1000';

            const deleteButton = document.createElement('button');
            deleteButton.style.background = 'lightgray';
            deleteButton.style.padding = '5px 10px';
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.borderRadius = '3px';
        
            const deleteIcon = document.createElement('img');
            deleteIcon.src = 'icons/delete.png';
            deleteIcon.style.width = '30px'; 
            deleteIcon.style.height = '30px'; 
            deleteIcon.style.verticalAlign = 'middle'; 
            deleteButton.appendChild(deleteIcon);

            newOptionsBubble.appendChild(deleteButton);

            const newCenterButton = document.createElement('button');
            newCenterButton.style.background = 'ghostwhite';
            newCenterButton.style.padding = '5px 10px';
            newCenterButton.style.cursor = 'pointer';
            newCenterButton.style.borderRadius = '3px';
            newCenterButton.style.marginLeft = '5px';
        
            const newCenterIcon = document.createElement('img');
            newCenterIcon.src = 'icons/center.png'; 
            newCenterIcon.style.width = '30px'; 
            newCenterIcon.style.height = '30px'; 
            newCenterIcon.style.verticalAlign = 'middle'; 
        
            newCenterButton.appendChild(newCenterIcon);
            newOptionsBubble.appendChild(newCenterButton);

            
           ///////this appends it to the top of the canvas perfectly
            const canvasElement = canvas.upperCanvasEl; 
            const rect = canvasElement.getBoundingClientRect();
            newOptionsBubble.style.left = `${rect.left}px`; 
            newOptionsBubble.style.top = `${rect.top - newOptionsBubble.offsetHeight}px`; 
            document.body.appendChild(newOptionsBubble);
                
              deleteButton.addEventListener('click', function() {
                e.selected.forEach(element => {
                    canvas.remove(element);
                });
                newOptionsBubble.remove(); 
              });
                
            newCenterButton.addEventListener('click', function() {
                let activeObject = canvas.getActiveObject();
                
                if (activeObject && activeObject.type === 'activeSelection') {
                    let group = activeObject.toGroup();
                    let groupCenterX = (canvas.getWidth() / 2) - (group.width / 2);
            
                    group.set({
                        left: groupCenterX
                    }).setCoords();
            
                    canvas.discardActiveObject();
                    group.toActiveSelection();
            
                    canvas.renderAll();
                }
            }); 
          }
        });
    
        canvas.on('selection:cleared', function(e) {
            const newOptionsBubble = document.querySelector('.newOptionsBubble')
            if(newOptionsBubble){
                newOptionsBubble.remove()
            }
        });
    }
}


        const addTextInput = document.getElementById('addTextInput');
        const submitTextBtn = document.querySelector('.submitTextBtn');

        // Add event listener to the button
        submitTextBtn.addEventListener('click', function(e) {
            e.preventDefault()
            const text = addTextInput.value;

            if (text) {
                const textBox = new fabric.Textbox(text, {
                    left: 200,
                    top: 200,
                    width: 200,
                    fontSize: 50,
                    transparentCorners: false,
                    textAlign: 'center',
                    originX: 'center',
                    originY: 'center',            
                });

                canvas.add(textBox);
                canvas.setActiveObject(textBox);

                textElements.push(textBox);
                createOptionsBubble(textBox);
                
                addTextInput.value = '';

                canvas.renderAll()
            }
        });

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


const getAllThemes = document.querySelectorAll('.theme')

// Handle the click events on the theme buttons
document.querySelector('.wrapper-for-themes').addEventListener('click', function(e) {
    const target = e.target.classList;

    if(target.contains('theme')){
        getAllThemes.forEach((theme)=>{
            theme.classList.remove('activeTheme');
        })
    }

    target.add('activeTheme');

    if (target.contains('theme1')) {
        changeBackgroundImage('themes/theme1.jpg');
    } else if (target.contains('theme2')) {
        changeBackgroundImage('themes/theme2.jpg'); 
    }
});



/////////////////////////////// the print btn





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
            scale: 4,
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









