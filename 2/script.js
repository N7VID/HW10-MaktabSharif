const BASE_URL = "http://localhost:3000";

const table = document.querySelector("table");
const tableBody = document.querySelector("tbody");

const nameInput = document.getElementById("name");
const jobInput = document.getElementById("job");
const emailInput = document.getElementById("email");
const form = document.querySelector("form");
const submitBtn = document.getElementById("submit");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const deleteButton = document.querySelectorAll(".del-btn");
const cancelButton = document.getElementById("cancel");

const ascOrderBtn = document.getElementById("ASC");
const descOrderBtn = document.getElementById("DESC");
const searchInput = document.getElementById("search");

let appStatus = {
  editingUserId: null,
  isEditMode: false,
};

let page = 1;
let totalPages;
const limit = 10;
let totalCount;
let currentSort = "";
let searchQuery = "";

function getUserList(page = 1, limit = 10, currentSort = "") {
  try {
    fetch(
      `${BASE_URL}/Users?_page=${page}&_limit=${limit}&${currentSort}&q=${searchQuery}`
    )
      .then((response) => {
        if (!response.ok) {
          console.log(error);
        }
        totalCount = response.headers.get("X-Total-Count");
        totalPages = Math.ceil(totalCount / limit);
        return response.json();
      })
      .then((data) => {
        renderUserList(data);
        updateButtons();
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
}

function updateButtons() {
  prevButton.disabled = page <= 1;
  nextButton.disabled = page >= totalPages;
}

function postNewUser(newName, newJob, newEmail) {
  try {
    let created = {
      avatar: "../image/user.bmp",
      name: newName,
      job: newJob,
      email: newEmail,
    };
    fetch(`${BASE_URL}/Users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(created),
    })
      .then((response) => {
        getUserList(page, limit, currentSort);
        notification("Created!");
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.error(error);
  }
}

function deleteUser(id) {
  try {
    fetch(`${BASE_URL}/Users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        getUserList(page, limit, currentSort);
        notification("Deleted!");
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.error(error);
  }
}

function putData(id, updatedName, updatedJob, updatedEmail) {
  let updated = {
    name: updatedName,
    email: updatedEmail,
    job: updatedJob,
  };
  try {
    fetch(`${BASE_URL}/Users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update user: ${response.statusText}`);
        }
        getUserList(page, limit, currentSort);
        notification("Updated!");
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.error(error);
  }
}

//------------------

function renderUserList(data) {
  tableBody.innerText = "";
  data.forEach((user) => {
    const tRow = document.createElement("tr");

    const tDataId = document.createElement("td");
    tDataId.innerText = user.id;
    const tDataUser = document.createElement("td");
    const tDataImgDiv = document.createElement("div");
    tDataImgDiv.innerText = user.name;
    tDataImgDiv.className = "img-td";
    const imgUser = document.createElement("img");
    imgUser.src = user.avatar;
    imgUser.alt = "avatar";
    const tDataJob = document.createElement("td");
    tDataJob.innerText = user.job;
    const tDataEmail = document.createElement("td");
    tDataEmail.innerText = user.email;
    const tDataBtn = document.createElement("td");
    const tDataBtnDiv = document.createElement("div");
    tDataBtnDiv.classList.add("btn-td");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "del-btn";
    deleteBtn.addEventListener("click", () => deleteUserBtnHandler(user.id));
    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Update";
    updateBtn.className = "upd-btn";
    updateBtn.addEventListener("click", () => {
      cancelButton.style.display = "block";
      updateUserBtnHandler(user.id, user.name, user.email, user.job);
    });

    tDataImgDiv.appendChild(imgUser);
    tDataUser.appendChild(tDataImgDiv);
    tDataBtnDiv.appendChild(updateBtn);
    tDataBtnDiv.appendChild(deleteBtn);
    tDataBtn.appendChild(tDataBtnDiv);

    tRow.appendChild(tDataId);
    tRow.appendChild(tDataUser);
    tRow.appendChild(tDataJob);
    tRow.appendChild(tDataEmail);
    tRow.appendChild(tDataBtn);

    tableBody.appendChild(tRow);
  });
}

function formSubmitHandler() {
  let userName = nameInput.value;
  let userJob = jobInput.value;
  let userEmail = emailInput.value;

  if (appStatus.isEditMode) {
    if (userName && userJob && userEmail) {
      putData(appStatus.editingUserId, userName, userJob, userEmail);
      submitBtn.innerText = "Add User";
      appStatus.isEditMode = false;
      appStatus.userId = null;
    }
  } else {
    if (userName && userJob && userEmail) {
      postNewUser(userName, userJob, userEmail);
    }
  }
  clearForm();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSubmitHandler();
});

function deleteUserBtnHandler(userId) {
  deleteUser(userId);
}

function updateUserBtnHandler(id, name, email, job) {
  appStatus.editingUserId = id;
  appStatus.isEditMode = true;
  toggleButtons(true);
  nameInput.value = name;
  jobInput.value = job;
  emailInput.value = email;
  submitBtn.innerText = "Update";
}
function toggleButtons(disable) {
  document.querySelectorAll(".del-btn, .upd-btn").forEach((btn) => {
    btn.disabled = disable;
  });
}

function nextPageButtonHandler() {
  if (page < totalPages) {
    page++;
    getUserList(page, limit, currentSort);
  }
}

function prevPageButtonHandler() {
  if (page > 1) {
    page--;
    getUserList(page, limit, currentSort);
  }
}

function cancelButtonHandler() {
  submitBtn.innerText = "Add User";
  appStatus.isEditMode = false;
  appStatus.userId = null;
  clearForm();
  toggleButtons(false);
  cancelButton.style.display = "none";
}

function clearForm() {
  nameInput.value = "";
  jobInput.value = "";
  emailInput.value = "";
}

function notification(message) {
  Toastify({
    text: message,
    className: "info",
    duration: 4000,
    position: "right",
    gravity: "up",
    style: {
      color: "white",
      background: "#6fcf97",
    },
  }).showToast();
}

function sortUser(order) {
  currentSort = `_sort=id`;
  if (order === "desc") {
    currentSort += "&_order=desc";
  }
  getUserList(page, limit, currentSort);
}

function handleSearch(event) {
  searchQuery = event.target.value.trim();
  if (searchQuery) {
    getUserList(page, limit, currentSort, searchQuery);
  }
}

searchInput.addEventListener("input", _.debounce(handleSearch, 500));

getUserList();
