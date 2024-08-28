
const arrayItems = [15,12,9,2,11,67];
const arrayContainer = document.getElementById("arrayContainer");
const updatesComponent = document.getElementById("updatesComponent");
const searchComponent = document.getElementById("searchComponent");
const addItemEl = document.getElementById("addItemComponent");
const txtAddNumber = document.getElementById("txtAddNumber");
const txtNumber = document.getElementById("txtNumber");

const addItemComponent = `<div class="arrayItem" onclick="displayAdd()"><i class="fa fa-add"></i></div>
`;


const displayArray = () => {
    arrayContainer.innerHTML = "";
    let index = 0;
    arrayItems.sort((a,b) => a - b);//sort the items first
    arrayItems.map(item => {
        arrayContainer.innerHTML += `<div ondblclick="deleteItem(${index})" id="${index}" class="arrayItem">${item}</div>`;
        index++;
    })
    
    arrayContainer.innerHTML += addItemComponent;
}

displayArray();
const addItem = () => {
    let num = Number(txtAddNumber.value);
    txtAddNumber.value = "";
    txtAddNumber.focus();
    arrayItems.push(num);
    displayArray();
}

const displayAdd = () =>{
    addItemEl.style.display == "none"?addItemEl.style.display = "flex":addItemEl.style.display = "none";
    addItemEl.style.display == "none"?searchComponent.style.display = "flex":searchComponent.style.display = "none";
}
const deleteItem = (index) => {
    for(let i = index;i<arrayItems.length;i++){
        arrayItems[i] = arrayItems[i+1];
    }
    arrayItems.pop();//remove the last element since it is the second last element now
    arrayContainer.innerHTML = "";
    displayArray();
}
const startSearch = () => {
    let num = txtNumber.value;
    arrayContainer.innerHTML = "";
    updatesComponent.innerHTML = `<p>Searching for <b>${num}</b>...</p><hr/>`;
    displayArray();
    searchComponent.style.display = "none";
    binarySearch(num,0,arrayItems.length-1);
}

const binarySearch = (key,low,high) => {
    let mid = Math.floor((low+high)/2);//must be int
    window.scrollTo(0, updatesComponent.scrollHeight);
    if(arrayItems.length == 0){
        updatesComponent.innerHTML += `<h3>Array is empty, add items!</h3>`;
        displayAdd();
        displayAdd();
        return;
    }
    if(low > high){
        updatesComponent.innerHTML += `<h3><b>${key}</b> was not found in the list</h3>`;
        searchComponent.style.display = "flex";
        return;
    }
    updatesComponent.innerHTML += `<p>Low index: <b>${low}</b>, high index:<b>${high}</b><br/>
                                mid index: (</b>${low}+${high})</b>/2 = <b>${mid}</b></br>
                                the middle element: <b>${arrayItems[mid]}</b></p>`
    document.getElementById(mid).style.backgroundColor = "green";
    setTimeout(() => {
        if(key == arrayItems[mid]){
            document.getElementById(mid).style.backgroundColor = "red";
            updatesComponent.innerHTML += `<h3>${key} was found in the list</h3>`;
            searchComponent.style.display = "grid"
            return;
        }
        else if(key > arrayItems[mid]){
            //focus on the right side
            updatesComponent.innerHTML += `<p><b>${key}</b> is greater than <b>${arrayItems[mid]}</b>, focusing on the right side of this number...</p>`;
            binarySearch(key,mid+1,high);
        }
        else if(key < arrayItems[mid]){
            //focus on the left side;
            updatesComponent.innerHTML += `<p><b>${key}</b> is less than <b>${arrayItems[mid]}</b>, focusing on the left side of this number...</p>`;
            binarySearch(key,low, mid-1);
        }
        document.getElementById(mid).style.backgroundColor = "#fff";

    },1000)
    
}
