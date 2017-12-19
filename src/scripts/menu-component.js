import BaseComponent from './commons/base-component';
import MenuItem from './menu-item-component';

export default class MenuComponent extends BaseComponent {
    constructor(props) {
        super();
        const { 
            data,
            wrapper,
            toggleMask,
            toggleNavMobile 
        } = props;

        this.setState({
            data,
            wrapper
        });

        this.toggleMask = toggleMask;
        this.toggleNavMobile = toggleNavMobile;
        this.isMobile = window.innerWidth <= 768;

        window.addEventListener('resize', (event) => {
            this.isMobile = window.innerWidth <= 768;
        });
    }

    openMenuItem(selectedItem, target) {
        const { data } = this.state;
        const newData = _.cloneDeep(data);

        newData.map((item) => {
            if (item.label === selectedItem.label && 
                !!item.items.length && !item.opened) {
                item.opened = true;
            } else {
                delete item.opened;
            }

            return item;
        });

        this.setState({ data: newData });
        
        if (!this.isMobile) {
            // if navItem has children show the mask
            this.toggleMask(_.find(newData, 'opened'));
        }

        // close mobile menu if a subnav item is clicked
        if (this.isMobile && target.classList.contains('main-header__menu__wrapper__sub-nav-item')) {
            this.toggleNavMobile();
        }

        // Check if mask is clicked for remove the opened subNav and hide the mask
        const maskHandler = (event) => {
            if (event.target.classList.contains('mask--show')) {
                const { data } = this.state;
                const newData = _.cloneDeep(data);

                newData.map((item) => {
                    if (item.opened) {
                        delete item.opened;
                    }
                });

                if (this.isMobile) {
                    this.toggleNavMobile();
                }

                this.toggleMask(false);
                this.setState({ data: newData });
                document.removeEventListener('click', maskHandler);
            }
        };

        document.addEventListener('click', maskHandler);
    }

    render() {
        const { data, wrapper } = this.state;

        const template = `
            <ul 
                class="main-header__menu__wrapper" 
                data-footer="© 2014 Huge. All Rights Reserved."></ul>
        `;

        const element = this.convertTemplateToElement(template);

        // render menuItem components
        data.map(item => {
            const menuItem = new MenuItem({
                item,
                wrapper: element,
                openMenuItem: this.openMenuItem.bind(this)
            });
        });

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
