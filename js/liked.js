// const likedList = ["52975","52962"];
if (localStorage.likedList) {
  const likedList = JSON.parse(localStorage.likedList);

  const mainDiv = document.getElementById("liked-disp");
  // mainDiv.innerHTML = ``;

  function showMealDetailsDiv(data) {
    console.log(data);
    data = data.meals[0];
    const img = data.strMealThumb;
    const text = data.strMeal;
    const newD = document.createElement("div");
    newD.classList.add("d-inline-flex");
    newD.innerHTML = `
      <div class="card d-inline-block m-3" style="width: 18rem;">
      <div>
      <img src=${img} class="card-img-top" alt="...">
      <svg id="remove-${data.idMeal}" class="me-2 mt-2 text-light fw-bold" style="right: 0%; height: 30px;position: absolute" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </div>
      <div class="card-body d-flex">
          <p class="card-text text-center fw-light mt-1">${text}</p>
        </svg>
      </div>
  </div>
      `;
    mainDiv.appendChild(newD);
    const removeBtn = document.getElementById(`remove-${data.idMeal}`);
    removeBtn.onclick = () => {
      for (let i in likedList) {
        if (likedList[i] === data.idMeal) {
          likedList.splice(i, 1);
          localStorage.likedList = JSON.stringify(likedList);
          // render(likedList)
          location.reload();
        }
      }
    };
  }

  function render(likedList) {
    for (var i of likedList) {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${Number(
        i
      )}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => showMealDetailsDiv(data));
    }
  }
  render(likedList);
}
// window.onload = () => {
//   const removeBtn = document.getElementById("remove");
//   removeBtn.onclick = () => {
//     console.log(data.strMeal);
//   };
// };
