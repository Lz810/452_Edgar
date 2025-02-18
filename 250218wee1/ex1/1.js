// Get user's name using prompt
const userName = prompt("Please enter your name:");

// Get the greeting div element
const greetingDiv = document.getElementById("greeting");

// Check if user entered a name
if (userName && userName.trim() !== "") {
    // Create and display personalized greeting
    greetingDiv.textContent = `Hello, ${userName}! Welcome to our website!`;
} else {
    // If no name was entered, show default greeting
    greetingDiv.textContent = "Hello, Guest! Welcome to our website!";
} 