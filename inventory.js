
const titleInput = document.querySelector("#todoTitle");
const descInput = document.querySelector("#todoDesc");
const titleInput2 = document.querySelector("#todoTitle2");
const descInput2 = document.querySelector("#todoDesc2");
const saveBtn = document.querySelector("#saveBtn");
const tblBody = document.querySelector("#tblBody");


document.querySelector("#cancel").addEventListener("click", function() {
    document.querySelector("#editTitle").value = "";
    document.querySelector("#editTitle2").value = "";
    document.querySelector("#editTitle3").value = "";
    document.querySelector("#editTitle4").value = "";
    document.querySelector("#edit-form").style.display = "none";
});


if (!localStorage.getItem("todo")) {
    let mkArray = new Array();
    localStorage.setItem("todo", JSON.stringify(mkArray));
};

const loopTodos = () => {
    // first empty table
    tblBody.innerHTML = "";
    let currentItem = JSON.parse(localStorage.getItem("todo"));
    // loop through local storage
    let serial = 1;
    currentItem.forEach((value, index) => {
        tblBody.innerHTML += `<tr id="singleTodo" data-itemid=${index}>
                            <td>${serial}</td>
                            <td>${value.title}</td>
                            <td>${value.desc}</td>
                            <td>${value.title2}</td>
                            <td>${value.desc2}</td>
                            <td>
                                <button id="edtBtn" class="edtBtn">Edit</button>
                                <button id="dltBtn" class="dltBtn">Delete</button>
                            </td>
                        </tr>`;
        serial++;
    });
    deleteTod();
    // if (currentItem.length === 0) {
    //     document.querySelector("#todoTableWrapper thead").style.display = "none";
    //     document.querySelector("#emptyId").innerHTML = "There is no Todo";
    // }
    // else {
    //     document.querySelector("#emptyId").innerHTML = "";
    //     document.querySelector("#todoTableWrapper thead").removeAttribute("style");
    // }
}
const saveTodo = () => {

  

        saveBtn.addEventListener("click", function () {

            let todoTitle = titleInput.value.trim();
            let todoDesc = descInput.value.trim();
            let todoTitle2 = titleInput2.value.trim();
            let todoDesc2 = descInput2.value.trim();

            let newTodo = {
                title: todoTitle,
                desc: todoDesc,
                title2: todoTitle2,
                desc2: todoDesc2
            }
            // get current items
            let currentTodos = JSON.parse(localStorage.getItem("todo"));
            currentTodos.push(newTodo);
            localStorage.clear();
  
            // set item again
            localStorage.setItem("todo", JSON.stringify(currentTodos));
            //empty input boxes
            titleInput.value = ""
            descInput.value = ""
            titleInput2.value = ""
            descInput2.value = ""
        
            // looptodos again
            loopTodos();
            
        });
    
    };


loopTodos();
function deleteTod() {
    // dlt & edt btn
    const allTodos = document.querySelectorAll("#singleTodo");
    allTodos.forEach((todo) => {
        todo.querySelector("#dltBtn").addEventListener("click", function () {
            let currentItem = JSON.parse(localStorage.getItem("todo"));
            let clickedIndex = Number(todo.getAttribute("data-itemid"));
            let remainingItems = currentItem.filter((item, index) => {
                return index !== clickedIndex;
            })
            // clear the local storage
            localStorage.clear();
            localStorage.setItem("todo", JSON.stringify(remainingItems));
            loopTodos();
        });
    });
    modifyTodo();
};
deleteTod();
function modifyTodo() {
    // dlt & edt btn
    const allTodos = document.querySelectorAll("#singleTodo");
    allTodos.forEach((todo) => {
        todo.querySelector("#edtBtn").addEventListener("click", function () {
            let currentItem = JSON.parse(localStorage.getItem("todo"));
            let clickedIndex = Number(todo.getAttribute("data-itemid"));
            document.querySelector("#editTitle").value = currentItem[clickedIndex].title;
            document.querySelector("#editTitle2").value = currentItem[clickedIndex].title2;
            document.querySelector("#editTitle3").value = currentItem[clickedIndex].desc;
            document.querySelector("#editTitle4").value = currentItem[clickedIndex].desc2;
            document.querySelector("#edit-form").style.display = "block";
            document.querySelector("#arrayIndex").value = clickedIndex;
        });
    });
};
modifyTodo();


function updateTodo() {

    document.querySelector("#update").addEventListener("click", function () {
        let currentItem = JSON.parse(localStorage.getItem("todo"));
        let editTitle = document.querySelector("#editTitle").value;
        let editTitle2 = document.querySelector("#editTitle2").value;
        let editTitle3 = document.querySelector("#editTitle3").value;
        let editTitle4 = document.querySelector("#editTitle4").value;

        let editObj = {
            title: editTitle,
            title2: editTitle2,
            desc: editTitle3,
            desc2: editTitle4
        }
        

        let updateIndex = Number(document.querySelector("#arrayIndex").value);
        currentItem[updateIndex] = editObj;

        localStorage.clear();
        localStorage.setItem("todo", JSON.stringify(currentItem));

        document.querySelector("#editTitle").value = "";
        document.querySelector("#editTitle2").value = "";
        document.querySelector("#editTitle3").value = "";
        document.querySelector("#editTitle4").value = "";
        document.querySelector("#edit-form").style.display="none";
        loopTodos();
    });

};


updateTodo();
saveTodo();


// Last Update: July 03, 2024, 09:35 am

//document.querySelector(".updates").innerHTML = "hi";

const btn = document.querySelector(".valueSubmit");
btn.addEventListener("click", ()=>{
    const updateInputs = document.querySelector(".dateInputValue").value;
    localStorage.setItem("inputv", JSON.stringify(updateInputs));
    updateDate();   
})

const updateDate = () => {
    const updateInput = JSON.parse(localStorage.getItem("inputv"));        

    if(updateInput){
        console.log("Retrieved input from localStorage:", updateInput);
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
    
        // Convert fullDate to a Date object
        const fullDateObj = new Date(`${year}-${month}-${day}`);
    
        // Convert updateInput to a Date object
        const [updateDay, updateMonth, updateYear] = updateInput.split("/").map(Number);
        const updateInputObj = new Date(`${updateYear}-${updateMonth}-${updateDay}`);
    
        // Subtract the dates (result is in milliseconds)
        const diffTime = fullDateObj - updateInputObj;
    
        // Convert milliseconds to days
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
        // Function to dynamically get days in a given month and year
        const getDaysInMonth = (month, year) => {
            return new Date(year, month, 0).getDate();
        }
    
        let remainingDays = diffDays;
        let totalMonths = 0;
    
        // Calculate months and days by looping through each month
        let currentMonth = updateMonth;
        let currentYear = updateYear;
    
        while (remainingDays >= getDaysInMonth(currentMonth, currentYear)) {
            remainingDays -= getDaysInMonth(currentMonth, currentYear);
            totalMonths++;
    
            // Move to the next month
            currentMonth++;
            if (currentMonth > 12) {
                currentMonth = 1;
                currentYear++;
            }
        }
    console.log(updateInput);
    
        document.querySelector(".updates").innerHTML = (`Last Update: ${totalMonths} month(s) and ${remainingDays} day(s) ago`);
    }
    }
    

updateDate();