const form = document.querySelector("#search-form");
const inp = document.querySelector("#search-box");
const searchBtn = document.querySelector(".search-btn");
const ic=document.querySelector(".image-container")

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

searchBtn.addEventListener("click", () => {
    let keyword = inp.ariaValueMax;

    if (keyword.trim() === '' || keyword.trim().length === 0) {
        alert("Please enter a search keyword.");
    }
    else {
        getImages(keyword);
    }
})