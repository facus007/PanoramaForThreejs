<template>
  <div class="dashboard-container">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    position: absolute;
    margin: auto;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  &-container *{
    margin: auto;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.card{
  &-body {
    padding: 15px;
    display: flex;
    justify-content: center;
  }
}
</style>
