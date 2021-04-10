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
    }

  }
}

var inputFileToLoad = document.getElementById("image");
inputFileToLoad.addEventListener("change", function () {
  createimage()
});



document.querySelector("#btn").addEventListener(
  "click",
  (postData = async () => {
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

    const res = await fetch("http://localhost:5555/animes", options);
    const blob = await res.json();
    //console.log(blob);
  })
);
