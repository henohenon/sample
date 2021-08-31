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

    <button id="leftSpawn"  @click="spawn('left')">spawnActorL</button>
    <button id="rightSpawn" @click="spawn('right')">spawnActorR</button>
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
          let addX = 1;
          if(actor.whichSide === 'right'){
            addX=-1;
          }
          const posId = self.$store.getters.getPosId({x:actor.x+addX, y:actor.y});
          if(posId === ''){
            self.$store.commit('moveActor', {
              actorNumb : index,
              addX,
              addY : 0
            });
          }
          index++;
        })
      }, 1000)
    },
    methods: {
      spawn(whichSide) {
        let x = 0;
        if(whichSide === 'right'){
          x = 4
        }
        this.$store.commit('spawnActor', {uuid:uuidv4(),actorName:'henohenomoheji', x, y:0, whichSide});
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