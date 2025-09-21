const form = document.querySelector("#search-form");
const inp = document.querySelector("#search-box");
const searchBtn = document.querySelector(".search-btn");
const ic=document.querySelector(".image-container")
const showMoreBtn=document.querySelector("#show-more-btn")
const errorMessage = document.querySelector("#error-message")
const loading = document.querySelector("#loading");
let page = 1;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch();
});

searchBtn.addEventListener("click", (e) => {
    e.preventDefault()
    handleSearch()
});


function handleSearch() {
     let keyword = inp.value.trim();

    if (!keyword) {
        showError("Please enter a search term to discover amazing images");
        return;
    }

    page = 1;
    ic.innerHTML = "";
    hideError();
    getImages(keyword)
}

async function getImages(keyword) {
    showLoading();
    try {
        let url = `/api/images/keyword=${keyword}&page=${page}`;
        
        const response = await fetch(url);
       
        const result = await response.json();

         if (!result.ok) {
            throw new Error(result.error || "Failed to fetch data. Please try again later.");
        }
        const data = result.results;
        if (data.length ===0 && page === 1) {
            showError("No image found. Try different search term");
            hideLoading();
            return;
        }
        showImages(data);

        
        
    } catch (error) {
        showError("Oops! Something went wrong. Please try again");
    }
    hideLoading();
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

    showMoreBtn.style.display="block"
}

showMoreBtn.addEventListener("click", () => {
    page++;
    getImages(inp.value);
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
}

function hideError() {
    errorMessage.style.display="none"
}

function showLoading() {
    loading.style.display = "block";
}

function hideLoading() {
    loading.style.display="none"
}