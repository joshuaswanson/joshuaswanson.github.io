window.onscroll = function() { runOnScroll() };
function runOnScroll() {
    let scrollAmount = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    document.getElementById("header-cover").style.top = (500 - 0.5 * scrollAmount) + "px";
}


function showError() {
    document.getElementById("resume-container").innerHTML = "I haven't uploaded this yet. Sorry! ";
}