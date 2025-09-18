const form = document.querySelector("#search-form");
const inp = document.querySelector("#search-box");
const searchBtn = document.querySelector(".search-btn");
const ic=document.querySelector(".image-container")


let page = 1;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
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



async function getImages(keyword) {
    
    try {
        let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=`;
        
        const response = await fetch(url);
        const result = await response.json();

        const data = result.results;
        showImages(data);
        console.log(data);
        
        
    } catch (error) {
        console.log(error);
        
    }
}

function showImages(data) {
    data.map((item) => {
        const image = document.createElement("img");
        image.src = item.urls.small;

        const link = document.createElement("a");
        link.href = item.urls.full;
        link.target = "_blank";

        link.appendChild(image);

        ic.appendChild(link);
    })
}