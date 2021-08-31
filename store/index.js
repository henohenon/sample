import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () =>({
      actorTemplates: 
      {
        henohenomoheji:{defaultHp:10.0,imagePath:''}
      },
      // actorがいれば、そのuuidが入る。getするときに[y][x]になっちゃうのがややっこしいところ。
      map: [['','','','','']],
      actors:[
        // {id:'uuid' ,actorName:'henohenomoheji',whichSize:'left',hp:10.0,x:0,y:0}
      ]
    }),
    getters: {
      getActors(state) {
        return state.actors;
      },
      getActor: (state) => (id) => {
        const tmp = state.actors.filter(e => e.id === id);
        console.log(id,tmp)
        if(tmp.length > 0){
          return tmp[0];
        }
        return null;
      },
      getActorNumb: (state,getters) => (id) => {
        const actor = getters.getActor(id);
        if(actor !== null){
          return state.actors.indexOf(actor);
        }
        return null;
      },
      getMap(state) {
        return state.map;
      },
      getPosId: (state) => (pos) => {
        return state.map[pos.y][pos.x];
      },
      getTemplate: (state) => (name) => {
        return state.actorTemplates[name];
      }
    },
    mutations: {
      // actor配置
      spawnActor(state,obj) {
        const template = state.actorTemplates[obj.actorName];
        state.actors.unshift({
          id : obj.uuid ,
          actorName : obj.actorName ,
          whichSide : obj.whichSide ,
          hp : template.defaultHp ,
          x  : obj.x , 
          y  : obj.y
        })
      },
      moveActor(state,obj) {
        console.log(obj);
        state.actors[obj.actorNumb].x += obj.addX;
        state.actors[obj.actorNumb].y += obj.addY;
      },
    }
  })
}



export default createStore;