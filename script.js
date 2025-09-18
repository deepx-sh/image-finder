const form = document.querySelector("#search-form");
const inp = document.querySelector("#search-box");
const searchBtn = document.querySelector(".search-btn");
const ic=document.querySelector(".image-container")

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

searchBtn.addEventListener("click", () => {
    let keyword = inp.value;

    if (keyword.trim() === '' || keyword.trim().length === 0) {
        alert("Please enter a search keyword.");
        inp.value = '';
    }
    else {
        getImages(keyword);
    }
});

let page = 1;

async function getImages(keyword) {
    
    try {
        let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=YOUR_API_KEY`;
        
        const response = await fetch(url);
        const result = await response.json();

        const data = result.results;
        console.log(data);
        
        
    } catch (error) {
        console.log(error);
        
    }
}