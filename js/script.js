/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global Variables

const searchInput = document.getElementById('searchInput');
const ul = document.querySelector('.student-list');
let studentItems = ul.querySelectorAll('.student-item');           
const toggleContainer = document.getElementById('cycle');
const totalSize = studentItems.length;
let groupedArray = [];
const count = 10;


// Looping through items, pushing to array, appending buttons


function loopItems() {
    let studentItems = ul.querySelectorAll('.student-item');    // Recheck list to get all list items with student-item calss
    const studentItemsArray = Array.from(studentItems);         // Convert list of student items to array (to use slice method)
    groupedArray = [];                                          // Empty the array of student items every time loopItems is called (to reset after search)
    for (i = 0; i < studentItemsArray.length; i += count) {     // loop through all student items
        let groupSize = studentItemsArray.slice(i, i + count);  // slice into groups of 10
        groupedArray.push(groupSize);                           // push these groups of 10 into the groupedArray (2D array)
    }
    $(studentItems).hide();                                     //hide all items
    $(groupedArray[0]).show();                                  //show first array in 2D array
    createButtons()                                             //call function to create/recreate buttons whenever items are looped
}
loopItems();                                                    //call looped items function on first page load

//Search functionality

$('input[type="text"]').on('keyup', function() {
    // Declare variables;
    filter = searchInput.value.toUpperCase();                      // define search content as the value of the input
    for (i = 0; i < studentItems.length; i++) {                    // Loop through student-items               
        let name = studentItems[i].getElementsByTagName("h3")[0];  // define container containing what we're looking for
        txtValue = name.textContent;                               // define what we're looking for as the text content
        if (txtValue.toUpperCase().indexOf(filter) > -1) {         // if what we're looking for is an index of the input value 
            studentItems[i].style.display = "";                    // display default
            $(studentItems[i]).addClass('student-item');           // add student-item class, for inclusion in array
            //console.log(studentItemsArray[i].style.display = "");
        } else {
            studentItems[i].style.display = "none";                // otherwise display none
            $(studentItems[i]).removeClass('student-item');       // and remove class student-items, for removal from array
        }
    }
    loopItems();                                                   /* call the loop items function on every search, so we can re-check 
                                                                      how many student-items there are, and redefine what goes in the array */
})


// Creating and Appending page links

function createButtons() {
    $('#cycle span').remove();                                  //remove all page buttons (to reset after search)
    groupedArray.forEach(function(value, i) {                   //cicle through every array of 10 student-items
        let pageNum = i;                                        //define page Number
        pageNum = parseInt(pageNum);                            //convert page Number to integer
        pageNum = pageNum + 1;                                  //add 1 to page number
        let span = document.createElement('span');              //create span to house button with page number
        span.textContent = pageNum;                             //define text as housing the page number
        toggleContainer.appendChild(span);                      //append a page button for every grouping of 10
    })
}


// Define what items to show when page numbers are clicked

toggleContainer.addEventListener('click', (e) => {
    let button = event.target;                                  // target what is clicked
    if (button.tagName === 'SPAN') {                            // target specifically the spans holding the page numbers
        let index = button.textContent;                         // define the array index as the text in the button
        index = parseInt(index);                                // parse text as integer
        index = index - 1;                                      // subtract 1 from interger
        $(studentItems).hide();                                 // hide entire array
        $(groupedArray[index]).show();                          // show only student-items group with specififed index
    }
});