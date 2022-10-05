// const likedList = ["52975","52962"];
if (localStorage.likedList) {
  const likedList = JSON.parse(localStorage.likedList);

  const mainDiv = document.getElementById("liked-disp");

  function showMealDetailsDiv(data) {
    console.log(data);
    data = data.meals[0];
    const img = data.strMealThumb;
    const text = data.strMeal;
    const newD = document.createElement("div");
    newD.classList.add("d-inline-flex");
    newD.innerHTML = `
      <div class="card d-inline-block m-3" style="width: 18rem;">
      <img src=${img} class="card-img-top" alt="...">
      <div class="card-body">
          <p class="card-text text-center fw-light">${text}</p>
      </div>
  </div>
      `;
    mainDiv.appendChild(newD);
  }

  for (var i of likedList) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Number(
      i
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showMealDetailsDiv(data));
  }
}
