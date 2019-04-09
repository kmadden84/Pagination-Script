/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


// Global Variables


let allStudentItems = document.querySelectorAll('.student-item');
let ul = document.querySelector('.student-list');
const toggleContainer = document.getElementById('cycle');
const count = 10;
const studentClass = 'student-item';
const hidden = 'js-hidden';
const pageHeader = document.querySelector('.page-header');

const input = document.createElement('input');
input.setAttribute('id','searchInput');
input.setAttribute('class','search');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Search for names..')
input.setAttribute('value', '')

pageHeader.appendChild(input);

const button = document.createElement('button');
button.setAttribute('class','search')
button.textContent = 'SEARCH';

pageHeader.appendChild(button);

// Looping through items, pushing to array, appending buttons

function displayItems(page) {
    const pageIndex = typeof(page) === 'number' ? page : 0; // pageIndex starts at 0 if not specified, otherwise pull from text value of button
    let studentItems = document.querySelectorAll('.student-item'); // Recheck list to get all list items with student-item calss
    const start = pageIndex * count; // start of item range
    const end = (pageIndex + 1) * count; //end of item range

    //iF there are no items, show no items found

    if (studentItems.length === 0) {
        const noItemsEl = document.getElementById('noitems');
        if (!noItemsEl) {
        let noItems = document.createElement('span');
        noItems.id = 'noitems';
        noItems.textContent = 'no items found';
        ul.append(noItems);
    }
    } else {

        for (i = 0; i < studentItems.length; i++) { // loop through all student items
            //debugger;
            if (i >= start && i < end) { // if within range of items we want to show, show them
                studentItems[i].classList.remove(hidden);
            } else {
                studentItems[i].classList.add(hidden);  // if outside of range, hide them
            }
            const noItems = document.getElementById('noitems');
            console.log(noItems);
            if (noItems) {              
                ul.removeChild(noItems); // if "no items found" warning exists, hide it
            }
        }
    }
    createButtons(); //create page number bbuttons
}
displayItems(); //call looped items function on first page load


//Search functionality

function search() {
        // Declare variables;
    const filter = searchInput.value.toUpperCase(); // define search content as the value of the input
    for (i = 0; i < allStudentItems.length; i++) { // Loop through student-items               
        let name = allStudentItems[i].getElementsByTagName("h3")[0]; // define container containing what we're looking for
        txtValue = name.textContent; // define what we're looking for as the text content
        if (txtValue.toUpperCase().indexOf(filter) > -1) { // if what we're looking for is an index of the input value 
            allStudentItems[i].classList.add(studentClass); // add student-item class, for inclusion in range
            allStudentItems[i].classList.remove(hidden);
        } else {
            allStudentItems[i].classList.remove(studentClass); // otherwise, remove student-item class and hide items
            allStudentItems[i].classList.add(hidden); // and add class hidden to non-matching items
        }
    }
    displayItems(); //call display items function, to re-calculate page numbers while searching
}
button.addEventListener('click', function() {
search();
})
input.addEventListener('keyup', function() {
search();
});








// Creating and Appending page links

function createButtons() {
    let studentItems = document.querySelectorAll('.student-item'); //find all items with class "student-item"
    toggleContainer.innerHTML = ''; //remove all page buttons (to reset after search)
    for (i = 1; i <= Math.ceil(studentItems.length / count); i++) { // loop through all studen items
        let pageNum = i; //define page Number
        let span = document.createElement('span'); //create span to house button with page number
        span.textContent = pageNum; //define text as housing the page number
        toggleContainer.appendChild(span); //append a page button for every grouping of 10
    }
}


// Define what items to show when page numbers are clicked

toggleContainer.addEventListener('click', (e) => {
    let button = event.target; // target what is clicked
    if (button.tagName === 'SPAN') {
        let index = button.textContent; // define the array index as the text in the button
        index = parseInt(index); // parse text as integer
        index = index - 1; // subtract 1 from the value of the text button, so we start at 0
        displayItems(index); //call displayItems function with the value of the button
    }
});