export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.elements.submitBtn.addEventListener("click", (event) => {
            event.preventDefault();
            this.handleFormSubmit();
        });
    }

    handleFormSubmit() {
        console.log("Form submit triggered!");
    }
}