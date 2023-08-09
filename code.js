document.addEventListener("DOMContentLoaded", function () {
    const generateButton = document.getElementById("generateButton");
    const copyButton = document.getElementById("copyButton");

    generateButton.addEventListener("click", generateLottoNumbers);
    copyButton.addEventListener("click", copyLottoNumbers);
});

function generateLottoNumbers() {
    const lottoNumbersContainer = document.querySelector("#lottoNumbers");
    const excludeInput = document.querySelector("#excludeNumbers");

    // Parse the exclude numbers from the input field
    const excludeNumbers = excludeInput.value.split(",").map(num => parseInt(num.trim()));

    // Create an array of numbers from 1 to 45, excluding the excluded numbers
    let numbers = Array.from({ length: 45 }, (_, i) => i + 1).filter(num => !excludeNumbers.includes(num));

    if (numbers.length < 6) {
        alert("포함할 숫자를 더 추가해주세요.");
        return;
    }

    const selectedNumbers = [];
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        const selectedNumber = numbers.splice(randomIndex, 1)[0];
        selectedNumbers.push(selectedNumber);
    }

    selectedNumbers.sort((a, b) => a - b);

    const coloredNumbers = selectedNumbers.map(number => {
        if (number <= 10) return `<span class="yellow">${number}</span>`;
        if (number <= 20) return `<span class="blue">${number}</span>`;
        if (number <= 30) return `<span class="red">${number}</span>`;
        if (number <= 40) return `<span class="gray">${number}</span>`;
        return `<span class="green">${number}</span>`;
    });

    const listItem = document.createElement("li");
    listItem.innerHTML = coloredNumbers.join("");
    lottoNumbersContainer.appendChild(listItem);
}

function copyLottoNumbers() {
    const lottoNumbersContainer = document.querySelector("#lottoNumbers");
    const lottoNumbers = Array.from(lottoNumbersContainer.querySelectorAll("span"));
    const lottoNumbersText = lottoNumbers.map(span => span.textContent).join(" ");

    // Split the numbers into sets of 5 numbers per line
    const numbersPerLine = 6;
    let formattedNumbers = "";
    for (let i = 0; i < lottoNumbers.length; i += numbersPerLine) {
        const numberSet = lottoNumbers.slice(i, i + numbersPerLine);
        formattedNumbers += numberSet.map(span => span.textContent).join(" ") + "\n";
    }

    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = formattedNumbers;

    // Hide the temporary textarea element from view.
    tempTextArea.style.position = "fixed";
    tempTextArea.style.opacity = 0;

    document.body.appendChild(tempTextArea);
    tempTextArea.select();

    try {
        document.execCommand("copy");
        alert("로또번호가 성공적으로 복사되었습니다!");
    } catch (err) {
        alert("복사를 실패하였습니다. 수동으로 복사해주세요.");
    } finally {
        document.body.removeChild(tempTextArea);
    }
}