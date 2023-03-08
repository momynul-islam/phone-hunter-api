let currentPage;
let phonesList;
let numberOfPage;
const phonesContainer = document.getElementById("phones-container");
const pagination = document.getElementById("pagination");
const phoneName = document.getElementById("phone-name");
const searchBtn = document.getElementById("search-btn");

function loadData(searchField) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchField}`)
    .then((res) => res.json())
    .then((data) => {
      phonesList = data.data;
      displayData(data.data);
    });
}

function displayData(phones) {
  pagination.innerHTML = "";
  const numberOfPhones = phones.length;

  numberOfPage = Math.ceil(numberOfPhones / 10);
  currentPage = 1;

  if (numberOfPage > 1) {
    for (let i = 1; i <= numberOfPage; i++) {
      const li = document.createElement("li");
      li.className = "page-item";
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      pagination.appendChild(li);
    }
  }

  displayPhone(phones.slice(0, 10));
}

function displayPhone(phones) {
  phonesContainer.innerHTML = "";
  phones.forEach((phone) => {
    const card = document.createElement("div");
    card.className = "card mx-3 p-4 h-100";
    card.style.width = "18rem";
    card.innerHTML = `
            <img src="${phone.image}" class="card-img-top" alt="phone thumbnail">
            <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <a href="#">Details</a>
            </div>
        `;
    phonesContainer.appendChild(card);
  });
}

document.getElementById("pagination").addEventListener("click", (e) => {
  const clickedPage = parseInt(e.target.textContent);
  currentPage = clickedPage;
  const phones = phonesList.slice(clickedPage * 10 - 10, clickedPage * 10);
  displayPhone(phones);
});

searchBtn.addEventListener("click", () => {
  const phone = phoneName.value;
  loadData(phone);
});

loadData("iphone");
