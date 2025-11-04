export default class Model {
    constructor() {

    }

    async loadWords() {
        const response = await fetch('./words.json');
        const words = await response.json();
        return words;
    }

    async getDictionarySize() {
        const words = await this.loadWords();
        return words.length;
    }
}