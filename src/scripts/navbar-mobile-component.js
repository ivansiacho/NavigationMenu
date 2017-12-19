import BaseComponent from './commons/base-component';

export default class NavbarMobileComponent extends BaseComponent {
    constructor(props) {
        super();
        const { 
            wrapper,
            toggleNavMobile 
        } = props;

        this.setState({ wrapper });
        this.toggleNavMobile = toggleNavMobile;
    }

    onClick() {
        if (this.toggleNavMobile) {
            this.toggleNavMobile();
        }
    }

    render() {
        const { wrapper } = this.state;

        const template = `
            <div>
                <div class="main-header__icon-open">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="72px" height="72px" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
                    <g>
                        <rect x="24" y="26" fill="#FFFFFF" width="24" height="4"/>
                        <rect x="24" y="34" fill="#FFFFFF" width="24" height="4"/>
                        <rect x="24" y="42" fill="#FFFFFF" width="24" height="4"/>
                    </g>
                    </svg>
                </div>
                <div class="main-header__icon-close main-header__icon-close--hide">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="72px" height="72px" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
                    <polygon fill="#FFFFFF" points="38.854,35.977 45.9,28.929 43.071,26.1 35.975,33.196 28.758,26.227 25.979,29.104 33.146,36.025 
                        26.101,43.07 28.93,45.899 36.024,38.805 43.243,45.775 46.021,42.898 "/>
                    </svg>
                </div>
            </div>
        `;

        const element = this.convertTemplateToElement(template);

        const mobileNavOpen = element.querySelector('.main-header__icon-open');
        const mobileNavClose = element.querySelector('.main-header__icon-close');

        // Add listeners
        mobileNavOpen.addEventListener('click', () => this.onClick());
        mobileNavClose.addEventListener('click', () => this.onClick());

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
