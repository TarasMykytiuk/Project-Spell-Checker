export default class Model {
    #dictPath;
    #dictionary;
    #punctuation;
    constructor() {
        this.#dictPath = "./words.json";
        this.#dictionary = [];
        this.loadDictionary();
        this.#punctuation = '.,?!":;)';
    }

    async loadDictionary() {
        const response = await fetch(this.#dictPath);
        const words = await response.json();
        this.#dictionary = words;
    }

    getMarkedText(words) {
        return this.markWrongWords(words, this.getWrongWords(words));
    }

    removePunctuation(word) {
        const regex = new RegExp(`^[${this.#punctuation}]+|[${this.#punctuation}]+$`, 'g');
        return word.replace(regex, '');
    }

    checkWord(word) {
        let parts = word.split("-");
        for (const part of parts) {
            if (!this.#dictionary.includes(this.removePunctuation(part)) &&
                !this.#dictionary.includes(this.removePunctuation(part.toLowerCase()))) { return false };
        }
        return true;
    }

    getWrongWords(words) {
        return words.filter(word => !this.checkWord(word));
    }

    markWrongWords(words, wrongWords) {
        let text = "";
        words.forEach(word => {
            if (wrongWords.includes(word)) {
                word = `<mark>${word}</mark>`;
            }
            text += word + " ";
        });
        return text;
    }

    async addToDict(words) {
        words.forEach(word => { this.#dictionary.push(word); });
    }
}