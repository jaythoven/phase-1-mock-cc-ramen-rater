//dom elements
const ramenImgMenu = document.querySelector("#ramen-menu")
const imgDetail = document.querySelector(".detail-image") 
const imgName = document.querySelector(".name") 
const imgRestaurant = document.querySelector(".restaurant") 
const imgRating = document.querySelector("#rating")
const imgComment = document.querySelector("#comment")
const ramenRatingForm = document.querySelector("#ramen-rating")
const newRamenForm = document.querySelector("#new-ramen")

//event handlers
newRamenForm.addEventListener("submit", event => {
    event.preventDefault()
    console.log('submit')

})

ramenRatingForm.addEventListener("submit", event =>{
    event.preventDefault()
    
    const ramenId = ramenRatingForm.dataset.id
    const updateObj = {
         rating: parseInt(imgRating.value), 
         comment: imgComment.value
    }
    
    updateRamen(ramenId, updateObj)
})

//render
function renderAllRamen(ramenArray) {
    ramenArray.forEach((ramenObj) => {
        renderRamenImg(ramenObj)
    })
}

function renderRamenImg(ramenObj) {
    const img = document.createElement("img")
    img.src = ramenObj.image
    img.alt = ramenObj.name

    ramenImgMenu.append(img)

    img.addEventListener("click", event => {
        getRamenById(ramenObj.id)
    })
}
function renderDetail(ramenObj) {
 ramenRatingForm.dataset.id = ramenObj.id
 imgDetail.src = ramenObj.image
 imgDetail.alt = ramenObj.name
 imgName.textContent = ramenObj.name
 imgRestaurant.textContent = ramenObj.restaurant 
 imgRating.value = ramenObj.rating 
 imgComment.value = ramenObj.comment
}

//fetch
function getRamenById(id) {
    fetch(`http://localhost:3000/ramens/${id}`)
    .then(r => r.json())
    .then(ramenObj => {
        renderDetail(ramenObj)
    })
}

function getRamens() {
    fetch("http://localhost:3000/ramens")
    .then(r => r.json())
    .then(ramenArray => {
        renderAllRamen(ramenArray)
    })
}

function updateRamen(id, updateObj) {

    fetch(`http://localhost:3000/ramens/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateObj),
      })
      .then(response => response.json())
      .then(data => {
        console.log("success:", data)
      })
    }

getRamens()
