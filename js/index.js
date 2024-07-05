var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var siteArr;


if (localStorage.getItem("sites") == null) {
  siteArr = [];
} else {
  siteArr = JSON.parse(localStorage.getItem("sites"));
  displaySite()
}


function addSite () {
  if (validate (nameRegex, siteName) && validate (urlRegex, siteURL)) {
      var site = {
    name : siteName.value,
    url : siteURL.value,
    }
    siteArr.push(site);
    clear();
    displaySite();
    localStorage.setItem("sites", JSON.stringify(siteArr));
    
  } else {
    alert(`Site Name or Url is not valid, Please follow the rules below :

    * Site name must contain at least 3 characters.
    * Site URL must be a valid one.`)
    
  }
}

function clear () {
  siteName.value = null;
  siteURL.value = null
}

function displaySite () {
    var table = '';
    for (var i = 0; i < siteArr.length; i++) {
        table += `<tr>
                <td class="pt-sm-3 pt-4">${i + 1}</td>
                <td class="pt-sm-3 pt-4">${siteArr[i].name}</td>
                <td><a href="https://${siteArr[i].url}" target="_blank"><button class="btn btn-success shadow-none"><i class="fa-solid fa-eye"></i> Visit</button></a></td>
                <td><button class="btn btn-danger shadow-none" onclick="deleteSite (${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`
  }
  document.getElementById("tableBody").innerHTML = table;
}

function deleteSite (i) {
  siteArr.splice(i, 1);
  localStorage.setItem("sites", JSON.stringify(siteArr));
  document.getElementById("tableBody").innerHTML = " ";
  displaySite()
}

var nameRegex = /^[A-Z]?[a-z0-9\s]+([A-Z][a-z0-9\s]+)*$/;
var urlRegex = /^(https:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
;

function validate (regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
    
  }
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
}

// var nameRegex = /^[A-Z][a-z0-9\s]+([A-Z][a-z0-9\s])+*$/;
// var urlRegex = /^(http(s)?:\/\/)(www\.)?[a-zA-Z0-9@&:%._\+#=-]{3,}\.[a-z]{2,}$/;


