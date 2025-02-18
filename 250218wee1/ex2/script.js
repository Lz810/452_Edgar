let counter = 0;

function countClicks() {
    counter++;
    document.getElementById("demo").innerHTML = "Total Clicks: " + counter;
}