<template>
  <audio :src="link" :autoplay="true" loop controls/>
</template>
<script>
export default {
  computed:{
    link(){
      return this.$route.query.link
    }
  }
}
</script>
