// get saved entries from local storage
// if nothing is saved yet, start with empty list
let journal = JSON.parse(localStorage.getItem("journalEntries")) || [];


// open or close the popup
function toggleModal() {

    const modal = document.getElementById("modal");

    modal.classList.toggle("hidden");

}


// add a new journal entry
function addEntry() {

    // get values from input
    const title = document.getElementById("entryTitle").value;
    const text = document.getElementById("entryText").value;


    // prevent empty notes
    if (title === "" || text === "") {
        alert("Write something first");
        return;
    }


    // create entry object
    const entry = {
        title: title,
        text: text,
        date: new Date().toLocaleString()
    };


    // add entry to list
    journal.push(entry);


    // save to local storage
    localStorage.setItem("journalEntries", JSON.stringify(journal));


    // refresh the list
    displayEntries();


    // clear input
    document.getElementById("entryTitle").value = "";
    document.getElementById("entryText").value = "";


    // close popup
    toggleModal();

}


// delete entry using its index
function deleteEntry(index) {

    // remove item from array
    journal.splice(index, 1);


    // update local storage
    localStorage.setItem("journalEntries", JSON.stringify(journal));


    // refresh list
    displayEntries();

}


// show entries on the page
function displayEntries() {

    const feed = document.getElementById("journalFeed");

    feed.innerHTML = "";


    // loop through entries
    journal.forEach((entry, index) => {

        const div = document.createElement("div");

        div.className = "entry relative";

        div.innerHTML = `

<!-- delete button -->
<button onclick="deleteEntry(${index})"
style="
position:absolute;
top:10px;
right:10px;
width:28px;
height:28px;
border-radius:50%;
border:none;
background:#fee2e2;
color:#ef4444;
font-weight:bold;
cursor:pointer;
display:flex;
align-items:center;
justify-content:center;
transition:0.2s;
"
onmouseover="this.style.background='#ef4444'; this.style.color='white';"
onmouseout="this.style.background='#fee2e2'; this.style.color='#ef4444';"
>
✕
</button>

<h3 class="font-bold text-xl">${entry.title}</h3>

<p class="text-gray-600 mt-2">${entry.text}</p>

<p class="text-xs text-gray-400 mt-3">${entry.date}</p>

`;

        feed.appendChild(div);

    });

}


// run when page loads
displayEntries();