# Window Module
## Type: Class
A window class that builds core U.I elements required for a functioning window.

<hr>

## INTERNAL FUNCTIONS

### <center>Constructor</center>
The constructor class applies several internal variables:
 
 * `_activeElements` <hr>
    This is the active element array, basically it contains a combination of the headers, mains, footers, and single-spaced elements you've created.
 
 * `_title` <hr>
    The title for the header.

 * `cssSource` <hr> CSS file

 * `appStyle` <hr> Application format (string),
 can be anything of the following:
    * "h" <hr> Header section
    <br>Contains the window title, navigation buttons for closing/minimizing, and a space for the menu.
    * "m" <hr> Main section
    <br> An automatically sized chunk of realestate.
    * "f" <hr> Footer section
    <br> A section for the footer.
    * "s" <hr> Single line section
    <br> A single-spaced section, can be used for w/e your heart desires.
    
    These can all be applied in any order, for example, "hmf"

 * `headers, bodies, footers and singles` <hr>
    These 4 variables (this.headers, this.bodies, this.footers, and this.singles) are responsible for housing the activeElements in a slightly more organized manor. 

 * `style` <hr>
    DOM element (link type), for containing CSS.

 * `windowActionButtons` <hr>
    An object containing 4 dom elements, consisting of 3 buttons:

     * close
     * minimize
     * maximize
    
    and one div:
     * container
    
 * `window` <hr>
    a unique HTML Dom element, a < window >...< /window > tag

 * `menu` <hr>
   The current menu.
    

<hr>

### <center>_createStyle Function</center>
An internal function that sets an internal variable called 'this.style', which will house a dom element containing a link to the CSS file.

<hr>

### <center>_createWindowActionButtons Function</center>
This creates the buttons for closing, minimizing and maximizing, and applies the proper functionality. Only the first header section will contain these elements.

<hr>

### <center>_createHeader Function</center>
Internal function that creates a header element. Called during the creation process.

<hr>

### <center>_createMain Function</center>
Internal function that creates a main element. Called during the creation process.

<hr>

### <center>_createFooter Function</center>
Internal function that creates a footer element. Called during the creation process.

<hr>

### <center>_createSingle Function</center>
Internal function that creates a single-line element. Called during the creation process.

<hr>

### <center>_createWindowElements Function</center>
Internal function that calls the previous 4 functions.
<hr>

## EXTERNAL FUNCTIONS

### <center>reloadCss Function</center>
Reloads the CSS contents.
<hr>

### <center>appendWindow
    Arguments: where [type: HTMLDomElement]
</center>
Appends the main window to argument.
<hr>

### <center>setTitle
    Arguments: title [type: string]
</center>
Sets the title for the header.
<hr>

### <center>setMenu
    Arguments: menu [type: class]
</center>
Sets the menu (e.g, file, edit, view, etc).

EXAMPLE:

> index.html
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SomeTitleHere</title>
    <script src="index.js" defer></script>
</head>

<body>

</body>

</html>
```

> index.js
```js
const Modules = require('./js/modules');
const Main = new Modules.window(`./style.css`);
Main.appendWindow();
Main.setTitle(document.title);
Main.setMenu(require('../_menus/default/'));
```