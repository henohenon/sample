import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () =>({
      actorTemplates: 
      {
        henohenomoheji:{defaultHp:10.0,imagePath:''}
      },
      // 0が通れない、1が通れる。
      map: [[1,1,1,1,1]],
      actors:[
        // {id:'uuid' ,actorName:'henohenomoheji',whichSize:'left',hp:10.0,x:0,y:0}
      ]
    }),
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
        state.actors[obj.id].x += obj.addX;
        state.actors[obj.id].x += obj.addY;
      },
    }
  })
}


export default createStore;