<template>
  <section class="container">
    <div id="box">
      <Actor v-for="item in actors" :key="item.id" 
        :maxHp="item.maxHp" 
        :hp="item.hp" 
        :x ="item.x" 
        :y ="item.y">
      </Actor>
    </div>

<!-- 道をmapから生成しようと思ったけど微妙そうだったのでやめた痕跡
    <div v-for="(horizontalItem, horizontalIndex) in map" :key="'Load'+horizontalIndex">
      <div v-for="(verticalItem, verticalIndex) in horizontalItem" :key="verticalIndex">
        <h1>{{verticalItem}}</h1>
      </div>
    </div>
-->

    <button @click="spawn">spawnActor</button>
  </section>
</template>

<script>
  import {mapState} from 'vuex';
  import { v4 as uuidv4 } from 'uuid'


  import Actor from './actor.vue';

  export default {
    data() {
      return {
        content: '',
        find_state: '',
        find_flg: false
      }
    },
    computed: {
      ...mapState(['actors']),
      ...mapState(['map']),
    },
    mounted () {
      // thisがsetInterval内だと狂う(詳しくは知らん)ため、無理やり変数に格納する。参考→https://mi2log.hatenablog.jp/entry/20141206/1417856996
      const self=this;

      setInterval(function () {
        // ...間違ってるのはわかってる(index)。
        let index = 0;
        self.$store.getters.getActors.forEach(actor => {
          if(actor.whichSide === 'left'){
            const posId = self.$store.getters.getPosId({x:actor.x+1, y:actor.y});
            if(posId === ''){
              self.$store.commit('moveActor', {
                actorNumb : index,
                addX : 1, 
                addY : 0
              });
            }
          }
          index++;
        })
      }, 1000)
    },
    methods: {
      spawn() {
        this.$store.commit('spawnActor', {uuid:uuidv4(),actorName:'henohenomoheji',x:0,y:0,whichSide:'left'});
      }
    },
    components: {
        Actor
    }
  }
</script>
<style lang="scss">
  #box{
    width: 1000px;
    height: 300px;
  }
</style>