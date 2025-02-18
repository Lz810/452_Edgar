function filterImages(category) {
    // Get all images
    const images = document.getElementsByClassName('image');
    
    // Loop through all images
    for (let img of images) {
        if (category === 'all') {
            // If "all" is selected, show all images
            img.classList.remove('hide');
        } else {
            // Otherwise only show images of selected category
            if (img.classList.contains(category)) {
                img.classList.remove('hide');
            } else {
                img.classList.add('hide');
            }
        }
    }
}

function showImage(imageName) {
    document.getElementById("demo").innerHTML = imageName;
} 