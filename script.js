const { DateTime } = luxon;

flatpickr("#birth", {
    dateFormat: "d/m/Y",
    maxDate: "today"
});

const calcBtn = document.querySelector(".form-operation #calc-btn")
const resultCard = document.querySelector("#result-calc");

const resultP = document.querySelector("#result-p")

// Evento
calcBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const inputValue = document.querySelector(".form-operation #birth").value

    if (!inputValue) {
        resultP.style.color = "#CE2626";
        resultP.textContent = "Preenche com sua data de nascimento...";
        resultCard.hidden = false;
        return;
    }

    const dateBirth = DateTime.fromFormat(inputValue, "d/M/yyyy");
    const today = DateTime.now();

    if (!dateBirth.isValid || dateBirth.toMillis() > today.toMillis()) {
        resultP.style.color = "#FFBF00";
        resultP.textContent = "Coloque uma data válida...";
        resultCard.hidden = false;
        return;
    }

    const age = today.diff(dateBirth, ["years", "months", "days"]).toObject()

    resultP.textContent = `Você tem ${Math.floor(age.years)} anos, ${Math.floor(age.months)} meses, e ${Math.floor(age.days)} dias de idade.`
    resultP.style.color = "black"
    resultCard.hidden = false
})