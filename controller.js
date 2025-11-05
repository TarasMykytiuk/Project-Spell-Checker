export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.bindFormSubmit(() => this.handleFormSubmit());
    }

    handleFormSubmit() {
        const text = this.view.elements.textArea.value;
        const words = text.split(" ");
        console.log(words);
    }
}