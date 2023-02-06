const urlBase = "https://contacts.ethanvoth.com/LAMPAPI";
const extension = "php";

let userId = -1;
let firstName = "";
let lastName = "";

function doLogin() {
  const login = document.getElementById("loginName").value;
  const password = document.getElementById("loginPassword").value;
  // const hash = md5(password);

  document.getElementById("loginResult").innerHTML = "";

  const request = { login: login, password: password };

  const url = urlBase + "/Login." + extension;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(request),
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      userId = data.userId;

      if (userId <= 0) {
        document.getElementById("loginResult").innerHTML =
          "User/Password combination incorrect";
        return;
      }

      firstName = data.firstName;
      lastName = data.lastName;

      saveData();
      console.log(data);

      window.location.href = "user.html";
    })
    .catch((error) => {
      console.log("error:", error);
      document.getElementById("loginResult").innerHTML = error.message;
    });
}

// TODO: Display the result of this operation in the html.
function searchContacts() {
  // Clear HTML content first.
  document.getElementById("placeData").innerHTML = "";

  const searchText = document.getElementById("searchText").value;

  // loadData();
  // if (userId <= 0) {
  // 	window.location.href = "login.html";
  // 	return;
  // }

  const request = { search: searchText, userId: userId };
  const url = urlBase + "/SearchContacts." + extension;

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(request),
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const contacts = data.results;
      console.log("Contact(s) has been retrieved");
      console.log(contacts);

      drawTable(contacts);
    })
    .catch((error) => {
      console.log("error:", error);
    });
}

function drawTable(contacts) {
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
        btn.classList.add("buttons-dark");

        if (j == 5) {
          btn.innerHTML = "edit";
          btn.onclick = () => {
            openEditPopup(contacts[i].contactId);
            autoFillEditPopup(contacts[i]);
          };
        } else {
          btn.innerHTML = "delete";
          btn.onclick = () => {
            openDeletePopup(contacts[i].contactId);
          };
        }

        td.appendChild(btn);
      }
      // TODO: Cleaner way to write this.
      else {
        if (j == 1) {
          td.innerHTML = contacts[i].firstName;
        } else if (j == 2) {
          td.innerHTML = contacts[i].lastName;
        } else if (j == 3) {
          td.innerHTML = contacts[i].phone;
        } else {
          td.innerHTML = contacts[i].email;
        }
      }
      row.appendChild(td);
    }

    place.appendChild(row);
  }

  return contacts;
}

function autoFillEditPopup(contact) {
  const firstNameToEdit = document.getElementById("editFirstName");
  const lastNameToEit = document.getElementById("editLastName");
  const phoneToEdit = document.getElementById("editPhoneNumber");
  const emailToEdit = document.getElementById("editEmail");

  firstNameToEdit.value = contact.firstName;
  lastNameToEit.value = contact.lastName;
  phoneToEdit.value = contact.phone;
  emailToEdit.value = contact.email;
}

function openEditPopup(contactId) {
  console.log(contactId);
  closeDeletePopup();
  closeAddPopup();

  // Add button passing element.

  let popup = document.getElementById("editPop");

  let btn = document.getElementById("submitEditPopup");
  btn.onclick = () => {
    updateContact(contactId);
    closeEditPopup();
  };

  popup.classList.add("openPop");
}

function openDeletePopup(contactId) {
  console.log(contactId);
  closeEditPopup();
  closeAddPopup();

  let popup = document.getElementById("deletePop");

  let btn = document.getElementById("submitDeletePopup");
  btn.onclick = () => {
    deleteContact(contactId);
    closeDeletePopup();
  };

  popup.classList.add("openPop");
}

function openAddPopup() {
  closeEditPopup();
  closeDeletePopup();

  let popup = document.getElementById("addPop");
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

function closeAddPopup() {
  let popup = document.getElementById("addPop");
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
    userId: userId,
  };
  sessionStorage.setItem("userData", JSON.stringify(userData));
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

function doRegisterUser() {
  // const registerEmail = document.getElementById("registerEmail").value;
  const registerLoginName = document.getElementById("registerLoginName").value;
  const registerPassword = document.getElementById("registerPassword").value;
  // const registerHashedPassword = md5(password);
  const registerFirstName = document.getElementById("registerFirstName").value;
  const registerLastName = document.getElementById("registerLastName").value;

  document.getElementById("registerResult").innerHTML = "";

  const request = {
    firstName: registerFirstName,
    lastName: registerLastName,
    login: registerLoginName,
    password: registerPassword,
  };

  const url = urlBase + "/Register." + extension;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("registerResult").innerHTML =
          "User has been added";
      }
    };
    xhr.send(JSON.stringify(request));
  } catch (err) {
    document.getElementById("registerResult").innerHTML = err.message;
  }
}

function addContact() {
  const addFirstName = document.getElementById("addFirstName").value;
  const addLastName = document.getElementById("addLastName").value;
  const addPhoneNumber = document.getElementById("addPhoneNumber").value;
  const addEmail = document.getElementById("addEmail").value;

  document.getElementById("personAddResult").innerHTML = "";

  const request = {
    firstName: addFirstName,
    lastName: addLastName,
    phone: addPhoneNumber,
    email: addEmail,
    userId: userId,
  };

  const url = urlBase + "/AddContact." + extension;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("personAddResult").innerHTML =
          "Contact has been added";
        searchContacts();
      }
    };
    xhr.send(JSON.stringify(request));
  } catch (err) {
    document.getElementById("personAddResult").innerHTML = err.message;
  }
}

// TODO: Add place to display result of delete
function deleteContact(contactId) {
  const request = {
    contactId: contactId,
  };

  const url = urlBase + "/DeleteContact." + extension;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Contact has been deleted");
        searchContacts();
      }
    };
    xhr.send(JSON.stringify(request));
  } catch (err) {
    console.log(err.message);
  }
}

// TODO: Add place to display result of update
function updateContact(contactId) {
  const editFirstName = document.getElementById("editFirstName").value;
  const editLastName = document.getElementById("editLastName").value;
  const editPhoneNumber = document.getElementById("editPhoneNumber").value;
  const editEmail = document.getElementById("editEmail").value;

  const request = {
    firstName: editFirstName,
    lastName: editLastName,
    phone: editPhoneNumber,
    email: editEmail,
    contactId: contactId,
  };

  const url = urlBase + "/UpdateContact." + extension;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        console.log("Contact has been updated");
        searchContacts();
      }
    };
    xhr.send(JSON.stringify(request));
  } catch (err) {
    console.log(err.message);
  }
}
