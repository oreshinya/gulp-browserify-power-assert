var Vue = require('vue'),
    vueTouch = require('vue-touch');

Vue.use(vueTouch);

window.addEventListener('load', function(){
  new Vue({
    el: '#app',
    data: {
      currentView: 'start',
      params: {}
    },
    methods: {
      route: function(componentName, params) {
        this.params = params;
        this.currentView = componentName;
      }
    }
  });
});
