# Window Menu Module
## Type: Class
A menu class that's compatible with electrons menu style... sorta

<hr>

## INTERNAL FUNCTIONS

### <center>Constructor</center>
The constructor class applies several internal variables:

 * `_elements` <hr>
    Internal object container. Holds the DIV's n stuff.

 * `_active` <hr>
    A variable to determine if the menu has been dropped down or not.

 * `_focus` <hr>
    True if you're currently hovering over a dropped down menu.

 * `_keypressCombo` <hr>
    Used for detecting key combinations for the menu.

 * `_hotkeyCombos` <hr>
    Used to trigger the menu items if combined keys are pressed.

 * `source  ` <hr>
   The menu source data

 * `parent` <hr>
   The parent
   
<hr>

### <center>_create Function</center>
An internal function that creates the core elements and applies it to the parents first header.
Calls `_createContainer` and `_createMenuItems`.
