function foodFactory(foodData) {

    let foodString = `
        <div class="foodDiv">
            <h1>${foodData.name}</h1>
            <p>${foodData.ethnicity} ${foodData.category}</p>
            <p>${foodData.country}</p>
    `
    //build up unorder list of Ingredients
    foodString += `            
        <h4>Ingredients</h4>
        <ul>
    `
    foodData.ingredients.forEach(ing => {
        foodString += `<li>${ing.text}</li>`
    })
    foodString += "</ul>"
    foodString += `
        <p>Calories: ${foodData.calories}</p>
        <p>Fat: ${foodData.fat}</p>
        <p>Sugar: ${foodData.sugar}</p>

    `

    foodString += "</div>"
    return foodString
}
// Create a function that inserts an HTML representation of a food into the DOM
function addFoodToDom(foodString) {
    const extFoodDiv = document.querySelector(".extFoodList");

    extFoodDiv.innerHTML += foodString
}

fetch("http://localhost:8088/foods")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {
            // console.log(food) // Should have a `barcode` property

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    //Ingredients: array of objects, property = text
                    food.ingredients = productInfo.product.ingredients;
                    // Country of origin countries
                    food.country = productInfo.product.countries;

                    // Calories per serving nutriments.energy_value
                    food.calories = productInfo.product.nutriments.energy_value;

                    // Fat per serving nutriments.fat_value
                    food.fat = productInfo.product.nutriments.fat_value;

                    // Sugar per serving nutriments.sugars_value
                    food.sugar = productInfo.product.nutriments.sugars_value;

                    console.log(food)
                    // Produce HTML representation
                    const foodAsHTML = foodFactory(food)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })
        })
    })