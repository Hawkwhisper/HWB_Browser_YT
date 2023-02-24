const Modules = require('./js/modules');
const Main = new Modules.window(`./style.css`);
Main.appendWindow();
Main.setTitle(document.title);
Main.setMenu(require('../_menus/default/'));