const loadPhones = async(searchText, dataLimit) =>{
    //searh bar er value aidike connect korlam
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json()
    displayPhones(data.data, dataLimit)
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContaienr = document.getElementById('phones-container');
    phonesContaienr.textContent = ``;
    //display 10phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10)
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    //display no phones found
    const noPhone = document.getElementById('no-foundMsg')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    /*tola thika warning shoranor ninja technique*/ 
    else{
        noPhone.classList.add('d-none')
    }

    //display all phones
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in</p>
        <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
        </div>
        `;
        phonesContaienr.appendChild(phoneDiv);
    })
    //stop spinner or loader
    toggleSpinner(false);
}

//handle search btn click
document.getElementById('btn-search').addEventListener('click', function(){
    //start spinner
    processSearch(10);
})
//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

/*spinnner bondho chalu korar ninja technique*/
const toggleSpinner = isLoading =>{
    const loderSection = document.getElementById('loader');
    if(isLoading){
        loderSection.classList.remove('d-none')
    }
    else{
        loderSection.classList.add('d-none')
    }
}

//not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails = async id => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => displayphoneDetails(data.data))

}

const displayphoneDetails = phone => {
    console.log(phone)
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML =`
    <p>${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
    <P>Chip Set:  ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'nola chipset'}</P>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'NO Bluetooth'}</p>
    `
}