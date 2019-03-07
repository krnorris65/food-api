// fetch("http://localhost:8088/foods")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         console.table(parsedFoods)
//     })

// fetch("http://localhost:8088/foods")
//     .then(function (foods) {
//         return foods.json()
//     })
//     .then(function(parsedFoods) {
//         console.table(parsedFoods)
//     })

// Create a DOM element in your index.html with a class of foodList.
// Create a function which returns a string template. The template is the HTML representation for a food item.
function foodFactory(foodData){
    return `
        <div class="foodDiv">
            <h1>${foodData.name}</h1>
            <p>${foodData.category}</p>
            <p>${foodData.ethnicity}</p>
        </div>
    `
}
// Create a function that inserts an HTML representation of a food into the DOM
function addFoodToDom(foodString){
    const foodDiv = document.querySelector(".foodList");
    foodDiv.innerHTML += foodString
}

fetch("http://localhost:8088/foods")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food)
            addFoodToDom(foodAsHTML)
        })
    })