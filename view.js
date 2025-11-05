export default class View {
    constructor() {
        this.elements = {
            textForm: document.getElementById("text_form"),
            textArea: document.getElementById("textarea"),
            submitBtn: document.getElementById("form_submit")
        }
    }

    bindFormSubmit(handler) {
        this.elements.submitBtn.addEventListener("click", (event) => {
            event.preventDefault();
            handler();
        });
    }
}