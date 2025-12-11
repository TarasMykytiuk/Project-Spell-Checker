export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.bindTextSubmit(() => this.handleTextSubmit());
        this.view.textAreaChange();
    }

    handleTextSubmit() {
        const text = this.view.readTextArea();
        const words = text.trim().split(" ");
        const wrongWords = this.model.getWrongWords(words);
        const highlightedText = this.model.markWrongWords(words, wrongWords);
        this.view.highlightWords(highlightedText);
        this.view.displayResult(wrongWords);
        this.view.bindAddWordToDict((word) => this.handleAddWordToDict(word));
    }

    handleAddWordToDict(word) {
        this.model.addToDict(word);
    }
}