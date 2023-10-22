const apiUrl = "https://api.taboola.com/1.0/json/taboola-templates/recommendations.get?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&count=4&source.type=video&source.id=214321562187&source.url= http://www.site.com/videos/214321562187.html",
    fallbackImageSrc = 'https://cdn.taboola.com/static/impl/png/fallbackImage.png',
    floatButton = document.getElementById("floatButton"),
    widgetElement = document.getElementById("widgetHeader");

if (floatButton) {
    floatButton.addEventListener("click", () => {
        if (widgetElement) {
            widgetElement.scrollIntoView({ behavior: "smooth" });
            floatButton.style.opacity = 0;
        }
    });
}

function toggleButtonVisibility() {
    if (window.scrollY < 600) {
        floatButton.style.opacity = 1;
    } else {
        floatButton.style.opacity = 0;
    }
}
window.addEventListener("scroll", toggleButtonVisibility);

function checkIfImageNotFound(imgElement) {
    imgElement.addEventListener('error', () => {
        console.log(imgElement.src);
        imgElement.src = fallbackImageSrc;
    });
}

function createWidgetElements(item) {
    const $list = document.getElementById('list');
    const liElement = document.createElement('li');
    const aElement = document.createElement('a');
    aElement.href = item.url;
    const imgElement = document.createElement('img');
    imgElement.src = item.thumbnail[0].url;
    checkIfImageNotFound(imgElement);
    const h2Element = document.createElement('h2');
    h2Element.innerText = item.name;
    const pElement = document.createElement('p');
    pElement.innerText = item.branding;



    switch (item.origin) {
        case 'sponsored':
            aElement.target = "_blank";
            aElement.appendChild(imgElement);
            aElement.appendChild(pElement);
            aElement.appendChild(h2Element);
            liElement.appendChild(aElement);
            break;
        case 'organic':
            aElement.appendChild(imgElement);
            aElement.appendChild(h2Element);
            liElement.appendChild(aElement);
            break;
        default:
            aElement.appendChild(imgElement);
            aElement.appendChild(h2Element);
            liElement.appendChild(aElement);
    }
    $list.appendChild(liElement);
}

async function getArticlesFromApi(url) {
    try {
        const apiResponse = await fetch(url);

        if (!apiResponse.ok) {
            throw new Error(`HTTP error! Status: ${apiResponse.status}`);
        }

        const apiResponseJson = await apiResponse.json();
        const articlesList = apiResponseJson.list;

        articlesList.forEach(item => {
            createWidgetElements(item);
        });

        return apiResponseJson;
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

getArticlesFromApi(apiUrl);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { getArticlesFromApi, createWidgetElements, checkIfImageNotFound };
}
