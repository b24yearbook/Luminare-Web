GRADSJSON = "../grads/grads.json"

//////// LOADER

// Get student Id to show the user what they want
var url = window.location.href.split("#")
var id = url[1]; 

// Get data and do stuff with it
fetch(GRADSJSON).then(
f => f.text()).then(
enc => {console.log(decryption(enc)); return decryption(enc)}).then(
  i => changeStuff(JSON.parse(i)),
  err => {failDec()}); 

// Loads in the data from grads.json 
function changeStuff(info) {
  // Check if id exists by finding the student connected to id
  // I'm sorry for the spaghetti
  var student = info[id];
  if(typeof(student) == "undefined") id = loadBackup();
  if(!validateID(id) || typeof(info[id]) == "undefined") pageLoadFail();
  else window.location.replace(`indiv_spread.html#${id}`);
  student = info[id]
  setBackup(id);

  // Get Silid
  document.querySelector(".silidName").innerHTML = `Silid ${student["Silid"]}`;
  // Change pictures
  document.getElementById("slide-1").style.backgroundImage = `url(${student["Sablay Pic"]})`;
  document.getElementById("slide-2").style.backgroundImage = `url(${student["Creative Pic"]})`;
  document.getElementById("slide-3").style.backgroundImage = `url(${student["Formal Pic"]})`;
  document.getElementById("slide-4").style.backgroundImage = `url(${student["Toga Pic"]})`;

  // Change Name
  document.getElementById("studentName").innerHTML = student["Name"];

  // Get Stylized Name (if picture) or if not, set to whatever text is there.
  fetch(encodeURI(student["Stylized Name"])).then(i=>{
    console.log(i.status);
    if (i.status != "404") document.getElementById("stylizedName").style.backgroundImage = `url(${encodeURI(student["Stylized Name"])})`;
    else {
      document.getElementById("stylizedName").innerHTML = student["Stylized Name"];
      document.getElementById("stylizedName").style.backgroundImage = "none";
    }
  });

  // Get Sections
  let gradeNo = 7;
  student["Sections"].forEach(section => {
    link = document.createElement("a"); 
    link.classList.add("sectionIconLinkWrapper");
    secImage = document.getElementById(`secImage${gradeNo}`);
    
    link.href = `../grads/grads_section.html#${gradeNo}${section}`
    secImage.style.setProperty("--img_url",`url('../../resources/img/icons/Grade ${gradeNo}/${section}.png')`);

    secImage.parentNode.insertBefore(link, secImage)
    link.appendChild(secImage)
    gradeNo++;
  })

  // Update the constellations
  let constellationNo = 1;
  student["Constellations"].forEach((constellation)=>{
    let nameElem = document.getElementById(`constellationName${constellationNo}`);
    nameElem.innerHTML = student["Constellations"][constellationNo - 1];
    let imgElem = document.getElementById(`constellation${constellationNo}`);
    imgElem.style.setProperty("--img_url",`url('../../resources/img/constellations/${student["Constellations"][constellationNo - 1]}')`);

    constellationNo++;
  })
  console.log(student);

  // Change the quote, ec's, writeups, etc.
  document.getElementById("quote").innerHTML = student["Quote"];
  let extracurriculars = document.getElementById("extracurriculars");
  student["Extracurriculars"].forEach((extracurricular)=>{
    let extracurricularElem = document.createElement("p");
    extracurricularElem.innerHTML = extracurricular;
    extracurriculars.appendChild(extracurricularElem);
  });
  document.querySelector("div.pageOne > p.writeup").innerHTML = student["Writeups"][0];
  document.querySelector("div.pageOne > p.writerName").innerHTML = `- ${student["Writers"][0]}`;
  if(student["Writers"].length > 1){ //change writeup 2 or set this part to none if there's no second
    document.querySelector("div.pageTwo > p.writeup").innerHTML = student["Writeups"][1];
    document.querySelector("div.pageTwo > p.writerName").innerHTML = `- ${student["Writers"][1]}`;
  }
  else {document.querySelector("div.pageTwo").remove();}
  
}

function pageLoadFail() { // If page fails to get data, send to indiv 1
  window.location.href = "indiv_spread.html#001";
  window.location.reload();
}

function loadBackup() { // Loads the backup student id which is the last student
  return localStorage.getItem("stdNo");
}
function setBackup(stdNo) {
    localStorage.setItem("stdNo", stdNo);
}

function validateID(id) { // Check if ID is valid
  return !(typeof(id) == undefined || id == null || parseInt(id) == NaN || parseInt(id) > 235 || parseInt(id) < 1);
}





///// SCROLL CHANGE

// Set scroll function to activate
window.onscroll = function() {scrollFunction()};

// Declaration for HIDE ARROWS
HALeft = document.getElementById("arrowLeft");
HARight = document.getElementById("arrowRight");

// Declaration for GO TO TOP BUTTON
GTTButton = document.querySelector(".sendTopButton")
GTTButton.style.display="block";
GTTBStyle = window.getComputedStyle(GTTButton)
// console.log(`HEIGHT ${GTTBStyle.height.replace(/[^\d.]/g,'')} BOTTOM ${GTTBStyle.bottom.replace(/[^\d.]/g,'')}`);
GTTBSize = innerHeight + parseFloat(GTTBStyle.height.replace(/[^\d.]/g,'')) + parseFloat(GTTBStyle.bottom.replace(/[^\d.]/g,''));
GTTButton.addEventListener("click", function(){document.documentElement.scrollTop = 0;});

function scrollFunction() {

  // Hide Arrows
  if (document.documentElement.scrollTop > innerHeight/3) {
    HALeft.className = "arrowLeft vanish";
    HARight.className = "arrowRight vanish";
  } else {
    HALeft.className = "arrowLeft show";
    HARight.className = "arrowRight show";
  }

  // Go to Top button
  doHide = document.documentElement.scrollTop > document.documentElement.scrollHeight - GTTBSize ||
           document.documentElement.scrollTop < innerHeight*0.8
  if (doHide) {
    GTTButton.className = "sendTopButton vanish";
  } else {
    GTTButton.className = "sendTopButton show";
  }
}