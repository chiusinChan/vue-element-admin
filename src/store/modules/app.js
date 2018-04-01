import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    language: Cookies.get('language') || 'cn',
    fortunevalleystore_token: '',
    http: {
      //  测试
      urlHead: 'http://112.74.125.179/fortunevalleystore/',
      // urlHead: 'http://back.fortunevalleystore.com/fortunevalleystore/',

      login: '/background/admin/login',
      initMethod: '/background/product/initMethod',// 获取汇率
      updateOrAddProduct: '/background/product/updateOrAddProduct',// 新增或者编辑商品
      getProductList: '/background/product/getProductList',// 商品列表
      delProduct: '/background/product/delProduct',// 删除商品
    }

  },
  mutations: {
    setToken(state, token) {
      state.fortunevalleystore_token = token ;
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  actions: {
    toggleSideBar({commit}) {
      commit('TOGGLE_SIDEBAR')
    },
    setLanguage({commit}, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
