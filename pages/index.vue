<template>
  <section class="container">
    <div id="box">
      <div v-for="item in actors" :key="item.id" class="actor">
        <meter :max ="item.maxHp" min="0" low="30" high="70" optimum="80" :value ="item.hp"></meter>
      </div>
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
        // ...間違ってるのはわかってる。
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
  }
</script>
<style lang="scss">
  #box{
    width: 1000px;
    height: 300px;
  }

  .actor{
    width: 50px;
	  height: 50px;
	  border-radius: 50%;
    background: skyblue;
    position: absolute;
    text-align: center;
    meter{
      width: 90%;
      transform: translate(0%,200%);
    }
  }
</style>