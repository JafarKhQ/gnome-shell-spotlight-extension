
// extension root object
const Me = imports.misc.extensionUtils.getCurrentExtension();

// aliases for used modules
const St = imports.gi.St;
const Lang = imports.lang;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const PanelMenu = imports.ui.panelMenu;

const SpotlightIndicator = Lang.Class({
	Name: 'SpotlightIndicator',
	Extends: PanelMenu.Button,
	
	_init: function() {
		this.parent(0.0, 'SpotlightIndicator');
		
		this.actor.add_actor(new St.Icon({
			 icon_name: 'system-search',
			 style_class: 'popup-menu-icon'
		}));
	}
	
	/*
	destroy: function () {
		// Call parent ??
        this.parent();
    }
    */
});


/*
* Extension definition.
*/

let spotlightIndicator;

function Extension() {
    this._init();
}

Extension.prototype = {
	_init: function() {
		this._indicator = null;
		this._settings = Convenience.getSettings();
        this._traymanager = _compat.getTrayManager();
        this._statusArea = Main.panel.statusArea;
	},
	
	enable: function() {
		this._indicator = new SpotlightIndicator();
		Main.panel.addToStatusArea("SpotlightIndicator", this._indicator);
	},
	
	/**
	* Clean-up:
	* - destroy indicator
	*/
	disable: function() {
		
		// destroy extension indicator
		this._indicator.destroy();
        this._indicator = null;
	}
};


/**
* Entry point.
*
* Should return an object with callable `enable` and `disable` properties.
*/
function init() {
	return new Extension();
}
