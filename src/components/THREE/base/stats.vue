<script>
import { mapState } from 'vuex'
import THREEComponent from '@/components/THREE/base/threecomponent'
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
    this.obj.dom.style['z-index'] = '1'
    this.$el.appendChild(this.obj.dom)
    this.domElement && this.domElement.addEventListener('update', this.update)
  },
  beforeDestroy(){
    this.domElement && this.domElement.removeEventListener('update', this.update)
    this.obj.dom.remove()
    this.obj = null
  }
}
</script>
