<script>
import { mapState } from 'vuex'
import THREEComponent from '../base/threecomponent'
import Stats from 'three/examples/jsm/libs/stats.module.js'

export default {
  mixins: [THREEComponent],
  watch:{
    domElement(next, pre){
      pre && pre.removeEventListener('update', this.update)
      next && next.addEventListener('update', this.update)
    }
  },
  methods:{
    update(){
      this.obj && this.obj.update()
    }
  },
  mounted(){
    this.obj = new Stats()
    this.obj.dom.style.position = 'absolute'
    this.$el.appendChild(this.obj.dom)
  },
  beforeDestroy(){
    this.obj.dom.remove()
    this.obj = null
  }
}
</script>
