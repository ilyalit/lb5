let movies;

fetch("movies.json").then(function(response) {
  if (response.ok) {
    response.json().then(function(response) {
      movies = response.results;
      console.log(movies);
      initialize();
    });
  } else {
    console.log(
      "Network request for movies.json failed with response " +
        response.status +
        ": " +
        response.statusText
    );
  }
});

function initialize() {
  let main = document.querySelector("main");

  let finalGroup;

  finalGroup = [];
  finalGroup = movies;
  updateDisplay();

  function updateDisplay() {
    for (let i = 0; i < finalGroup.length; i++) {
      fetchBlob(finalGroup[i]);
    }
  }

  function fetchBlob(movie) {
    const posterCommonPath = "http://image.tmdb.org/t/p/w300";
    let url = posterCommonPath + movie.poster_path;

    fetch(url).then(function(response) {
      if (response.ok) {
        response.blob().then(function(blob) {
          let objectURL = URL.createObjectURL(blob);

          showmovie(objectURL, movie);
        });
      } else {
        console.log(
          'Network request for "' +
            movie.name +
            '" image failed with response ' +
            response.status +
            ": " +
            response.statusText
        );
      }
    });
  }

  function showmovie(objectURL, movie) {
    let section = document.createElement("section");
    let heading = document.createElement("h3");
    let imgBox = document.createElement("div");
    let para = document.createElement("div");
    let averageAndChek = document.createElement("div");
    let chekAndLabel = document.createElement("label");
    let image = document.createElement("img");
    let average = document.createElement("p");
    let chek = document.createElement("input");
    let label = document.createElement("span");

    para.setAttribute("class", "overview");
    imgBox.setAttribute("class", "imgBox");
    chek.setAttribute("type", "checkbox");
    averageAndChek.setAttribute("class", "averageChek");
    chekAndLabel.setAttribute("class","checkBoxStyle");

    para.textContent = movie.overview;
    heading.textContent = movie.title;
    average.textContent = movie.vote_average;
    label.innerHTML = "Look later";
    
    image.src = objectURL;
    image.alt = movie.name;
    
    main.appendChild(section);
    section.appendChild(imgBox);
    imgBox.appendChild(image);
    section.appendChild(heading);
    section.appendChild(averageAndChek);
    averageAndChek.appendChild(average);
    averageAndChek.appendChild(chekAndLabel);
    chekAndLabel.appendChild(chek);
    chekAndLabel.appendChild(label);

    section.appendChild(para);

    window.onload = function() {
      let nameForId;
      for (let i = 0; i < finalGroup.length; i++) {
        nameForId = "chekBox" + i;
        document.getElementsByTagName("input")[i].setAttribute("id", nameForId);
      }

      let storage = {
        itemLength: document
          .getElementById("myTest")
          .getElementsByTagName("section").length,
        init: function() {
          this.checkStorageComp();
        },
        checkStorageComp: function() {
          if (typeof Storage != "undefined") {
            console.log("web storage is supported");
            storage.readStorage();
            storage.detectCheckboxClick();
          } else {            
            alert("Sorry your broweser do not support web storage.");
          }
        },
        detectCheckboxClick: function() {
          let inputEle = document.getElementsByTagName("input");
          for (let i = 0; i < inputEle.length; i++) {
            let t = document.getElementById("chekBox" + i);
            t.onclick = (function(j) {
              return function() {
                this.checked
                  ? storage.setStorage("chekBox" + j)
                  : storage.removeStorage("chekBox" + j);
              };
            })(i);
          }
        },
        setStorage: function(ele) {
          localStorage.setItem(ele, "true");
        },
        removeStorage: function(ele) {
          localStorage.removeItem(ele);
        },
        readStorage: function() {
          for (let i = 0; i < this.itemLength; i++) {
            let c = document.getElementById("chekBox" + i);
            localStorage.getItem("chekBox" + i)
              ? (c.checked = true)
              : (c.checked = false);
          }
        }
      };

      storage.init();
    };
  }
}