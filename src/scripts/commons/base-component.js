import * as _ from 'lodash';

export default class BaseComponent {
    constructor() {
        this._state = {};
        this._parser = new DOMParser();
    }

    get state() {
        return this._state;
    }

    set state(nextState) {
        const shouldUpdate = !_.isEqual(nextState, this._state);
        this._state = Object.freeze(nextState);

        if (shouldUpdate) {
            this.render();
        }
    }

    setState(nextState) {
        if (_.isObject(nextState)) {
            this.state = { ...this.state, ...nextState };
        }
    }

    convertTemplateToElement(template) {
        return this._parser.parseFromString(template, "text/html").body.firstChild;
    }

    render() {
        throw 'you need to implement render method in your component';
    }
}