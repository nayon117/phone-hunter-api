const loadPhone = async (searchText='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones);
    displayPhones(phones,isShowAll)
}
const displayPhones = (phones,isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = '';
  // display show all button if there is more than 12 card 
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  } else {
    showAllContainer.classList.add('hidden')
  }
  // display only 12 phones 
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
    phones.forEach(phone => {
        const phoneCard = document.createElement("div");
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl text-center mx-auto`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title mx-auto">${phone.phone_name}</h2>
          <p>${phone.slug}</p>
          <div class="card-actions">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-accent mx-auto">Show Details</button>
          </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
  // hide loading spinner 
  toggleLoadingSpinner(false)
}

const handleShowDetail = async (id) => {
  // load single phone data 
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json()
  const phone = data.data
  showPhoneDetail(phone)
}

const showPhoneDetail = (phone) => {
  const phoneName = document.getElementById("show-detail-phone-name")
  phoneName.innerText = phone.name
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img src="${phone.image}">
  <p><span>storage:</span>${phone?.mainFeatures?.storage}</p>
  <p><span>GPS:</span>${phone?.others?.GPS || 'NO GPS'}</p>
  <p><span>Brand:</span>${phone?.brand}</p>
  `
  // show the modal 
  show_details_modal.showModal()
}

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText,isShowAll)
}

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner")
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  } else {
    loadingSpinner.classList.add('hidden')
  }
}

const handleShowAll = () => {
  handleSearch(true)
}
loadPhone()
