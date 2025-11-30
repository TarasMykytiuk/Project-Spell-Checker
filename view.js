export default class View {
    #elements;
    constructor() {
        this.#elements = {
            textForm: document.getElementById("text_form"),
            textInput: document.getElementById("text_input"),
            highlights: document.getElementById("highlights"),
            spellMistakes: document.getElementById("spelling_mistakes"),
            submitBtn: document.getElementById("text_form_submit"),
            wrongWordsDom: document.getElementById("wrong_words"),
            noErrorsDom: document.getElementById("no_mistakes"),
            resultMessage: document.getElementById("result_message"),
            resultHeader: document.getElementById("result_header"),
            addToDictForm: document.getElementById("add_to_dict_form"),
            addToDictInput: document.getElementById("add_to_dict"),
            addToDictBtn: document.getElementById("dict_form_submit")
        }
    }

    bindTextSubmit(handler) {
        this.#elements.submitBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this.#elements.resultMessage.style.visibility = "hidden";
            this.#elements.resultHeader.textContent = '';
            this.#elements.wrongWordsDom.textContent = '';
            handler();
        });
    }

    textAreaChange() {
        this.#elements.textInput.addEventListener("input", (event) => {
            this.#elements.highlights.innerHTML = '';
        })
    }

    bindAddToDictSubmit(handler) {
        this.#elements.addToDictBtn.addEventListener("click", (event) => {
            event.preventDefault();
            handler();
        });
    }

    readTextArea() {
        return this.#elements.textInput.value;
    }

    readAddDict() {
        const input = this.#elements.addToDictInput.value;
        this.#elements.addToDictInput.value = '';
        return input;
    }

    highlightWords(highlightedText) {
        this.#elements.highlights.innerHTML = highlightedText;
    }

    displayResult(wrongWords) {
        this.#elements.resultMessage.style.visibility = 'visible';
        this.#elements.resultMessage.style.border = wrongWords.length != 0 ? "2px solid red" : "2px solid green";
        this.#elements.resultHeader.textContent = wrongWords.length != 0 ? "This words are not in dictionary:" : "All words are correct!";
        this.#elements.wrongWordsDom.textContent = wrongWords.length != 0 ? wrongWords.join(" ") : "";
    }
}