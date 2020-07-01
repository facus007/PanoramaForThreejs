<template>
  <preview/>
</template>

<script>
import settings from "@/settings"

export default {
  components:{ preview: ()=>import(/* webpackChunkName: "chunk-preview" */ '@/views/preview') },
  data(){return {loaded:false}},
  created: _ => document.title = '',
  destroyed: _ => document.title = settings.title
}

</script>
