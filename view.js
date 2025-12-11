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
            addAllBtn: document.getElementById("add_all_wrong_words")
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
        this.#elements.textInput.addEventListener("input", () => {
            this.#elements.highlights.innerHTML = '';
        })
    }

    bindAddWordToDict(handler) {
        const buttons = document.getElementsByClassName("add_wrong_word_button");
        const buttonsArray = [...buttons];
        buttonsArray.forEach(button => {
            button.addEventListener("click", () => {
                this.addWordButtonOnClick(button, handler);
                if (buttons.length == 0) {
                    this.hideResultMessage();
                }
            })
        });
        this.#elements.addAllBtn.addEventListener("click", () => {
            buttonsArray.forEach(button => {
                this.addWordButtonOnClick(button, handler);
            });
            this.hideResultMessage();
        });
    }

    addWordButtonOnClick(button, handler) {
        const div = button.parentElement;
        const word = button.id;
        handler(word);
        div.remove();
    }

    readTextArea() {
        return this.#elements.textInput.value;
    }

    highlightWords(highlightedText) {
        this.#elements.highlights.innerHTML = highlightedText;
    }

    displayResult(wrongWords) {
        this.#elements.resultMessage.style.visibility = 'visible';
        this.#elements.resultMessage.style.border = wrongWords.length != 0 ? "2px solid red" : "2px solid green";
        this.#elements.resultHeader.textContent = wrongWords.length != 0 ? "This words are not in dictionary:" : "All words are correct!";
        if (wrongWords.length != 0) {
            wrongWords.forEach(word => {
                const card = this.createWrongWordCard(word);
                this.#elements.wrongWordsDom.append(card);
            });
            this.#elements.addAllBtn.style.visibility = "visible";
        } else {
            this.#elements.wrongWordsDom.textContent = "";
        }
    }

    hideResultMessage() {
        this.#elements.resultMessage.style.visibility = "hidden";
        this.#elements.resultHeader.textContent = '';
        this.#elements.wrongWordsDom.textContent = '';
        this.#elements.addAllBtn.style.visibility = "hidden";
    }

    createWrongWordCard(word) {
        const div = document.createElement("div");
        div.classList = "wrong_word_card";
        const p = document.createElement("p");
        p.textContent = word;
        const button = document.createElement("button");
        button.classList = "add_wrong_word_button";
        button.id = word;
        button.textContent = "Add to Dictionary";
        div.appendChild(p);
        div.appendChild(button);
        return div;
    }
}