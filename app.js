function getData(url, fn) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        fn(undefined, JSON.parse(xhr.responseText));
      } else {
        fn(new Error(xhr.statusText), undefined);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
let input = document.getElementById("input");
let wrapper = document.getElementById("wrapper");

input.addEventListener(`keyup`, function () {
  console.log(input.value);
  wrapper.innerHTML = "";
  getData(
    `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${input.value}`,
    function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        let sugestion = res[1].filter(function (eee) {
          return eee.toLowerCase().startsWith(input.value);
        });
        sugestion.forEach((element) => {
          console.log(element);
          let div = document.createElement("div");
          div.innerHTML = `
          <div class="wrapper-1">
            <img src="https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=pageprops|pageimages&format=jso
            n&titles=${element}" alt="photo" class="img">
                <div class="wrapper-2">
                <h4>${element}</h4>
                <p>Description</p>
            </div>
          </div>`;
          wrapper.appendChild(div);
        });
        if (input.value === ``) {
          wrapper.innerHTML = ``;
        }
        console.log(sugestion);
      }
    }
  );
});
