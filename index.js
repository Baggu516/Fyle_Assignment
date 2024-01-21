// ....reading usernmse

const searchGithub = () => {
  let inputElement = document.getElementById("myInput");
  var inputValue = inputElement.value;
  // console.log("inputValue",inputValue)

  fetchData1(inputValue);
  fetchData(inputValue);
};
const fetchUserDataPerPage = () => {
  t = document.getElementById("perpage");
  fetchData();
  fetchData1();
};
const apiUrl = "https://api.github.com/users/baggu516/repos";

let currentPage = 1;
let totalPages;
let t = document.getElementById("language");
// console.log("teaa",t)
// setting Img and description......
const setImgAndDescription = (img, user, des) => {
  document.getElementById("img").src = img;
  document.getElementById("h3").innerHTML = user || "baggu";
  document.getElementById("desc").innerText = des || "No Description";

  console.log("end of setImg func");
};
// ....fetching during ratelimit
function fetchDataWithRetry(maxRetries = 3, delay = 1000) {
  let retries = 0;

  function fetchWithBackoff() {
    let inputElement = document.getElementById("myInput");
    var inputValue = inputElement.value;
    let user = inputValue == "" ? "Baggu516" : inputValue;
    let temUrl = `https://api.github.com/users/${user}/repos`;

    return fetch(temUrl).then((response) => {
      if (response.status === 403 && retries < maxRetries) {
        // Rate limit exceeded, implement exponential backoff
        retries++;
        const delayTime = Math.pow(2, retries - 1) * delay;
        console.log(
          `Rate limit exceeded. Retrying after ${delayTime} milliseconds.`
        );
        return new Promise((resolve) => setTimeout(resolve, delayTime)).then(
          fetchWithBackoff
        );
      } else {
        return response.json();
      }
    });
  }

  return fetchWithBackoff();
}

// .................................
function fetchData1() {
  document.getElementById("loading-spinner").style.display = "block";
  document.getElementById("maincontainer").style.display = "none";
  fetchDataWithRetry()
    .then((data) => {
      document.getElementById("maincontainer").style.display = "block";
      document.getElementById("loading-spinner").style.display = "none";
      // displayData(data);
      totalPages = data.length;
      generatePagination(data.length);
      // console.log(data[0].owner.avatar_url,data[0].owner.login,data[0].description)
      setImgAndDescription(
        data[0].owner.avatar_url,
        data[0].owner.login,
        data[0].description
      );

      let t = document.getElementById("link");
      console.log(t);
      // Assuming "parentElement" is the parent node
      // var parentElement = document.getElementById('parentElementId');

      // Remove all child elements
      while (t.firstChild) {
        t.removeChild(t.firstChild);
      }

      const listItem = document.createElement("p");

      listItem.textContent = `${data[0]?.owner.html_url}`;
      t.appendChild(listItem);
    })
    .catch((error) => {
      document.getElementById("maincontainer").style.display = "block";
      document.getElementById("loading-spinner").style.display = "none";
      // document.getElementById("maincontainer").innerText="Error in Fetching Data..........."
      document.getElementById("maincontainer").style.textAlign = "center";
      // document.getElementById('maincontainer').style.border = 'none';
      console.error("Error fetching data:", error);
    });
}
// for heading .............

function fetchData(name = "Baggu516") {
  console.log("fetch");
  // perpage..........
  let itemsPerPage = +document.getElementById("perpage").value;
  console.log(
    document.getElementById("perpage").innerText,
    "document.getElementById().innerText"
  );
  document.getElementById("loading-spinner").style.display = "block";
  document.getElementById("maincontainer").style.display = "none";
  // console.log("container",document.getElementsByClassName('container'))
  console.log("dvc");
  console.log("name", name);
  let inputElement = document.getElementById("myInput");
  var inputValue = inputElement.value;
  let user = inputValue == "" ? "Baggu516" : inputValue;
  let temp = `https://api.github.com/users/${user}/repos`;

  fetch(`${temp}?page=${currentPage}&per_page=${itemsPerPage}`)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("maincontainer").style.display = "block";
      document.getElementById("loading-spinner").style.display = "none";
      // document.getElementById('maincontainer').style.border = 'none';
      displayData(data);
    })
    .catch((error) => {
      document.getElementById("maincontainer").style.display = "block";
      document.getElementById("loading-spinner").style.display = "none";
      // document.getElementById("maincontainer").innerText="Error in Fetching Data..........."
      document.getElementById("maincontainer").style.textAlign = "center";
      console.error("Error fetching data:", error);
    });
}
// .....getting languages.........
const getlanguages = (name, listItem) => {
  let username = document.getElementById("h3").innerHTML;
  console.log(username, "username");
  let inputElement = document.getElementById("myInput");
  var inputValue = inputElement.value == "" ? "Baggu516" : inputElement.value;
  console.log("inputValue", inputValue);
  fetch(`https://api.github.com/repos/${inputValue}/${name}/languages`)
    .then((response) => response.json())
    .then((data) => {
      let lst = Object.keys(data);
      console.log(lst);
      let samdiv = document.createElement("div");
      samdiv.classList.add("language-container");
      lst.forEach((item) => {
        // if(["HTML","JavaScript","CSS","Python"].includes(item)){
        let i = document.createElement("p");
        i.classList.add("language-item");
        i.textContent = item;
        console.log("pppppppppp", i);
        samdiv.appendChild(i);
        // }

        // console.log("after append",t)
      });
      listItem.appendChild(samdiv);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
function displayData(data) {
  console.log(data);
  const dataList = document.getElementById("dataList");
  dataList.innerHTML = "";

  data.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item.name;
    // ...This function is for getting Languages....
    getlanguages(item.name, listItem);
    // const l = document.createElement('p');
    // l.innerHTML="hello"
    // listItem.append(l)
    // Adjust this based on your data structure
    dataList.appendChild(listItem);
  });
}

function generatePagination(x) {
  console.log(totalPages);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  let t = +document.getElementById("perpage").value;
  const totalPages1 = Math.ceil(x / t);
  console.log(
    "pagination99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999",
    totalPages1
  );
  for (let i = 1; i <= totalPages1; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = i;
    listItem.addEventListener("click", () => {
      // console.log("i",i)
      currentPage = i;
      let inputElement = document.getElementById("myInput");
      var inputValue = inputElement.value;
      fetchData(inputValue);

      //  console.log("inside")
      let arr = document.querySelectorAll(".pagination li");
      for (let j = 0; j < arr.length; j++) {
        if (i == j + 1) {
          arr[j].classList.add("active");
        } else {
          arr[j].classList.contains("active")
            ? arr[j].classList.remove("active")
            : "null";
        }
      }
      // let temp=arr.map((item,i)=>{
      //   if (i === currentPage) {

      //     return item.classList.add('active')

      //  }
      //  else{
      //  return item.classList.contains("active")?item.classList.remove("active"):"none"
      //  }

      //  pagination.appendChild(listItem);
    });
    // console.log(temp,"temp")

    // console.log("i outside",i)

    //  console.log(currentPage,"cuurent page")

    // })
    if (i === currentPage) {
      console.log("inside");
      listItem.classList.add("active");
    }

    pagination.appendChild(listItem);
    console.log("i", i, "current", currentPage);
  }
}

// Initial fetch and display
fetchData1();
fetchData();
