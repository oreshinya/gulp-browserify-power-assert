var Vue = require('vue');

Vue.component('start', {
  template: require('./../views/start.html'),
  methods: {
    startApp: function() {
      alert('start app!');
    }
  }
});
