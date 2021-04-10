
const URL = "http://localhost:5555/animes";
const wrap = document.querySelector("#wrapper");
const element = document.getElementById("up");


//adding scroll;

getData();
async function getData() {
  const res = await fetch(URL);
  const data = await res.json();
  //console.log(data);

  data.forEach((item) => {

    const card = document.createElement("div");
    const image = document.createElement("img");
    const cardbody = document.createElement("div");
    const heading = document.createElement("h5");
    const description = document.createElement("p");
    const updateb = document.createElement("button");
    const deleteb = document.createElement("button");

    card.classList.add("card", "mx-3", "my-3");
    card.style = "width:18rem";

    image.classList.add("card-img-top");
    cardbody.classList.add("card-body", "d-flex", "flex-column");
    heading.classList.add("card-title");
    description.classList.add("card-text");

    updateb.classList.add("btn", "btn-secondary", "update", "mt-auto");
    deleteb.classList.add("btn", "btn-danger", "delete");

    updateb.id = "updateanime"
    deleteb.id = "delanime"

    cardbody.setAttribute('data-id', `${item._id}`);

    card.appendChild(image);
    card.appendChild(cardbody);
    cardbody.appendChild(heading);
    cardbody.appendChild(description);
    cardbody.appendChild(updateb);
    cardbody.appendChild(deleteb);



    image.src = item.animeImage || "img/inf.png";
    heading.textContent = item.animeName;
    description.textContent = item.animeDescription;
    updateb.textContent = "Update";
    deleteb.textContent = "Delete";

    wrap.appendChild(card);

  });
}




wrap.addEventListener("click", (e) => {
  e.preventDefault();
  //console.log(e.target);
  let updatebutpress = e.target.id == "updateanime";
  let delbutpress = e.target.id == "delanime";


  // DELETE ANIME //


  if (delbutpress) {
    const parent = e.target.parentElement;

    let name = parent.querySelector(".card-title").textContent;

    if (confirm(`do you want to delete ${name} card `)) {

      const id = e.target.parentElement.dataset.id;

      const options = {
        method: "DELETE",
      };

      fetch(`http://localhost:5555/animes/${id}`, options).then(res => res.json()).then(() => location.reload());


    }
  }
  //updateanime


  if (updatebutpress) {
    element.style.display = "";

    const id = e.target.parentElement.dataset.id;
    const parent = e.target.parentElement;

    let name = parent.querySelector(".card-title").textContent;
    let des = parent.querySelector(".card-text").textContent;
    let imagebox = parent.parentElement.querySelector(".card-img-top").src;


    if (confirm(`do u wanna update ${name} card `)) {
      var updatename = document.getElementById("name");
      var updatedes = document.getElementById("description");

      var button = document.getElementById("btn");
      updatename.value = name;
      updatedes.value = des;
      animeImage = null;
      function createimage() {
        //console.log("hello")
        let image = document.getElementById("image").files;

        if (image.length > 0) {
          //console.log("hello2")
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



      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;


      button.addEventListener("click", (e) => {
        fetch(`${URL}/${id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            animeName: updatename.value,
            animeDescription: updatedes.value,
            animeImage: animeImage || imagebox


          })
        })
          .then(res => res.json())
          .then((res) => {
            //console.log(res);
            location.reload()

          })
      })
    }

  }


})





