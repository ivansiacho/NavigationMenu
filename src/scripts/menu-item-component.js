import BaseComponent from './commons/base-component';

export default class MenuItem extends BaseComponent {
    constructor(props) {
        super();
        const { 
            item,
            wrapper,
            openMenuItem
        } = props;

        this.setState({
            item,
            wrapper
        });

        this.openMenuItem = openMenuItem;
    }

    onClick(event) {
        event.preventDefault();

        if (this.openMenuItem) {
            this.openMenuItem(this.state.item, event.target);
        }
    }

    render() {
        const { item, wrapper } = this.state;
        const hasChildren = !!item.items.length;

        const template = `
            <li>
                <a 
                    href="${item.url}"
                    class="main-header__menu__wrapper__nav-item ${hasChildren ? 'main-header__menu__wrapper__nav-item--has-children' : ''} ${item.opened && hasChildren ? 'main-header__menu__wrapper__nav-item--active main-header__menu__wrapper__nav-item--rotate' : ''}">
                    ${item.label}
                </a>            
                ${hasChildren ? `
                    <ul class="main-header__menu__wrapper__sub-nav">
                        ${item.items.map((subItem) => {
                            return `
                                <li>
                                    <a href="${subItem.url}" class="main-header__menu__wrapper__sub-nav-item">${subItem.label}</a>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                ` : ''}
            </li>
        `;

        const element = this.convertTemplateToElement(template);

        // Add listeners
        element.addEventListener('click', (event) => this.onClick(event));

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