const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting){
            entry.target.classList.add('comeBack');
        } else {
            entry.target.classList.remove('comeBack');
        }
    });
});
const hiddenElements = document.querySelectorAll('.goAwayLeft, .goAwayRight');
hiddenElements.forEach((el) => observer.observe(el));

function ajkfhasjdfhsakgjh() {
    let theDivInQuestion = document.getElementById("graduates");

    theDivInQuestion.innerHTML = `
        <div>
            <a href=""><h2 class="options">2024 Silids (Soon!)</h2></a>
        </div>
        <div>
            <a href="../grads/grads_by_section.html"><h2 class="options">2024 Through the Years</h2></a>
        </div>
    `
}


// Click on The Graduates > Splits into two sides, one is "2024 Silids" and one is "2024 Through the Years", one leading to grads_by_silids and the other leading to grads_by_sections
// tapos both lead to grads_section (rename to grads_filter.html nalang siguro)
// js would work by setting localStorage.setItem("filter", "silid/section") and reading that in grads_filter.html, tapos only chage in grads_filter.html (previous grads_section) would be how it looks at the url I'd say