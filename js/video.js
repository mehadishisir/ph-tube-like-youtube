// 1 fetch,load and show categories in the html

// add time in the thumbnail

function getTimestring(time) {
  const hour = parseInt(time / 3600);
  let minute = parseInt(time % 3600);
  const secound = parseInt(minute % 60);
  return `${hour} hour,${minute} minute ${secound} secound ago`;
}

// create loadcategories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
// create videos categories
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
// create display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = "";

  if (videos.length === 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="flex flex-col justify-center items-center gap-4">
      <img src="assets/icon.png" />
      <h2 class="text-2xl font-bold text-center">No videos found</h2>
    </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    const videoBox = document.createElement("div");
    videoBox.classList = "card ";
    videoBox.innerHTML = `
    <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover" src="${
      video.thumbnail
    }" alt="Shoes" />
    ${
      video.others.posted_date?.length === 0
        ? ""
        : `   <span class="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded">${getTimestring(
            video.others.posted_date
          )}</span>`
    }
 
    </figure>
    <div class=" px-0 py-2 my-5 flex gap-3">
        
            
                <img class="w-10 h-10 rounded-full" src="${
                  video.authors[0].profile_picture
                }" />
            
            <div>
              <h2 class="card-title font-bold text-sm">${video.title}</h2>
              <div class="flex items-center gap-2">
                <p class="text-gray-400">${video.authors[0].profile_name}</p>
                ${
                  video.authors[0].verified === true
                    ? ` <img 
  src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" 
  alt="verified badge" 
  class="inline-block"
  style="width:20px; height:20px;"
/>
`
                    : ``
                }
                 



              </div>

            </div>

      
    </div>
    `;
    videosContainer.appendChild(videoBox);
  });
};

// show categories
const showCategories = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // remove active class
      const allBtn = document.getElementsByClassName("btn");
      for (const btn of allBtn) {
        btn.classList.remove("active");
      }

      // add active class
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.videos);
    })
    .catch((error) => console.log(error));
};

// create display categories
const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories-container");
  categories.forEach((element) => {
    // console.log(element);
    // create button
    const createButtonDiv = document.createElement("div");

    createButtonDiv.innerHTML = `
    <button id="btn-${element.category_id}" onClick="showCategories('${element.category_id}')" class = "btn">${element.category}
    </button>`;
    categoriesContainer.appendChild(createButtonDiv);
  });
};

loadCategories();
loadVideos();
