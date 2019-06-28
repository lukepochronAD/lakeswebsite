// input validation to be moved into separate module
const FormError = (isError = true, differentInput = null) => {

   let input;
   if (differentInput) {
      input = differentInput;
   }
   else {
      input = document.getElementById("userTextInput");
   }
   if (isError) {
      input.classList.remove("is-primary");
      input.classList.add("is-danger");
   }
   else {
      input.classList.add("is-primary");
      input.classList.remove("is-danger");
   }
}

let todos = [];
const toDoSubmitButton = document.getElementById('todoSubmitButton');
toDoSubmitButton.addEventListener("click", function () {
   addNewItem((<HTMLInputElement>inputDescription).value);
});
const toDoSaveButton = document.getElementById('todoSaveButton');
const toDoCancelButton = document.getElementById('todoCancelButton');
const inputDescription = document.getElementById("inputDescription");
let taskInQuestion = null; // for editing

const editMode = (active) => { // visual feedback; toggle the buttons
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

// CREATE
const addNewItem = (description) => {
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

   // use [ENTER] to submit
inputDescription.addEventListener("keydown", function (c) {
   if (c.keyCode == 13 && !toDoSubmitButton.classList.contains("is-hidden")) {
      toDoSubmitButton.click();
   }
   else if (c.keyCode == 13) {
      toDoSaveButton.click();
   }
});

   // basic input validation
inputDescription.addEventListener("input", function () {
   if ((<HTMLInputElement>inputDescription).value == "") {
      FormError(true, inputDescription);
   }

   else {
      FormError(false, inputDescription); // cancel the red border
   }
});

const cookieWrite = () => {
   document.cookie = JSON.stringify(todos);
};

// READ =>check for cookie or use defaults
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

// split tasks to done and undone and then sort and concatenate 
let done = todos.filter(x => x[0]);
let undone = todos.filter(x => !x[0]);
done = done.sort(function (a, b) {
   return a[1].toLowerCase().localeCompare(b[1].toLowerCase());
});
undone = undone.sort(function (a, b) {
   return a[1].toLowerCase().localeCompare(b[1].toLowerCase());
});
todos = undone.concat(done);


// generates markup for all TO DO items.
const refresh = () => {

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
            let currentCheckBox = document.getElementById(`checkbox${j}`);
            todos[j][0] = (<HTMLInputElement>currentCheckBox).checked;
         }
         cookieWrite();
         refresh();

      });
   }

// UPDATE => set up event listeners for editing.

const editButtons = document.getElementsByClassName('edit');

   for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener("click", function () {

         // populate the edit field with todo #i
         (<HTMLInputElement>inputDescription).value = todos[i][1];
         FormError(false, inputDescription);
         // show the edit buttons
         editMode(true);
         taskInQuestion = i;
         let modify = () => {
            if ((<HTMLInputElement>inputDescription).value) {
               console.log("editing " + taskInQuestion);
               todos[taskInQuestion] = [false, (<HTMLInputElement>inputDescription).value];
               cookieWrite();
               refresh();
               toDoCancelButton.click();
            }
            else {
               // FormError(true, inputDescription);
            }
         }
         toDoSaveButton.addEventListener("click", modify);

      })
   }

   // DELETE => set up event listeners for deleting
   const deleteButtons = document.getElementsByClassName('delete');
   {
      for (let i = 0; i < deleteButtons.length; i++) {
         deleteButtons[i].addEventListener("click", function () {
            todos.splice(i, 1);

            cookieWrite();
            refresh();

         })
      }
   }
}

refresh();

toDoCancelButton.addEventListener("click", function () {

   editMode(false);
   (<HTMLInputElement>inputDescription).value = "";
   taskInQuestion = null;
});