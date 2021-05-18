import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputValue: 'something...',
    id: 5,
    viewKey: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    changeInputValue (state, value) {
      state.inputValue = value
    },
    addItem (state) {
      const obj = {
        id: state.id,
        info: this.state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.id++
      state.inputValue = ''
    },
    removeItemById (state, id) {
      // 根据Id返回索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引删除指定项
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    changeStatusById (state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    cleanDone (state) {
      state.list = state.list.filter(i => i.done === false)
    },
    setViewKey (state, viewKey) {
      state.viewKey = viewKey
    }
  },
  actions: {
    getList (context) {
      axios.get('./dataList.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneItems (state) {
      return state.list.filter(i => i.done === false).length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'unDone') {
        return state.list.filter(i => i.done === false)
      }
      if (state.viewKey === 'unDone') {
        return state.list.filter(i => i.done === true)
      }
      return state.list
    }
  },
  modules: {
  }
})
