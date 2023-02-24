const { ipcRenderer, Menu } = require('electron');
const AppMenu = require('./menu');
class HTMLFakeWindow {
    constructor(cssSource, appStyle = "hmf") {
        this.cssSource = cssSource;
        this.appStyle = appStyle;

        this._activeElements = [];

        this.headers = [];
        this.bodies = [];
        this.footers = [];
        this.singles = [];

        this.style = null;

        this._createStyle();
        this._createWindowElements();
    }

    _createStyle() {
        this.style = document.createElement('link');
        this.style.rel = "stylesheet";
        this.style.type = "text/css";
        this.style.href = this.cssSource;
        document.head.appendChild(this.style);
    }

    _createWindowActionButtons() {
        this.windowActionButtons = {
            close: document.createElement('button'),
            minimize: document.createElement('button'),
            maximize: document.createElement('button'),
            container: document.createElement('div')
        }
        const { close, minimize, maximize, container } = this.windowActionButtons;

        close.classList.add('close');
        minimize.classList.add('minimize');
        maximize.classList.add('maximize');

        container.classList.add('nav_control');
        this.headers[0].appendChild(container);

        close.innerText = `X`;
        minimize.innerText = `_`;
        maximize.innerText = `+`;

        container.appendChild(minimize);
        container.appendChild(maximize);
        container.appendChild(close);

        async function closeWindow() {
            const result = await ipcRenderer.invoke('win-close');
        }

        async function minimizeWindow() {
            const result = await ipcRenderer.invoke('win-minimize');
        }

        async function maximizeWindow() {
            const result = await ipcRenderer.invoke('win-maximize');
        }
        close.addEventListener('click', closeWindow);
        minimize.addEventListener('click', minimizeWindow);
        maximize.addEventListener('click', maximizeWindow);
    }

    /**
     * The following 4 creation functions include:
     * Double iife return to clean memory, apparently
     */
    _createHeader(_cssModification) {
        (() => {
            return (() => {
                const header = document.createElement('header');
                this._activeElements.push(header);
                this.headers.push(header);
                this.window.appendChild(header);
                _cssModification += `calc(calc(2em + var(--standard-padding)) + calc(var(--standard-padding) * 2)) `;
                this._createWindowActionButtons();
            })();
        })();
        return _cssModification;
    }

    _createMain(_cssModification) {
        (() => {
            return (() => {
                const main = document.createElement('main');
                this._activeElements.push(main);
                this.bodies.push(main);
                this.window.appendChild(main);
                _cssModification += `auto `;
            })();
        })();
        return _cssModification;
    }

    _createFooter(_cssModification) {
        (() => {
            return (() => {
                const footer = document.createElement('footer');
                this._activeElements.push(footer);
                this.footers.push(footer);
                this.window.appendChild(footer);
                _cssModification += `calc(1em + calc(var(--standard-padding) * 2)) `;
            })();
        })();
        return _cssModification;
    }

    _createSingle(_cssModification) {
        (() => {
            return (() => {
                const single = document.createElement('div');
                this._activeElements.push(single);
                this.singles.push(single);
                this.window.appendChild(single);
                _cssModification += `calc(1em + calc(var(--standard-padding) * 2)) `;
            })();
        })();
        return _cssModification;
    }

    _createWindowElements() {
        this.window = document.createElement('window');
        var _cssModification = "";

        /** $ [ 
         * Split the appStyle characters and apply actual dom elements based on those
        ] */
        this.appStyle.split('').map(e => {
            switch (e) {
                case 'h':
                    _cssModification = this._createHeader(_cssModification);
                    break;
                case 'm':
                    _cssModification = this._createMain(_cssModification);
                    break;

                case 'f':
                    _cssModification = this._createFooter(_cssModification);
                    break;

                case 's':
                    _cssModification = this._createSingle(_cssModification);
                    break;
            }
        });
        this.window.style = `grid-template-rows: ${_cssModification}`;
    }

    reloadCss() {
        this._createStyle();
    }

    appendWindow(where = document.body) {
        where.appendChild(this.window);
    }

    setTitle(title) {
        this._title = document.createElement('p');
        this._title.classList.add('title');
        this._title.innerText = title;
        this.headers.map(h => {
            h.appendChild(this._title);
        })
    }

    setMenu(menu) {
        this.menu = new AppMenu(menu, this);
    }
}

module.exports = HTMLFakeWindow;