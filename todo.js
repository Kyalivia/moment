const toDoForm=document.querySelector(".js-toDoForm");
const toDoInput=toDoForm.querySelector("input");
const toDoPending=document.querySelector(".js-toDoPending");
const toDoFinished=document.querySelector(".js-toDoFinished");

const PENDINS_LS="PENDING";
const FINISHED_LS="FINISHED";

let pendings = []; //toDos
let finished = [];


function savePendings() {
	localStorage.setItem(PENDINS_LS, JSON.stringify(pendings));
}
function saveFinished() {
	localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}

function deletePending(event) {
	const btn = event.target;
	const li = btn.parentNode;
	toDoPending.removeChild(li);

	const cleanPendings=pendings.filter(function(pending) {
		return  pending.id !== parseInt(li.id, 10);
	});
	pendings = cleanPendings;
	savePendings();
}

function deleteFinished(event) {
	const btn = event.target;
	const li = btn.parentNode;
	toDoFinished.removeChild(li);

	const cleanFinished=finished.filter(function(finish) {
		return finish.id !== parseInt(li.id, 10);
	});
	finished = cleanFinished;
	saveFinished();
}

function donePending(event) {
	const btn = event.target;
	const li = btn.parentNode;
	const value = li.firstChild.innerText;
	paintFinished(value);
	deletePending(event);
}
// Finished-goto Pending
function notFinished(event) {
	const btn = event.target;
	const li = btn.parentNode;
	const value = li.firstChild.innerText;
	paintPending(value);
	deleteFinished(event);
}


function paintPending(text) {
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	const finBtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = pendings.length + 1;

	delBtn.innerText = "❌";
	delBtn.addEventListener("click", deletePending);
	finBtn.innerText = "✅";
	finBtn.addEventListener("click", donePending);

	span.innerText = text;
	li.appendChild(span);
	li.appendChild(delBtn);
	li.appendChild(finBtn);
	li.id = newId;
	toDoPending.appendChild(li);

	const pendingObj = {
		id: newId,
		text: text
	};
	pendings.push(pendingObj);
	savePendings();
}

function paintFinished(text) {
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	const penBtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = finished.length + 1;

	delBtn.innerText = "❌";
	delBtn.addEventListener("click", deleteFinished);
	penBtn.innerText = "⏪";
	penBtn.addEventListener("click", notFinished);

	span.innerText = text;
	li.appendChild(span);
	li.appendChild(delBtn);
	li.appendChild(penBtn);
	li.id = newId;
	toDoFinished.appendChild(li);

	const finishedObj = {
		id: newId,
		text: text
	};
	finished.push(finishedObj);
	saveFinished();
}

// local Storage에서 데이터 가져오기
// Pending
function loadPendings() {
	const loadedPendings = localStorage.getItem(PENDINS_LS);
	if (loadedPendings !== null) {
		const parsedPendings = JSON.parse(loadedPendings);
		parsedPendings.forEach(function(pending) {
			paintPending(pending.text);
		});
	}
}
// Finished
function loadFinished() {
	const loadedFinished = localStorage.getItem(FINISHED_LS);
	if (loadedFinished !== null) {
		const parsedFinished = JSON.parse(loadedFinished);
		parsedFinished.forEach(function(finish) {
			paintFinished(finish.text);
		});
	}
}

// paintToDo를 이용한 input값 출력 후 값을 비우기
function handleSubmit(event) {
	event.preventDefault();

	const currentValue = toDoInput.value;
	paintPending(currentValue);
	toDoInput.value="";
}

function init() {
	loadPendings();
	loadFinished();
	toDoForm.addEventListener("submit", handleSubmit);
}
init ();
