/**
 * Configuration manager
 * @constructor
*/
function Config () {
  var self = this
  this.config = {
    theme: 'default'
  }

  this.vuePopup = new App.Vue({
    el: '.popup .config-pop',
    data: {
      themes: [
        {
          name: 'Default',
          value: 'default',
          state: true
        },
        {
          name: 'Monokai',
          value: 'monokai',
          state: false
        },
        {
          name: 'Giant Goldfish',
          value: 'giant_goldfish',
          state: false
        },
        {
          name: 'Lunik',
          value: 'lunik',
          state: false
        }
      ],
      config: self.config
    }
  })

  this.vueTheme = new App.Vue({
    el: 'link.theme',
    data: {
      config: self.vuePopup.$data.config
    }
  })

  this.setConfig(App.Storage.readData('config'))

  $('.parameter .button').click(self.showConfig)
  $('.config-pop .submit').click(function(){ self.submit() })
}

Config.prototype.showConfig = function () {
  $.popupjs.init({
    pos: {
      x: null,
      y: '5%'
    },
    width: '50%',
    height: '90%',
    title: 'Configuration',
    html: $('.popup .config-pop'),
    closeBut: true
  })
  $.popupjs.draw()
}

/**
 * Submit config form.
*/
Config.prototype.submit = function () {
  var config = {}
  config.theme = $('.popupContainer .config-pop .theme').val()
  console.log(config)
  this.setConfig(config)
  $.popupjs.remove()
}

/**
 * Set config and save it.
 * @param {object} config - Configuration.
*/
Config.prototype.setConfig = function (config) {
  if (config) {
    for (var key in config) {
      this.config[key] = config[key]
    }
    App.Storage.storeData('config', this.config)
  }
}
App.Config = new Config()