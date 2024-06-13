
function getAndUpdate() {
    console.log("Updating List...");
    let tit = document.getElementById('title').value;
    let desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') === null) {
        let itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        let itemJsonArrayStr = localStorage.getItem('itemsJson');
        let itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    }
    update();
}

function update() {
    if (localStorage.getItem('itemsJson') === null) {
        let itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        let itemJsonArrayStr = localStorage.getItem('itemsJson');
        let itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    // For table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    let itemJsonArrayStr = localStorage.getItem('itemsJson');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
                <th class="border px-4 py-2" scope="row">${index + 1}</th>
                <td class="border px-4 py-2">${element[0]}</td>
                <td class="border px-4 py-2">${element[1]}</td>
                <td class="border px-4 py-2"><button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onclick="deleted(${index})">Delete</button></td>
            </tr>`;
    });
    tableBody.innerHTML = str;
}
document.getElementById("add").addEventListener("click", getAndUpdate);
update();

function deleted(itemIndex) {
    console.log("Delete", itemIndex);
    let itemJsonArrayStr = localStorage.getItem('itemsJson');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

function clearStorage() {
    if (confirm("Hey Buddy Are you seriously want To clear the Storage???? ")) {
        console.log('Clearing the storage');
        localStorage.clear();
        update();
    }
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }