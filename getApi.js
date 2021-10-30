var api = "http://universities.hipolabs.com/search?";

document.getElementById("submit").addEventListener("click", getUniList);

var uniList = [];

var buttonClicked = false;

const checkButton = () => {
  if (buttonClicked === true) {
    document.getElementById("uni-list").innerHTML = "";
    uniList = [];
    buttonClicked = false;
  } else buttonClicked = true;
};

const updateCount = (x) => {
  console.log(x);

  const speed = 200;

  document.getElementById("counter").innerHTML = x;
};

async function getUniList() {
  checkButton();

  var countryFilter = document.getElementById("countryFilterInput").value;

  countryFilter = countryFilter.replace(/\s+/g, "+");

  const response = await fetch(api + "country=" + countryFilter);

  const data = await response.json();

  data.forEach((repo) => {
    // console.log(`country: ${repo.country}, name: ${repo.name}`);
    uniList.push([repo.name, repo.web_pages[0]]);
  });

  ul = document.getElementById("uni-list");

  uniList.forEach((item) => {
    let li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML +=
      item[0] +
      "<br><br><div>" +
      "University Website:" +
      "<br>" +
      "<a href='${item[1]}'>" +
      item[1] +
      "</a></div>";
  });

  console.log(uniList);

  updateCount(uniList.length);

  addListClass();

  // document.getElementById("response").innerHTML = uniList;
}

const filterUni = () => {
  var filter = document.getElementById("filerInput").value.toLowerCase();

  document.getElementById("uni-list").innerHTML = "";

  var uniListFiltered = [];

  uniList.forEach((item) => {
    if (item[0].toLowerCase().includes(filter)) {
      let li = document.createElement("li");
      ul.appendChild(li);
      li.innerHTML +=
        item[0] +
        "<br><br><div>" +
        "University Website:" +
        "<br>" +
        "<a href='${item[1]}'>" +
        item[1] +
        "</a></div>";
      uniListFiltered.push(item[0]);
    }
  });

  updateCount(uniListFiltered.length);

  addListClass();
};

const addListClass = () => {
  document.getElementsByTagName("li").forEach((element) => {
    element.className = "panel panel-default jumbotron";
  });

  // document.getElementsByTagName("li").className = "panel panel-default jumbotron";
};

document.getElementById("filerInput").addEventListener("change", filterUni);
document.getElementById("filerInput").addEventListener("keyup", filterUni);
