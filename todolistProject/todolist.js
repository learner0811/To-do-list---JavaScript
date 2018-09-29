var task = document.getElementById("input");
var addTaskbtn = document.getElementById("addBtn");
var list = document.getElementById("list");
var removeList = document.getElementsByClassName("remove");
var checkbox = document.getElementsByClassName("cb");

function addTask () {
	var taskText = task.value;
	if (taskText != ""){
		var newItem = document.createElement("li");		

		var newTask = document.createElement("span");
		var newText = document.createTextNode(taskText);
		newTask.appendChild(newText);		

		var newcheckBox = document.createElement("input");
		newcheckBox.setAttribute("type", "checkbox");		
		newcheckBox.setAttribute("class", "cb");
		newcheckBox.addEventListener("click", function(e){
		changeCb()}, false);

		var newRemove = document.createElement("span");
		newRemove.setAttribute("class", "remove");
		newRemove.addEventListener("click", removeFromList, false);

		newItem.appendChild(newcheckBox);
		newItem.appendChild(newTask);
		newItem.appendChild(newRemove);		
		
		list.appendChild(newItem);

		task.value = "";
	}		
}

function removeFromList () {
	var grandParent = this.parentNode.parentNode;
	var parent = this.parentNode;	
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

