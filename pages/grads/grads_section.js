// Helper function for changing how strings look, used in making html ids or classes
function lowerConnect(str, lower=true, joiner="") {
    if(lower) return str.charAt(0).toLowerCase() + str.replaceAll(/[,.-\s]/g, "").slice(1);
    else return str.replaceAll(/[,.-\s]/g, "");
}

// Functions related to backup data for clean user experience
// If the website is accessed purely on links on it, unnecessary
// But I'm a url inputter who types my urls so 🤷‍♀️ here we are
function loadBackup() {
    return [localStorage.getItem("section"), localStorage.getItem("grade")];
}
function setBackup(section, grade) {
    localStorage.setItem("section", section);
    localStorage.setItem("grade", grade);
}

///////////////////////////
// RUNNING CODE

// Get site ID to show the user what they want
url = window.location.href.split("#")
siteId = url.length > 1 ? url[1] : "Error!"; //Error handling in async function changeStuff()
    // Assume siteId is of form AaBB..., where Aa is a number from 7 to 12, BB... is the section
var grade = `Grade ${siteId[0] == "1"? siteId.slice(0, 2) : siteId[0]}`;
var section = siteId[0] == "1"? siteId.slice(2) : siteId.slice(1);

// asynchronous function declaration, uses grads_section.json as info
async function changeStuff(info) { // changes the html contents with student info
    // Initialize students with the necessary grade section, and
    // Check if the json list is accessible
    try{
        var students = info[grade][section]; 
        students[0];}
    catch(err){
        // If fail, go to backup
        try{
            [section, grade] = loadBackup();
            var students = info[grade][section];
            students[0]; //check if accessible
            window.location.href = `grads_section.html#${grade.split(" ")[1]}${section}` // Send them to the backup page
        }
        catch(err) { // If still fails, send user out of the page
            var prevPage = window.location.href; // Initialize current href in caes going back does nothing
            window.history.back(); // Send user back
            
            // If somehow you can't send the user back, send them to The Graduates
            setTimeout(function(){ 
                if (window.location.href == prevPage) {
                    window.location.href = "grads_by_section.html"; 
                }
            }, 500);
        }
    }

    // Now that we have a valid grade section, set the backup
    setBackup(section, grade)
    
    // First, set the inner HTML of the section header. 
    // A bit messy but the image is written in plain html here within the header element
    document.getElementById("sectionName").innerHTML = 
        `<img class="sectionIcon" alt="${grade} ${section} Icon" ` +
        `src="../../resources/img/icons/${grade.replace(" ", "%20")}/${section}.png">` + 
        `${grade.split(" ")[1]} - ${section}`;

    // Initialize the section that contains all the students
    let studentsDiv = document.getElementById("students");
    
    // Get the list of ALL students since we need the
    // Thumbnail(one of the four pics) and Name of the students in the section 
    // since we only have their student ids
    let grads = await fetch("grads.json").then(f => f.text()).then(i => JSON.parse(i));

    // Start creating all the elements containing students
    let counter = 1;
    students.forEach(s =>{
        // link wrap so you can see where the link goes on desktop
        let aWrap = document.createElement("a");
        aWrap.href = "../indiv_spread/indiv_spread.html#" + s;
        aWrap.setAttribute("onclick", `pageChange("${s}")`);

        let sDiv = document.createElement("div");
        sDiv.className = "student";
        sDiv.id = lowerConnect(s);

        let profile = document.createElement("img");
        profile.className = "studentProfile";
        try {image = grads[s]["Toga Pic"]}
        catch(err) {image = "../../resources/img/PLACEHOLDER.png"} //handle this error properly in the future
        profile.src = image;

        let name = document.createElement("p");
        name.className = "studentName";
        console.log(s);
        // placeholder is for debug
        name.textContent = s != "Placeholder" ? grads[s]["Name"].split(",")[0] : `Student ${counter}`;

        sDiv.appendChild(profile); sDiv.appendChild(name); aWrap.appendChild(sDiv);
        studentsDiv.appendChild(aWrap);
        counter ++;
    })
}   

// actual running code of that async function changeStuff()
fetch("grads_section.json").then(f => f.text()).then(i => changeStuff(JSON.parse(i)));