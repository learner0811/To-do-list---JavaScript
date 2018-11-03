var task = document.getElementById("input");
var addTaskbtn = document.getElementById("addBtn");
var list = document.getElementById("list");
var removeList = document.getElementsByClassName("remove");
var checkbox = document.getElementsByClassName("cb");
var myStorage = window.localStorage;

var lisTask = [];



window.onload = function(){
	lisTask = JSON.parse(myStorage.getItem("todo"));
	if (lisTask == null)
		lisTask = [];
	else
		for (let i = 0; i < lisTask.length; i++){
			let newItem = document.createElement("li");		

			let newTask = document.createElement("span");
			let newText = document.createTextNode(lisTask[i]);
			newTask.appendChild(newText);		

			let newcheckBox = document.createElement("input");
			newcheckBox.setAttribute("type", "checkbox");		
			newcheckBox.setAttribute("class", "cb");
			newcheckBox.addEventListener("click", function(e){
			changeCb()}, false);

			let newRemove = document.createElement("span");
			newRemove.setAttribute("class", "remove");
			newRemove.addEventListener("click", removeFromList, false);

			newItem.appendChild(newcheckBox);
			newItem.appendChild(newTask);
			newItem.appendChild(newRemove);		
			
			list.appendChild(newItem);
		}
}

function addTask () {
	let taskText = task.value;
	if (taskText != ""){
		let newItem = document.createElement("li");		

		let newTask = document.createElement("span");
		let newText = document.createTextNode(taskText);
		newTask.appendChild(newText);		

		let newcheckBox = document.createElement("input");
		newcheckBox.setAttribute("type", "checkbox");		
		newcheckBox.setAttribute("class", "cb");
		newcheckBox.addEventListener("click", function(e){
		changeCb()}, false);

		let newRemove = document.createElement("span");
		newRemove.setAttribute("class", "remove");
		newRemove.addEventListener("click", removeFromList, false);

		newItem.appendChild(newcheckBox);
		newItem.appendChild(newTask);
		newItem.appendChild(newRemove);		
		
		list.appendChild(newItem);
						
		lisTask.push(taskText);
		myStorage.setItem("todo", JSON.stringify(lisTask));

		task.value = "";
	}		
}

function removeFromList () {		
	var grandParent = this.parentNode.parentNode;
	var parent = this.parentNode;	
	var text = parent.firstChild.nextSibling.textContent;
	
	for (let i = 0; i < lisTask.length; i++){
		if (lisTask[i] == text){
			lisTask.splice(i, 1);
			console.log('comehere');
			myStorage.setItem("todo", JSON.stringify(lisTask));
		}
	}		
	grandParent.removeChild(parent);
}

function changeCb (e) {
	if (e == null)
		e = window.event;

	target = e.target;
	if (target.checked == true)
		target.nextSibling.setAttribute("class", "checked");
	else
		target.nextSibling.setAttribute("class", "");
}

function submit (event) {
	if (event.keyCode == 13)
		addTask();
}

for (var i = 0; i < checkbox.length; i++)
	checkbox[i].addEventListener("click", function(e){
		changeCb()}, false);

for (var i = 0; i < removeList.length; i++)
	removeList[i].addEventListener("click", removeFromList, false);

addTaskbtn.addEventListener("click", addTask, false);
task.addEventListener("keyup", function(){
	submit(event)}, false);

