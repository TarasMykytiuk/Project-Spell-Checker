export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.bindFormSubmit(() => this.handleFormSubmit());
    }

    handleFormSubmit() {
        const text = this.view.readTextArea();
        const words = text.split(" ");
        const wrongWords = this.model.getWrongWords(words);
        const highlightedText = this.model.getMarkedText(words)
        this.view.highlightWords(highlightedText);
        this.view.displayErrors(wrongWords);

        ///////////
        console.log(wrongWords);
    }
}