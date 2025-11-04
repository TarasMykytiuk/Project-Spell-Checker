export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    async init() {
        console.log("View: " + typeof (this.view) + ", Model: " + typeof (this.model));
        console.log(await this.model.getDictionarySize());
    }
}