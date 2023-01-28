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
			return contacts;
		})
		.catch(error => {
			console.log('error:', error)
		});
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
