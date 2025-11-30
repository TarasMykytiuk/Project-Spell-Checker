export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.bindTextSubmit(() => this.handleTextSubmit());
        this.view.textAreaChange();
        this.view.bindAddToDictSubmit(() => this.handleAddToDictSubmit());
    }

    handleTextSubmit() {
        const text = this.view.readTextArea();
        const words = text.split(" ");
        const wrongWords = this.model.getWrongWords(words);
        const highlightedText = this.model.markWrongWords(words, wrongWords);
        this.view.highlightWords(highlightedText);
        this.view.displayResult(wrongWords);
    }

    handleAddToDictSubmit() {
        const text = this.view.readAddDict();
        const words = text.split(" ");
        this.model.addToDict(words);
    }
}