const loadPhone = async (searchText, isShowAll) => {
    const rec = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await rec.json()
    const phones = data.data
    // console.log(phones)
    displayPhone(phones, isShowAll)
}
const displayPhone = (phones, isShowAll) => {
    const phneContainer = document.getElementById('phone-container')
    phneContainer.textContent = ''

    // display show button if there are more than 12 phone 
    const showButton = document.getElementById('show-all-continer')
    if (phones.length > 12 && !isShowAll) {
        showButton.classList.remove('hidden')
    } else {
        showButton.classList.add('hidden')
    }
    console.log('isShowAll', isShowAll)
    // how many phone show on display if not show all
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    // how many phone show on display

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`
        phoneCard.innerHTML = `<figure><img src=${phone.image}
     alt="Shoes" /></figure>
       <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
            <button  onclick="showHandelmDetails('${phone.slug}')" class="btn btn-accent">SHOW DETAILS</button>
        </div>
       </div>`
        phneContainer.appendChild(phoneCard)

    })
    toggorLoadingSpinner(false)
}

// show single mobile  details 
const showHandelmDetails = async (id) => {
    console.log('click soccess', id)
    const rec = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await rec.json()
    const phone = data.data
    phoneDatails(phone)
}


const phoneDatails = (phone) => {
    show_detail_modal.showModal()
    console.log(phone)
    const phoneName = document.getElementById('show-datails-phone-name')
    phoneName.innerText = phone.name
    const phoneDetailsContainer = document.getElementById('phone-details-container')
    phoneDetailsContainer.innerHTML=`
    <img class="text-center" src="${phone.image}" alt="">
    <p>${phone.mainFeatures.chipSet} </p>
    <p>${phone.mainFeatures.displaySize}</p>
    <p>${phone.mainFeatures.memory}</p>
    <p>${phone.releaseDate
    }</p>
    `

}
// handel search button 
const handelSearch = (isShowAll) => {
    toggorLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    // console.log(searchText)
    loadPhone(searchText, isShowAll)

}

const toggorLoadingSpinner = (isLoading) => {
    const loadingSpnner = document.getElementById('loaing-spnner')
    if (isLoading) {
        loadingSpnner.classList.remove('hidden')
    } else {
        loadingSpnner.classList.add('hidden')
    }
}

const handelShowAll = () => {
    handelSearch(true)
}



loadPhone()
