export default class View {
    #elements;
    constructor() {
        this.#elements = {
            textForm: document.getElementById("text_form"),
            textArea: document.getElementById("textarea"),
            highlights: document.getElementById("highlights"),
            spellMistakes: document.getElementById("spelling_mistakes"),
            submitBtn: document.getElementById("form_submit")
        }
    }

    bindFormSubmit(handler) {
        this.#elements.submitBtn.addEventListener("click", (event) => {
            event.preventDefault();
            handler();
        });
    }

    readTextArea() {
        return this.#elements.textArea.value;
    }

    highlightWords(highlightedText) {
        this.#elements.highlights.innerHTML = highlightedText;
    }

    displayErrors(wrongWords) {
        this.#elements.spellMistakes.innerHTML = wrongWords.join(" ");
    }
}