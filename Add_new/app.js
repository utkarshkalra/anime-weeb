// const URL = "https://anime-server.herokuapp.com/animes";
const URL = "https://anime-server-production.up.railway.app/anime";

const span = document.getElementById("addspan");
animeImage = "";
function createimage() {
  // console.log("hello")
  let image = document.getElementById("image").files;

  if (image.length > 0) {
    // console.log("hello2")
    var file = image[0];
    var read = new FileReader();
    read.readAsDataURL(file);
    read.onload = (e) => {
      animeImage = e.target.result;
      //console.log(animeImage);
    };
  }
}

var inputFileToLoad = document.getElementById("image");
inputFileToLoad.addEventListener("change", function () {
  createimage();
});

document.querySelector("#btn").addEventListener(
  "click",
  (postData = async () => {
    span.style.display = "flex";
    let animeName = document.getElementById("name").value;
    let animeDescription = document.getElementById("description").value;

    const data = { animeName, animeDescription, animeImage };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const res = await fetch(`${URL}`, options);
    const blob = await res.json();
    //console.log(blob);

    span.innerHTML = "Added!";
    span.style.backgroundColor = "green";
    span.style.color = "white";

    setTimeout(function () {
      location.reload();
    }, 1000);
  })
);
