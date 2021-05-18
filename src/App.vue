<template>
  <div id="app">
    <a-input :value = inputValue @change="handlerInputChange" placeholder="请输入任务" class="my_ipt" />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change=" (e) => {statusChanged(e, item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{ unDoneItems }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type=" viewKey === 'all' ? 'primary':'default' " @click="changeViewKey('all')">全部</a-button>
          <a-button :type=" viewKey === 'unDone' ? 'primary':'default' " @click="changeViewKey('unDone')">未完成</a-button>
          <a-button :type=" viewKey === 'Done' ? 'primary':'default' " @click="changeViewKey('Done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneItems', 'infoList'])
  },
  methods: {
    // 监听文本输入框的值的变化
    handlerInputChange (e) {
      this.$store.commit('changeInputValue', e.target.value)
    },
    // 设置添加item到list的函数
    addItemToList () {
      if (this.$store.state.inputValue.trim().length <= 0) {
        this.$message.warning('您输入的内容无效！')
      } else {
        this.$store.commit('addItem')
      }
    },
    removeItemById (id) {
      console.log(id)
      this.$store.commit('removeItemById', id)
    },
    statusChanged (e, id) {
      console.log(e)
      const param = {
        id: id,
        status: e.target.checked
      }
      this.$store.commit('changeStatusById', param)
    },
    // 清除已经完成的item
    clean () {
      this.$store.commit('cleanDone')
    },
    // 点击按钮，切换高亮
    changeViewKey (viewKey) {
      this.$store.commit('setViewKey', viewKey)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
