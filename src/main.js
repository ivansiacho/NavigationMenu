import fetchData from './scripts/commons/api';
import { NAV_URL } from './scripts/commons/constants';
import MenuComponent from './scripts/menu-component';
import MainContentComponent from './scripts/main-content-component';
import NavbarMobileComponent from './scripts/navbar-mobile-component';
import style from './scss/main.scss';

class MainApp {
    constructor() {
        this.navbarMobileWrapper = document.querySelector('.main-header__navbar-mobile');
        this.menuWrapper = document.querySelector('.main-header__menu');
        this.mainContentWrapper = document.querySelector('.main-content');
        this.mobileLogo = document.querySelector('.main-header__huge-logo');
        this.render();
    }

    toggleMask(toggle) {
        if (!this.maskElement) {
            this.maskElement = document.querySelector('.mask');
        }
        
        if (toggle) {
            this.maskElement.classList.add('mask--show');
            document.body.style.overflow = 'hidden';
        } else {
            this.maskElement.classList.remove('mask--show');
            document.body.style.overflow = 'auto';
        }
    }

    toggleNavMobile() {
        if (!this.mobileNavOpen && !this.mobileNavClose) {
            this.mobileNavOpen = document.querySelector('.main-header__icon-open');
            this.mobileNavClose = document.querySelector('.main-header__icon-close');
        }

        if (this.menuWrapper.classList.contains('main-header__menu--open')) {
            this.menuWrapper.classList.remove('main-header__menu--open');
            this.mobileNavOpen.classList.remove('main-header__icon-open--hide');
            this.mobileNavClose.classList.add('main-header__icon-close--hide');
            this.mobileLogo.classList.remove('main-header__huge-logo--show');
            this.toggleMask(false);
        } else {
            this.menuWrapper.classList.add('main-header__menu--open');
            this.mobileNavOpen.classList.add('main-header__icon-open--hide');
            this.mobileNavClose.classList.remove('main-header__icon-close--hide');
            this.mobileLogo.classList.add('main-header__huge-logo--show');
            this.toggleMask(true);
        }
    }

    render = async () => {
        const { items } = await fetchData(NAV_URL);
        // render navbar mobile component
        const navbar = new NavbarMobileComponent({
            wrapper: this.navbarMobileWrapper,
            toggleNavMobile: this.toggleNavMobile.bind(this)
        });
        // render menu component
        const menu = new MenuComponent({
            data: items, 
            wrapper: this.menuWrapper,
            toggleMask: this.toggleMask.bind(this),
            toggleNavMobile: this.toggleNavMobile.bind(this)
        });
        // render main-content component
        const mainContent = new MainContentComponent({
            wrapper: this.mainContentWrapper
        });
    }
}

new MainApp();