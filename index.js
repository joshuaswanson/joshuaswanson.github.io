function runOnScroll() {
    //if (document.body.scrollTop >= 200) {
        var scrollAmount = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);

    document.getElementById("header-cover").style.top = (500 - 0.5 * scrollAmount) + "px";
    //}
}
window.onscroll = function() { runOnScroll() };