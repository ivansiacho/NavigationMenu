import BaseComponent from './commons/base-component';

export default class MainContentComponent extends BaseComponent {
    constructor(props) {
        super();
        const { wrapper } = props;

        this.setState({ wrapper });
    }

    render() {
        const { wrapper } = this.state;

        const template = `
            <div>
                <div class="mask"></div>
                <div class="main-content__banner">
                    <div class="main-content__banner__image"></div>
                    <h1 class="main-content__banner__headline">
                        Get paid for giving a shit.
                    </h1>
                </div>
                <div class="main-content__content">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        `;

        const element = this.convertTemplateToElement(template);

        // check if domElement already exist 
        if (!this.element) {
            // if doesn't exist create it
            this.element = element;
            wrapper.appendChild(element);
        } else {
            // if exist replace them
            wrapper.replaceChild(element, this.element);
            this.element = element;
        }
    }
}
