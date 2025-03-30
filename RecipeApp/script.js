document.addEventListener("DOMContentLoaded", () => {
    loadRecipes();
    document.getElementById("recipe-form").addEventListener("submit", addRecipe);
    document.getElementById("filter-category").addEventListener("change", filterRecipes);
    document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
});

function showSection(sectionId) {
    document.querySelectorAll(".content").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

function addRecipe(event) {
    event.preventDefault();
    
    const name = document.getElementById("recipe-name").value;
    const ingredients = document.getElementById("ingredients").value;
    const category = document.getElementById("category").value;
    const steps = document.getElementById("steps").value;

    if (!name || !ingredients || !steps) {
        alert("Please fill in all required fields.");
        return;
    }

    const recipe = { name, ingredients, category, steps };
    
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));

    document.getElementById("recipe-form").reset();
    loadRecipes();
}

function loadRecipes() {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";
    
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <h4>Ingredients:</h4>
            <p>${recipe.ingredients.replace(/\n/g, "<br>")}</p>
            <h4>Steps:</h4>
            <p>${recipe.steps.replace(/\n/g, "<br>")}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;

        recipeList.appendChild(recipeCard);
    });
}

function filterRecipes() {
    const selectedCategory = document.getElementById("filter-category").value;
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    const filteredRecipes = selectedCategory === "All" 
        ? recipes 
        : recipes.filter(recipe => recipe.category === selectedCategory);

    document.getElementById("recipe-list").innerHTML = "";

    filteredRecipes.forEach((recipe, index) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <h4>Ingredients:</h4>
            <p>${recipe.ingredients.replace(/\n/g, "<br>")}</p>
            <h4>Steps:</h4>
            <p>${recipe.steps.replace(/\n/g, "<br>")}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;

        document.getElementById("recipe-list").appendChild(recipeCard);
    });
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    loadRecipes();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
