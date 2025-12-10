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

    addToDict(word) {
        this.#dictionary.push(word);
    }

    removePunctuation(word) {
        const regex = new RegExp(`^[${this.#punctuation}]+|[${this.#punctuation}]+$`, 'g');
        return word.replace(regex, '');
    }

    checkWord(word) {
        if (word[0] !== word[0].toUpperCase()) {
            let parts = word.split("-");
            for (const part of parts) {
                if (!this.#dictionary.includes(this.removePunctuation(part))) { return false };
            }
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
}