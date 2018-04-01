import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
// import './mock' // simulation data
import axios from 'axios';

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.formAxios = function (url, data) {
  url = this.$store.state.app.http.urlHead + url
  return axios.post(url, data, {
    headers: {'Content-Type': 'mutilpart/form-data charset=UTF-8'}
  });
};
Vue.prototype.lcookie = {
  setCookies: function (name, value, days) {
    //获取一级域名
    function getCookieDomain() {
      var host = location.hostname;
      var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
      if (ip.test(host) === true || host === "localhost") return host;
      var regex = /([^]*).*/;
      var match = host.match(regex);
      if (typeof match !== "undefined" && null !== match) host = match[1];
      if (typeof host !== "undefined" && null !== host) {
        var strAry = host.split(".");
        if (strAry.length > 1) {
          host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
        }
      }
      return "." + host;
    }

    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    window.document.cookie =
      name +
      "=" +
      value +
      ";expires=" +
      d.toGMTString() +
      ";domain=" +
      getCookieDomain() +
      ";path=/";
  },
  getCookies: function (name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  },
  removeCookies: function (name) {
    this.setCookies(name, "", -1);
  }
};

Vue.prototype.getAxios = function (url, data) {
  if (this.$store.state.app.fortunevalleystore_token == undefined) {
    this.$store.state.app.fortunevalleystore_token = this.lcookie.getCookies(
      "fortunevalleystore_token"
    );
  } else if (this.lcookie.getCookies("fortunevalleystore_token") != undefined) {
    this.$store.state.app.fortunevalleystore_token = this.lcookie.getCookies(
      "fortunevalleystore_token"
    );
  }
  url = this.$store.state.app.http.urlHead + url
  data.token = this.$store.state.app.fortunevalleystore_token;
  var qs = require('qs');
  return axios.get(url, {
    params: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  });
};

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
