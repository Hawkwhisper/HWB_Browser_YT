
/**
 * Menu Module
 */
module.exports = class {
    constructor(source, parent) {
        this.source = source;
        this.parent = parent;

        this._elements = {};

        this._active = false;
        this._menuFocus = false;

        this._keypressCombo = {};
        this._keypressOrder = "";
        this._hotkeyCombos = [];

        this._create();
        window.addEventListener('click', (e) => {
            if (this._active && !this._menuFocus) {
                this._closeAll();
            }
        });

        window.addEventListener('keydown', e=>{
            const {key} = e;
            this._keypressCombo[key] = true;
            this._keypressOrder += `[${key.toUpperCase()}]`;
            this._hotkeyCombos.map(c=>{
                if(c.label==this._keypressOrder) {
                    c.action.call(this, ...arguments);
                }
            })
        });

        window.addEventListener('keyup', e=>{
            const {key} = e;
            this._keypressCombo[key] = false;
            var combinations = 0;
            for(let i in this._keypressCombo) {
                if(this._keypressCombo[i]) combinations++;
            }
            if(!combinations) {
                this._keypressOrder = "";
            }
        });

    }

    _closeAll() {
        setTimeout(() => {
            for (let i in this._elements) {
                if (this._elements[i]) this._elements[i].classList.remove('dropped');
            }
            this._active = false;
        }, 20);
    }

    _create() {
        this._createContainer();
        this._createMenuItems();
    }

    _createContainer() {
        const container = document.createElement('ul');
        container.classList.add('menu', 'container');

        this._elements["menu"] = container;
        this.parent.headers[0].appendChild(container);
    }

    _createMenuItems() {
        this.source.ary.map(s => {
            this._newMenuItem(s);
        })
    }

    _newMenuItem(item, parent) {
        const name = item.label || item.role;
        const type = item.type;
        const action = item.action;
        const accellerator = item.accelerator||"";
        const enabled = item.enabled??true;
        console.log(enabled);
        if(accellerator) {
            var accStr = "";
            accellerator.split('+').map(a=>{
                accStr+=`[${a}]`
            })
            this._hotkeyCombos.push({
                label: accStr,
                action
            });
        }
        var label;
        if (type == "separator") {
            label = document.createElement('hr');
        } else {
            label = document.createElement('li');
            label.classList.add('menu', 'label');
            if(item.submenu) label.classList.add('supersub');
            label.innerHTML = `<span class='label_left'>${name}</span><span class='label_right'>${accellerator}</span>`;
            label.id = `${Math.random()}`
            label.enabled = enabled;

            label.subElement = document.createElement('ul');
            label.subElement.classList.add('sub');
            if(!enabled) label.classList.add('disabled');

            label.appendChild(label.subElement);
            label.onclick = () => {
                if (action && enabled) action.call(this, ...arguments);
                setTimeout(() => {
                    if (!this._active) {
                        this._active = true
                        label.classList.add('dropped');
                    }
                }, 10);
            }

            label.subElement.onclick = () => {
                setTimeout(() => {
                    this._active = true;
                    Object.keys(this._elements).map(e => {
                        if (this._elements[e]) this._elements[e].classList.remove('dropped');
                    });
                    label.classList.add('dropped');
                }, 10);
            }

            label.subElement.onmouseover = () => {
                this._menuFocus = true;
            }

            label.subElement.onmouseout = () => {
                this._menuFocus = false;
            }

            label.onmouseover = () => {
                if (this._active == true) {
                    Object.keys(this._elements).map(e => {
                        if (this._elements[e]) this._elements[e].classList.remove('dropped');
                    });
                    label.classList.add('dropped');
                } else {
                    label.classList.remove('dropped');
                }
            }

            if (item.submenu) {
                item.submenu.map(s => {
                    this._newMenuItem(s, label.subElement);
                })
            }
        }
        this._elements[`label_${name}${item.id}`] = label;
        if (label) {
            if (!parent) {
                this._elements["menu"].appendChild(label);
            } else {
                parent.appendChild(label);
            }
        }
    }
}