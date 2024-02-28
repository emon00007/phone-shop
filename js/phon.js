const loadPhone = async (searchText) => {
    const rec = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await rec.json()
    const phones = data.data
    // console.log(phones)
    displayPhone(phones)
}
const displayPhone = phones => {
    const phneContainer = document.getElementById('phone-container')
    phneContainer.textContent = ''

    // display show button if there are more than 12 phone 
    const showButton = document.getElementById('show-all-continer')
    if(phones.length > 12){
        showButton.classList.remove('hidden')
    }else{
        showButton.classList.add('hidden')
    }

    // how many phone show on display
    phones = phones.slice(0, 12);
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
        <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
        </div>
       </div>`
        phneContainer.appendChild(phoneCard)

    })
    toggorLoadingSpinner(false)
}

// handel search button 
const handelSearch = () => {
    toggorLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    // console.log(searchText)
    loadPhone(searchText)

}

const toggorLoadingSpinner = (isLoading)=>{
   const loadingSpnner = document.getElementById('loaing-spnner')
   if (isLoading){
    loadingSpnner.classList.remove('hidden')
   }else{
    loadingSpnner.classList.add('hidden')
   }
}



// loadPhone()
