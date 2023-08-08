const mealboxDetails = document.getElementById('meal');

// Function to fetch and display meals
function getMeals(searchTerm) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if (data.meals) {
            data.meals.forEach(meal => {
                html += `
                <div class="col-md-4 mt-5">
                    <div class="card" data-id="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <a href="#" class="btn btn-primary recipe-btn" data-mealid="${meal.idMeal}">Recipe</a>
                        </div>
                    </div>
                </div>`;
            });

            mealboxDetails.innerHTML = `
                <div class="row">
                    ${html}
                </div>`;

            const recipeButtons = document.querySelectorAll('.recipe-btn');
            recipeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const mealId = button.getAttribute('data-mealid');
                    showRecipeDetails(mealId);
                });
            });
        } else {
            html = "Sorry, we didn't find any meal!";
            mealboxDetails.innerHTML = html;
        }
    });
}

// Function to display recipe details in the modal
function showRecipeDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        if (data.meals && data.meals.length > 0) {
            const meal = data.meals[0];
            const modalTitle = document.querySelector('#recipeModalLabel');
            const modalBody = document.querySelector('#recipeModal .modal-body');
            
            modalTitle.textContent = meal.strMeal;
            modalBody.innerHTML = `
                
                <p>${meal.strInstructions}</p>`;
            
            const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
            recipeModal.show();
        }
    });
}

// Event listener for the search button
document.getElementById('search-btn').addEventListener('click', function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search-input').value.trim();
    getMeals(searchTerm);
});

// Call getMeals with a default search term when the page loads
window.addEventListener('load', function() {
    const defaultSearchTerm = "chicken"; // Change this to your desired default search term
    getMeals(defaultSearchTerm);
});
