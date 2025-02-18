const generateButton = document.getElementById('generateButton');
const numberList = document.getElementById('numberList');

generateButton.addEventListener('click', function () {
  numberList.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = i;
    numberList.appendChild(listItem);
  }
});