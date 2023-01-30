const urlBase = 'https://contacts.ethanvoth.com/LAMPAPI';
const extension = 'php';

let userId = -1;
let firstName = "";
let lastName = "";

function doLogin() {
	const login = document.getElementById("loginName").value;
	const password = document.getElementById("loginPassword").value;
	// const hash = md5(password);
	
	document.getElementById("loginResult").innerHTML = "";

	const request = { login: login, password: password };
	
	const url = urlBase + '/Login.' + extension;

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(request),
	};

	fetch(url, requestOptions)
		.then(response => response.json())
		.then(data => {
			userId = data.userId;

			if( userId <= 0 )
			{		
				document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
				return;
			}

			firstName = data.firstName;
			lastName = data.lastName;

			saveData();
			console.log(data);

			window.location.href = "user.html";
		})
		.catch(error => {
			console.log('error:', error)
			document.getElementById("loginResult").innerHTML = error.message;
		});
}

// TODO: Display the result of this operation in the html.
function searchContacts() {

	// Clear HTML content first.
	document.getElementById("placeData").innerHTML = "";

	const searchText = document.getElementById("searchText").value;
	
	loadData();
	if (userId <= 0) {
		return;
	}

	const request = { search: searchText, userId: userId };
	const url = urlBase + '/SearchContacts.' + extension;

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(request),
	};

	fetch(url, requestOptions)
		.then(response => response.json())
		.then(data => {
			const contacts = data.results;
			console.log("Contact(s) has been retrieved");
			console.log(contacts);

			// Get the location of the table body.
			let place = document.getElementById("placeData");

			// Loop through array of contacts.
			for (let i = 0; i < contacts.length; i++) {
				// Create row.
				let row = document.createElement("tr");

				// Create td's to append to row.
				for (let j = 1; j <= 6; j++) {
					let td = document.createElement("td");

					// Create td with button inside.
					if (j == 5 || j == 6) {
						let btn = document.createElement("button");
						btn.classList.add("rowBtn");

						if (j == 5) {
							btn.innerHTML = "edit";
							btn.onclick = openEditPopup;
						}
						else {
							btn.innerHTML = "delete";
							btn.onclick = openDeletePopup;
						}
							
						td.appendChild(btn);
					}
					// TODO: Cleaner way to write this.
					else {
						if (j == 1) {
							td.innerHTML = contacts[i].firstName;
						}
						else if (j == 2) {
							td.innerHTML = contacts[i].lastName;
						}
						else if (j == 3) {
							td.innerHTML = contacts[i].phone;
						}
						else {
							td.innerHTML = contacts[i].email;
						}
					}
					row.appendChild(td);
				}
				
				place.appendChild(row);
			};

			return contacts;
		})
		.catch(error => {
			console.log('error:', error)
		});
}

function openEditPopup() {
	let popup = document.getElementById("editPop");

	popup.classList.add("openPop");
}

function openDeletePopup() {
	let popup = document.getElementById("deletePop");

	popup.classList.add("openPop");
}

function closeEditPopup() {
	let popup = document.getElementById("editPop");
	popup.classList.remove("openPop");
}

function closeDeletePopup() {
	let popup = document.getElementById("deletePop");
	popup.classList.remove("openPop");
}

function doLogout() {
	userId = -1;
	firstName = "";
	lastName = "";
	sessionStorage.removeItem("userData");
	window.location.href = "index.html";
}

function saveData() {
	let userData = {
		firstName: firstName,
		lastName: lastName,
		userId: userId
	}
	sessionStorage.setItem("userData", JSON.stringify(userData))
}

function loadData() {
	const data = JSON.parse(sessionStorage.getItem("userData"));
	
	if (data) {
		userId = data.userId;
		firstName = data.firstName;
		lastName = data.lastName;
	} else {
		console.log("No user found");
	}
}