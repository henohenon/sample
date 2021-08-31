<template>
  <section class="container">
    <div v-for="item in actors" :key="item.id">
      <h1>{{item.actorName}}</h1>
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
    methods: {
      spawn() {
        this.$store.commit('spawnActor', {uuid:uuidv4(),actorName:'henohenomoheji',x:1,y:1,whichSide:'left'});
      }
    },
  }
</script>