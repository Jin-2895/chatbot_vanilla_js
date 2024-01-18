function toggleBox() {
    var box = document.getElementById("infinitybot");
    var arrow = document.getElementById("infinitybot-bot-icon-arrow")
    if (box.style.display === "none") {
        box.style.display = "block";
        arrow.style.display = "block";
    } else {
        box.style.display = "none";
        arrow.style.display = "none";
    }
}