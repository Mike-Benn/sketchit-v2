// DOM element variables

const grid = document.querySelector('.grid');
const slider = document.querySelector('#size-slider');
const sizeValue = document.querySelectorAll('.grid-size');
const singleSizeValue = document.querySelector('.grid-size');
const penBtn = document.querySelector('#pen');
const fillBtn = document.querySelector('#fill-button');
const pickBtn = document.querySelector('#picker-button');
const clearBtn = document.querySelector('#clear');
const gridLinesBtn = document.querySelector('#grid-lines');
const foregroundColor = document.querySelector('#forecolor');
const backgroundColor = document.querySelector('#backcolor');
const eraserBtn = document.querySelector('#eraser');
const prismaticBtn = document.querySelector('#prismatic');
const darkenBtn = document.querySelector('#darken');
const brightenBtn = document.querySelector('#brighten');
let squares = document.querySelectorAll('.square');



// Button status variables

let gridLines = true;
let penSelected = false;
let fillSelected = false;
let pickerSelected = false;
let eraserSelected = false;
let prismaticSelected = false;
let darkenSelected = false;
let brightenSelected = false;



// ####################################################
//            Miscellaneous Helper Functions
// ####################################################



// Converts RGB string to usable RGB array

function stringToRGB(str) {
    startingIndex = str.indexOf("(") + 1;
    finishingIndex = str.lastIndexOf(")");
    str = str.substring(startingIndex , finishingIndex);
    strArray = str.split(",");
    return strArray;

}

// Converts usable RGB array to Hex color value

function rgbToHex(r,g,b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  
    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
  
    return "#" + r + g + b;

}



// ####################################################
//                 Grid Maker Functions
// ####################################################



// Function that pulls grid size value from slider and loops until dimension value is reached, calls draw() on completion to set pen utensil as current utensil.

function makeGrid() {
    dimensionIndex = slider.value;
    for (let heightIndex = 0; heightIndex < dimensionIndex; heightIndex++) {
        let container = document.createElement('div');
        container.classList.add('grid-row');
        container.setAttribute('draggable' , 'false');

        for (let widthIndex = 0; widthIndex < dimensionIndex; widthIndex++) {
            let div = document.createElement('div');
            div.classList.add('square');
            div.setAttribute('draggable' , 'false');
            div.style.backgroundColor = "#ffffff"
            container.setAttribute('draggable' , 'false');
            container.appendChild(div);
            if (widthIndex == dimensionIndex - 1) {
                grid.appendChild(container);

            }

        }
    }
    
    squares = document.querySelectorAll('.square');
    if (gridLines == false) {
        squares.forEach(square => {
            square.style.border = "none";
            
        })    
    
    }
    
    
}

// All child nodes of grid are deleted using a while loop triggered by slider change event, afterward the makeGrid function is called to generate a new set of grid rows.

function replaceGrid() {
    slider.addEventListener('change' , () => {
        deselectButtons();
        while (grid.firstChild) {
            grid.firstChild.remove();

        }
        makeGrid();
        squares = document.querySelectorAll('.square');

              
    })
}

// Gets value from the slider and sets the heading under the slider to display the dimensions in the grid-size span.

function displayDimension() {
    slider.addEventListener('input' , () => {
        sizeValue.forEach(value => {
            value.textContent = slider.value;

        })
    })
}



// ####################################################
//               Drawing Effect Functions
// ####################################################



// Sets event target to the value of the current pen color.

function setForeColor(event) {
    event.target.style.backgroundColor = foregroundColor.value;

}

// Sets event target to the background color input.

function setBackColor(event) {
    event.target.style.backgroundColor = backgroundColor.value;

}

// Generates random red, green, and blue values then converts to hex code and assigns to the event target's background color.

function setPrismColor(event) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    event.target.style.backgroundColor = rgbToHex(r , g , b);

}

// Loops through each square removing every mouseenter event listener associated with the setForeColor function.

function togglePenDrag() {    
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setForeColor);

    })
}

// Removes pen drag effect from body and squares when user triggers mouseup event.

function removePenEnter() {
    document.body.addEventListener('mouseup' , togglePenDrag);
    squares.forEach(square => {
        square.addEventListener('mouseup' , togglePenDrag);

    })
}

// Removes eraser drag effect from body and squares when user triggers mouseup event.

function removeEraseEnter() {
    document.body.addEventListener('mouseup' , toggleEraserDrag);
    squares.forEach(square => {
        square.addEventListener('mouseup' , toggleEraserDrag);

    })
}

// Loops through each square removing every mouseenter event listener associated with the setBackColor function.

function toggleEraserDrag() {
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setBackColor);

    })
}

// Loops through each square removing every mouseenter event listener associated with the setPrismColor function.

function togglePrismDrag() {    
    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setPrismColor);

    })
}

// Removes prism drag effect from body and squares when user triggers mouseup event.

function removePrismEnter() {
    document.body.addEventListener('mouseup' , togglePrismDrag);
    squares.forEach(square => {
        square.addEventListener('mouseup' , togglePrismDrag);

    })
}



// ####################################################
//              Deselect Button Functions
// ####################################################



// Remove functions that set utensil status to false and removes all mouse listeners associated with that utensil.

function removePen() {
    penSelected = false;

    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setForeColor);
        square.removeEventListener('mousedown' , drawHelper);
        square.removeEventListener('mousedown' , setForeColor);
        square.removeEventListener('mouseup' , togglePenDrag);

    })
    document.body.removeEventListener('mouseup' , togglePenDrag);
}

function removeEraser() {
    eraserSelected = false;

    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setBackColor);
        square.removeEventListener('mousedown' , drawEraseHelper);
        square.removeEventListener('mousedown' , setBackColor);
        square.removeEventListener('mouseup' , toggleEraserDrag);

    })
    document.body.removeEventListener('mouseup' , toggleEraserDrag);
}

function removeFill() {
    fillSelected = false;

    grid.removeEventListener('mousedown' , fillGridHelper);

}

function removePicker() {
    pickerSelected = false;

    squares.forEach(square => {
        square.removeEventListener('mousedown' , colorPickerHelper);

    })
}

function removePrism() {
    prismaticSelected = false;

    squares.forEach(square => {
        square.removeEventListener('mouseenter' , setPrismColor);
        square.removeEventListener('mousedown' , drawPrismHelper);
        square.removeEventListener('mousedown' , setPrismColor);
        square.removeEventListener('mouseup' , togglePrismDrag);

    })
    document.body.removeEventListener('mouseup' , togglePrismDrag);
}

function removeDarken() {
    darkenSelected = false;

    squares.forEach(square => {
        square.removeEventListener('mousedown' , darkenSquareHelper);

    })
}

function removeBrighten() {
    brightenSelected = false;

    squares.forEach(square => {
        square.removeEventListener('mousedown' , brightenSquareHelper);

    })
}

// Finds and sets the button currently selected to false and removes its listeners.
// Uses if statements to check what is currently active and uses all previously defined remove functions to remove those active buttons.

function deselectButtons() {
    if (penSelected) {
        penBtn.style.color = "#9fd3c7";
        penBtn.style.backgroundColor = "#385170";
        removePen();

    } else if (eraserSelected) {
        eraserBtn.style.color = "#9fd3c7";
        eraserBtn.style.backgroundColor = "#385170";
        removeEraser();

    } else if (prismaticSelected) {
        prismaticBtn.style.color = "#9fd3c7";
        prismaticBtn.style.backgroundColor = "#385170";
        removePrism();

    } else if (fillSelected) {
        fillBtn.style.color = "#9fd3c7";
        fillBtn.style.backgroundColor = "#385170";
        removeFill();

    } else if (pickerSelected) {
        pickBtn.style.color = "#9fd3c7";
        pickBtn.style.backgroundColor = "#385170";
        removePicker();

    } else if (darkenSelected) {
        darkenBtn.style.color = "#9fd3c7";
        darkenBtn.style.backgroundColor = "#385170";
        removeDarken();

    } else if (brightenSelected) {
        brightenBtn.style.color = "#9fd3c7";
        brightenBtn.style.backgroundColor = "#385170";
        removeBrighten();

    }
    
}



// ####################################################
// Utensil Toggles
// ####################################################



// Selects or deselects a utensil by: updating the utensil's status, deselecting all buttons, then triggers either the pen utensil or the current utensil being toggled.

function penToggle () {
    penBtn.addEventListener('click' , () => {
        if (penSelected) {
            penBtn.style.color = "#9fd3c7";
            penBtn.style.backgroundColor = "#385170";
            removePen();

        } else {
            penBtn.style.color = "#385170";
            penBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            penSelected = true;
            draw();

        }
    })
}

function fillToggle() {
    fillBtn.addEventListener('click' , () => {
        if (fillSelected) {
            fillBtn.style.color = "#9fd3c7";
            fillBtn.style.backgroundColor = "#385170";
            removeFill();
            
        } else {
            fillBtn.style.color = "#385170";
            fillBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            fillSelected = true;
            fillGrid();

        }
    })
}

function colorPickerToggle() {
    pickBtn.addEventListener('click' , () => {
        if (pickerSelected) {
            pickBtn.style.color = "#9fd3c7";
            pickBtn.style.backgroundColor = "#385170";
            deselectButtons();

        } else {
            pickBtn.style.color = "#385170";
            pickBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            pickerSelected = true;
            colorPicker();

        }
    })
}

function eraserToggle() {
    eraserBtn.addEventListener('click' , () => {
        if (eraserSelected) {
            eraserBtn.style.color = "#9fd3c7";
            eraserBtn.style.backgroundColor = "#385170";
            removeEraser();
            
        } else {
            eraserBtn.style.color = "#385170";
            eraserBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            eraserSelected = true;
            drawErase();
            
        }
    })
    
}

function prismaticToggle() {
    prismaticBtn.addEventListener('click' , () => {
        if (prismaticSelected) {
            prismaticBtn.style.color = "#9fd3c7";
            prismaticBtn.style.backgroundColor = "#385170";
            removePrism();

        } else {
            prismaticBtn.style.color = "#385170";
            prismaticBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            prismaticSelected = true;
            drawPrism();

        }
    })
}

function darkenToggle() {
    darkenBtn.addEventListener('click' , () => {
        if (darkenSelected) {
            darkenBtn.style.color = "#9fd3c7";
            darkenBtn.style.backgroundColor = "#385170";
            removeDarken();

        } else {
            darkenBtn.style.color = "#385170";
            darkenBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            darkenSelected = true;
            darkenSquare();

        }
    })
}

function brightenToggle() {
    brightenBtn.addEventListener('click' , () => {
        if (brightenSelected) {
            brightenBtn.style.color = "#9fd3c7";
            brightenBtn.style.backgroundColor = "#385170";
            removeBrighten();

        } else {
            brightenBtn.style.color = "#385170";
            brightenBtn.style.backgroundColor = "#9fd3c7";
            deselectButtons();
            brightenSelected = true;
            brightenSquare();

        }
    })
}



// ####################################################
//                    Grid Toggles
// ####################################################



// Toggles grid lines on and off by setting each square's border to none or 1px solid gray.

function toggleGridLines() {
    gridLinesBtn.addEventListener('click' , () => {
        if (gridLines) {
            gridLines = false;
            squares.forEach(square => {
                square.style.border = "none";

            })
        } else {
            gridLines = true;
            squares.forEach(square => {
                square.style.border = "1px solid gray";

            })
        }

    })
}

// Sets all squares to the current background color.

function clearGrid() {
    clearBtn.addEventListener('click' , () => {
        squares.forEach(square => {
            square.style.backgroundColor = backgroundColor.value;

        })
    })    
}



// ####################################################
//                    Pen Draw Functions
// ####################################################



// Sets the square the user triggers the mousedown event on to be set to the current pen color.

function drawStart() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , setForeColor);

    })
}

// Helper function that works inside the draw function and is triggered by that function's mousedown event. This helper then applies a mouseenter function to every square.
// This mouseenter function sets the current target to the current pen color effectively acting as the drag effect part of the pen.

function drawHelper() {
    squares.forEach(square => {
        square.addEventListener('mouseenter' , setForeColor);

    })
}

// Main pen drawing function that uses drawStart and drawHelper to let the pen change the background colors of squares by mousedown and moving the cursor into other squares.
// Function also calls removePenEnter which triggers on user mouseup and removes the drag event set by drawHelper.

function draw() {
    penSelected = true;
    squares.forEach(square => {
        square.addEventListener('mousedown' , drawHelper);

    })

    drawStart();
    removePenEnter();
}



// ####################################################
//                 Eraser Draw Functions
// ####################################################



// Sets the square the user triggers the mousedown event on to be set to the current background color.

function drawEraseStart() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , setBackColor);

    })
}

// Helper function that works inside the drawErase function and is triggered by that function's mousedown event. This helper then applies a mouseenter function to every square.
// This mouseenter function sets the current target to the current background color effectively acting as the drag effect part of the eraser.

function drawEraseHelper() {
    squares.forEach(square => {
        square.addEventListener('mouseenter' , setBackColor);

    })
}

// Main eraser drawing function that uses drawEraseStart and drawEraseHelper to let the eraser change the background colors of squares by mousedown and moving the cursor into other squares.
// Function also calls removeEraserEnter which triggers on user mouseup and removes the drag event set by drawEraserHelper.

function drawErase() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , drawEraseHelper);

    })
    drawEraseStart();
    removeEraseEnter();
}
    


// ####################################################
//                 Color Fill Functions
// ####################################################



// Fill grid helper function that loops through each square in the grid and applies the current pen color to each square's background color.

function fillGridHelper() {
    squares.forEach(square => {
        square.style.backgroundColor = foregroundColor.value;

    })
}

// Main fill grid function that adds a mousedown event to the grid that sets all squares in the grid to the current pen color.

function fillGrid() {
    if (fillSelected) {
        grid.addEventListener('mousedown' , fillGridHelper); 

    }
        
}



// ####################################################
//                 Color Picker Functions
// ####################################################



// Color picker helper function that takes the current event target's background color and converts it to a usable value.  
// That value is then converted to a hex color which is then used to set the pen color.  
// The picker deslects itself after one use and sets the pen utensil back as the currently selected one.

function colorPickerHelper(event) {
    rgbValue = stringToRGB(event.target.style.backgroundColor);
    r = parseInt(rgbValue[0]);
    g = parseInt(rgbValue[1]);
    b = parseInt(rgbValue[2]);
    foregroundColor.value = rgbToHex(r , g , b);
    deselectButtons();
    

}

// Main color picker function that adds a mousedown event listener with the colorPickerHelper function to every square if picker is selected.

function colorPicker() {
    if (pickerSelected) {
        squares.forEach(square => {
            square.addEventListener('mousedown' , colorPickerHelper) 

        })
    }
}



// ####################################################
//                   Darken Functions
// ####################################################



// Darken square helper function that takes an event and converts the event target's background color to an array of 3 values corresponding to a red, green and blue value.
// The values are then subtracted by 26(~10%) and made into a hex color and applied to the current target's background color darkening the square by about 10%.

function darkenSquareHelper(event) {
    rgbValue = stringToRGB(event.target.style.backgroundColor);
    r = parseInt(rgbValue[0]);
    g = parseInt(rgbValue[1]);
    b = parseInt(rgbValue[2]);

    if (r - 26 < 0) {
        r = 0;

    } else {
        r = r - 26;

    }


    if (g - 26 < 0) {
        g = 0;

    } else {
        g = g - 26;

    }


    if (b - 26 < 0) {
        b = 0;

    } else {
        b = b - 26;

    }

    event.target.style.backgroundColor = rgbToHex(r , g , b);
    
}

// Main darken square function that adds a mousedown event listener with the darkenSquareHelper function to every square if darken is selected. 

function darkenSquare() {
    if (darkenSelected) {
        squares.forEach(square => {
            square.addEventListener('mousedown' , darkenSquareHelper);

        })
    }
}



// ####################################################
//                   Brighten Functions
// ####################################################



// Brighten square helper function that takes an event and converts the event target's background color to an array of 3 values corresponding to a red, green and blue value.
// The values are then added by 26(~10%) and made into a hex color and applied to the current target's background color brightening the square by around 10%. 

function brightenSquareHelper(event) {
    rgbValue = stringToRGB(event.target.style.backgroundColor);
    r = parseInt(rgbValue[0]);
    g = parseInt(rgbValue[1]);
    b = parseInt(rgbValue[2]);

    if (r + 26 > 255) {
        r = 255;

    } else {
        r = r + 26;

    }


    if (g + 26 > 255) {
        g = 255;

    } else {
        g = g + 26;

    }


    if (b + 26 > 255) {
        b = 255;

    } else {
        b = b + 26;

    }

    event.target.style.backgroundColor = rgbToHex(r , g , b);
    
}

// Main brighten square function that adds a mousedown event listener with the brightenSquareHelper function to every square if brighten is selected. 

function brightenSquare() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , brightenSquareHelper);

    })
}



// ####################################################
//                Prismatic Draw Functions
// ####################################################



// Sets the square the user triggers the mousedown event on to be set to a color with randomly generated red, green, and blue values.

function drawPrismStart() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , setPrismColor);

    })
}

// Helper function that works inside the drawPrism function and is triggered by that function's mousedown event. This helper then applies a mouseenter function to every square.
// This mouseenter function sets the current target's color to a color with randomly generated values effectively acting as the drag effect part of the prismatic utensil.

function drawPrismHelper() {
    squares.forEach(square => {
        square.addEventListener('mouseenter' , setPrismColor);

    })
}

// Main prismatic drawing function that uses drawPrismStart and drawPrismHelper to let the prismatic utensil change the background colors of squares by mousedown and moving the cursor into other squares.
// Function also calls removePrismEnter which triggers on user mouseup and removes the drag event set by drawPrismHelper.

function drawPrism() {
    squares.forEach(square => {
        square.addEventListener('mousedown' , drawPrismHelper);

    })
    drawPrismStart();
    removePrismEnter();
}


// #########################################################################################


// Makes default grid on DOM loadup and adds the listeners to the main grid control buttons.  Also removes drag effect cursor from mousedown and drag.

document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;

    });
    makeGrid();
    replaceGrid();
    displayDimension();
    penToggle();
    fillToggle();
    colorPickerToggle();
    eraserToggle();
    prismaticToggle();
    darkenToggle();
    brightenToggle();
    toggleGridLines();
    clearGrid();
    penBtn.style.color = "#385170";
    penBtn.style.backgroundColor = "#9fd3c7";
    draw();
    

});

