//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//================ Display Searched Meal - OK ================
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

var likedList = [];

const createMealInfoDiv = (meal, mealInput) => {
  const mealPhoto = meal.strMealThumb;
  const mealName = meal.strMeal;
  const mealInfo = `
    <a href="#meal-details-section" style="text-decoration: none; color: black;">
        <div onclick="getMealDetails(${meal.idMeal})" class="card border-0 shadow cursor" style="width: 18rem; border-radius: 10px">
            <img src="${mealPhoto}" class="card-img-top" style="width: 18rem; border-radius: 10px 10px 0 0" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center fw-light">${mealName}</h5>
            </div>
        </div>
    </a>
    `;
  const mealInfoSection = document.getElementById("meal-info-section");
  const mealInfoDiv = document.createElement("div");
  mealInfoDiv.className =
    "col-xm-1 col-sm-2 col-md-3 p-3 d-inline-flex justify-content-center m-sm-3";
  mealInfoDiv.innerHTML = mealInfo;
  mealInfoSection.appendChild(mealInfoDiv);
};

const showMealInfoDiv = (data, mealInput) => {
  const meal = data.meals;

  // Check If Searched Meal Is Found Or Not
  if (meal) {
    meal.forEach((element) => {
      createMealInfoDiv(element, mealInput);
    });
  } else {
    const noMealFound = document.getElementById("no-meal-found");
    noMealFound.innerText = `No meal found for ${mealInput}!`;
  }
};

const searchMeal = () => {
  const mealInput = document.getElementById("meal-input").value;

  // Check If User Searched For Anything
  if (mealInput) {
    // Clear the No Meal Found Tag For Every Single New Search
    const noMealFound = document.getElementById("no-meal-found");
    noMealFound.innerText = ``;

    // Clear the Meal Info Section For Every Single New Search
    const mealInfoSection = document.getElementById("meal-info-section");
    mealInfoSection.innerHTML = ``;

    // Clear the Meal Details Section For Every Single New Search
    const mealDetailsSection = document.getElementById("meal-details-section");
    mealDetailsSection.innerHTML = ``;

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s= ${mealInput}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        showMealInfoDiv(data, mealInput);
      });
  } else {
    const noMealFound = document.getElementById("no-meal-found");
    noMealFound.innerText = `You haven't entered anything`;
  }
};

document.getElementById("meal-submit").addEventListener("click", searchMeal);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//================ Display Meal Details - OK ================
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const showMealDetailsDiv = (data) => {
  const meal = data.meals[0];
  const mealPhoto = meal.strMealThumb;
  const mealName = meal.strMeal;

  // Set Meal Details Div Structure
  const mealDetailsSection = document.getElementById("meal-details-section");
  mealDetailsSection.innerHTML = `
    <div id="meal-details" class="card px-0 pb-1 border-0 shadow col-xm-12 col-sm-12 col-md-12" style="border-radius: 10px;">
        <div id="liked" class="me-3 mt-3 p-2 text-bg-light" style="height: 50px;width: 50px; position: absolute; right: 0%; border-radius: 50%">
        <svg class="text-danger" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>      
        </div>
        <img src="${mealPhoto}" class="card-img-top" style="border-radius: 10px 10px 0 0;" alt=" ...">
        <div class="card-body">
            <h2 class="card-title text-center my-3">${mealName}</h2>
            <hr>
            <h5 class="card-title mt-4">Meal Ingredients</h5>
            <div id="meal-ingredients"></div>
            <h5 class="card-title mt-4">Recipe</h5>
            <div id="meal-instruction"></div>
        </div>
    </div>
`;
  const mealIngredients = document.getElementById("meal-ingredients");

  // Set Contents of Each Paragraph Inside Meal Details Div Structure
  for (let i = 1; meal[`strIngredient${i}`]; i++) {
    const ingredients = `
    ✔ ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
    `;
    const mealDetailsP = document.createElement("p");
    mealDetailsP.className = "card-text";
    mealDetailsP.innerText = ingredients;
    mealIngredients.appendChild(mealDetailsP);
  }
  // Set contents for Recipe.
  const mealInstruction = document.getElementById("meal-instruction");
  const instruction = meal["strInstructions"];
  const mealDetP = document.createElement("p");
  mealDetP.className = "card-text";
  mealDetP.innerHTML = instruction;
  mealInstruction.appendChild(mealDetP);

  const likedBtn = document.getElementById("liked");
  likedBtn.addEventListener("click", () => {
    if(likedList.length == 0){
      if (localStorage.likedList){
        likedList = JSON.parse(localStorage.likedList);
      }
    }
    likedList.push(meal["idMeal"]);
    localStorage.likedList = JSON.stringify(likedList);
    console.log("added to liked list");
  });
};

const getMealDetails = (mealID) => {
  // Clear the Meal Details Section For Every Single New Search
  const mealDetailsSection = document.getElementById("meal-details-section");
  mealDetailsSection.innerHTML = ``;

  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showMealDetailsDiv(data));
};
