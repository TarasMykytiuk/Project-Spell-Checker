export default class Model {
    constructor() {
        this.words = []
    }

    async loadWords() {
        const response = await fetch('./words.json');
        const words = await response.json();
        this.words = words;
    }

    checkWord(word) {
        return this.words.includes(word);
    }

    async getDictionarySize() {
        const words = await this.loadWords();
        return words.length;
    }
}