
    let todos = [];
 
    let toDoSubmitButton = document.getElementById('todoSubmitButton');
    let toDoSaveButton = document.getElementById('todoSaveButton');
    let toDoCancelButton = document.getElementById('todoCancelButton');
 
 
    if (document.cookie.length > 0) {
 
       let loaded = JSON.parse(document.cookie);
       todos = loaded;
 
    }
    else { // set of defaults
       todos = [[true, "Buy milk"],
       [false, "Take dog for a walk"],
       [false, "Call Jon Snow"],
       [true, "learn Spanish"]];
    }
 
    // split tasks to done and undone, case-insensitive sort, concatenate 
    let done = todos.filter(x => x[0]);
    let undone = todos.filter(x => !x[0]);
    done = done.sort(function (a, b) {
       return a[1].toLowerCase().localeCompare(b[1].toLowerCase());
    });
    undone = undone.sort(function (a, b) {
       return a[1].toLowerCase().localeCompare(b[1].toLowerCase());
    });
    todos = undone.concat(done);
 
 
    let cookieWrite = () => {
       document.cookie = JSON.stringify(todos);
    };
 
    let inputDescription = document.getElementById("inputDescription");
    document.getElementById("todoSubmitButton").addEventListener("click", function () {
       addNewItem(inputDescription.value);
    });
 
    inputDescription.addEventListener("input", function () {
       if (inputDescription.value == "") {
          FormError(true, inputDescription);
       }
 
       else {
          FormError(false, inputDescription); // cancel the red border
       }
    });
 
    inputDescription.addEventListener("keydown", function (c) {
       if (c.keyCode == 13 && !toDoSubmitButton.classList.contains("is-hidden")) {
          toDoSubmitButton.click();
       }
       else if (c.keyCode == 13) {
          toDoSaveButton.click();
       }
    });
    let taskInQuestion = null;
    let editFunctionality = () => {
       let editButtons = document.getElementsByClassName('edit');
 
       for (let i = 0; i < editButtons.length; i++) {
          editButtons[i].addEventListener("click", function () {
 
             // populate the edit field with todo #i
             inputDescription.value = todos[i][1];
 
             // show the edit buttons
             editMode(true);
             taskInQuestion = i;
             toDoSaveButton.addEventListener("click", modify = () => {
                if (inputDescription.value) {
                   console.log("editing " + taskInQuestion);
                   todos[taskInQuestion] = [false, inputDescription.value];
                   cookieWrite();
                   refresh();
                   toDoCancelButton.click();
                }
                else {
                   // FormError(true, inputDescription);
                }
             });
 
          })
       }
    }
 
    // generates markup for all the To Do items inluding event listeners for delete
    let refresh = () => {
 
       let newMarkup = "";
       for (let i = 0; i < todos.length; i++) {
          newMarkup += `
          <div class = "menu-label">
             <input type="checkbox" class = "checkbox" id="checkbox${i}" name = "checkbox${i}" ${todos[i][0] ? "checked" : ""}>
             <a id="e${i}" class="edit">
             <i class="fas fa-pencil-alt small"></i>
                     </a>
                <label class="checkboxlabel${todos[i][0] ? " done" : ""}" id="t${i}" for="checkbox${i}">${todos[i][1]}</label>
                     
                <a class="delete is-pulled-right id=d${i}"></a>
          </div>`
       }
       document.getElementById("tasks").innerHTML = newMarkup;
 
       let checkboxes = document.getElementsByClassName('checkbox');
       // set up event listeners for "doing" and "undoing"
       for (let i = 0; i < checkboxes.length; i++) {
          checkboxes[i].addEventListener("input", function () {
             for (let j = 0; j < todos.length; j++) {
                currentCheckBox = document.getElementById(`checkbox${j}`);
                todos[j][0] = currentCheckBox.checked;
             }
             cookieWrite();
             refresh();
 
          });
       }
 
       // set up event listeners for delete
       let deleteButtons = document.getElementsByClassName('delete');
       {
          for (let i = 0; i < deleteButtons.length; i++) {
             deleteButtons[i].addEventListener("click", function () {
                todos.splice(i, 1);
 
                cookieWrite();
                refresh();
                console.log("deleted a ToDo and saved");
             })
          }
       }
 
       editFunctionality();
 
    }
 
    refresh();
 
    let addNewItem = (description) => {
       if (!description || !description.match(/\w/)) {
          FormError(true, inputDescription);
       }
       else {
          todos.push([false, description]);
          cookieWrite();
          refresh();
          toDoCancelButton.click();
       }
    }
 
    // EDIT interface
 
 
    let editMode = (active) => {
       if (active) {
 
          toDoSubmitButton.classList.add("is-hidden");
          toDoSaveButton.classList.remove("is-hidden");
          toDoCancelButton.classList.remove("is-hidden");
       }
       else {
          toDoSubmitButton.classList.remove("is-hidden");
          toDoSaveButton.classList.add("is-hidden");
          toDoCancelButton.classList.add("is-hidden");
       }
    };
 
    toDoCancelButton.addEventListener("click", function () {
       editMode(false);
       inputDescription.value = "";
       taskInQuestion = null;
 
    });
 
    //
 
    editFunctionality();
 