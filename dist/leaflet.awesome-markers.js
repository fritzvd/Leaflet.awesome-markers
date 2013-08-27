/*
  Leaflet.AwesomeMarkers, a plugin that adds colorful iconic markers for Leaflet, based on the Font Awesome icons
  (c) 2012-2013, Lennard Voogdt

  http://leafletjs.com
  https://github.com/lvoogdt
*/
(function (window, document, undefined) {
/*
 * Leaflet.AwesomeMarkers assumes that you have already included the Leaflet library.
 */

L.AwesomeMarkers = {};

L.AwesomeMarkers.version = '1.0';

L.AwesomeMarkers.Icon = L.Icon.extend({
  options: {
    iconSize: [35, 45], 
    iconAnchor:   [17, 42],
    popupAnchor: [1, -32],
    shadowAnchor: [3, 12],
    shadowSize: [36, 16],
    className: 'awesome-marker',
    icon: 'home',
    color: 'blue',
    iconColor: 'white',
    different_size: false,
    size_factor: 1
  },

  initialize: function (options) {
   if (options.different_size){
      options.className = 'awesome-marker awesome-marker-double';
      // everything is double size.
      options.size_factor = options.size_factor / 2;
      options.iconSize = [70 * options.size_factor, 
                          90 * options.size_factor];
      options.iconAnchor = [34 * options.size_factor, 
                            92 * options.size_factor];
      options.shadowAnchor = [17, 27];
      options.shadowSize = [72, 
                            32];
    }
    options = L.setOptions(this, options);
  },

  createIcon: function () {
    var div = document.createElement('div'),
        options = this.options;

    if (options.icon) {
      div.innerHTML = this._createInner();
    }

    if (options.bgPos) {
      div.style.backgroundPosition =
              (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
    }

    if (options.different_size) {
      div.style.backgroundSize =
              (options.size_factor * 720) + 'px ' + 
              (options.size_factor * 92) + 'px' ;
      positions = {
        red: '0 0',
        darkred: (options.size_factor * -360) + 'px 0',
        orange: (options.size_factor * -72) + 'px 0',
        green: (options.size_factor * -144) + 'px 0',
        darkgreen: (options.size_factor * -504) + 'px 0',
        blue: (options.size_factor * -216) + 'px 0',
        darkblue: (options.size_factor * -512) + 'px 0',
        purple: (options.size_factor * -288) + 'px 0',
        darkpurple: (options.size_factor * -576) + 'px 0',
        cadetblue: (options.size_factor * -648) + 'px 0'
      };
      div.style.backgroundPosition = positions[options.color];
      div.style.fontSize = (options.size_factor * 28) + 'px';
    }

    if (!options.different_size){
      this._setIconStyles(div, 'icon-' + options.color);
    } else {
      this._setIconStyles(div);
    }
    return div;
  },

  _createInner: function() {
    var iconClass;
    if(this.options.icon.slice(0,5)==="icon-"){
      iconClass=this.options.icon;
    }else{
      iconClass="icon-"+this.options.icon;
    }
    return "<i class='" + iconClass 
    + (this.options.spin ? " icon-spin" :"") 
    + (this.options.iconColor ? " icon-" + this.options.iconColor :"") + "'></i>";
  },

  _setIconStyles: function (img, name) {
    var options = this.options,
        size = L.point(options[name == 'shadow' ? 'shadowSize' : 'iconSize']),
        anchor;

    if (name === 'shadow') {
      anchor = L.point(options.shadowAnchor || options.iconAnchor);
    } else {
      anchor = L.point(options.iconAnchor);
    }

    if (!anchor && size) {
      anchor = size.divideBy(2, true);
    }

    if ((options.different_size) && (name == 'shadow')) {
      img.className = 'awesome-marker-' + name + '-double' +' ' + options.className;
    } else{
      img.className = 'awesome-marker-' + name + ' ' + options.className;
    }

    if (anchor) {
      img.style.marginLeft = (-anchor.x) + 'px';
      img.style.marginTop  = (-anchor.y) + 'px';
    }

    if (size) {
      img.style.width  = size.x + 'px';
      img.style.height = size.y + 'px';
    }
  },

  createShadow: function () {
    var div = document.createElement('div'),
        options = this.options;

    this._setIconStyles(div, 'shadow');
    return div;
  }
});
    
L.AwesomeMarkers.icon = function (options) {
  return new L.AwesomeMarkers.Icon(options);
};

}(this, document));



