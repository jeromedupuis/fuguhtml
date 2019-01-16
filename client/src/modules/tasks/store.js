import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
Vue.use(Vuex);

const FETCH_TASKS = 'FETCH_TASKS';
const FETCH_ONE_TASK = 'FETCH_ONE_TASK';

// const state = () => {
//   return {
//     tasks: [
//       {
//         id: 1,
//         tracker: 'Task',
//         function: 'Homepage',
//         category: 'Dev',
//         subject: 'Task name 1',
//         status: 'New / Open',
//         progression: 0,
//         assignee: 'FUGU',
//         createdAt: '2018/10/10 10:00',
//         updatedAt: '2018/10/10 20:00',
//         startAt: '2018/10/06 10:00',
//         dueAt: '2018/10/07 10:00',
//         description: `<h3>Le passage de Lorem Ipsum standard, utilisé depuis 1500</h3><p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p><h3>Section 1.10.32 du "De Finibus Bonorum et Malorum" de Ciceron (45 av. J.-C.)</h3><p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciun</p>`,
//         commentFlg: true
//       }
//     ]
//   };
// };

const state = () => {
  return {
    tasks: []
  };
};

const getters = {
  projectTask: state => {
    return task_id => {
      return state.tasks.find((doc) => {
        return doc.id == task_id;
      });
    };
  },
  projectTasks: state => {
    return state.tasks;
  },
  projectTaskLength: state => {
    return state.tasks.length;
  }
};
const actions = {
  async fetchTasks({commit}, params) {
    let docs = await Vue.$api.get('tasks', {
      projectId: params.projectId
    });

    commit(FETCH_TASKS, docs);
  },
  async fetchOneTask({commit}, params) {
    let doc = await Vue.$api.get('tasks/'+params.id, {
      projectId: params.projectId
    });

    if (_.isEmpty(doc)) {
      commit(FETCH_ONE_TASK, {});
    }
    else {
      commit(FETCH_ONE_TASK, doc);
    }
  }
};
const mutations = {
  [FETCH_TASKS] (state, payload) {
    state.tasks = payload;
  },
  [FETCH_ONE_TASK] (state, payload) {
    let index = _.indexOf(state.tasks, (doc) => {
      return doc.id === payload.id;
    });

    if(index == -1) {
      state.tasks.push(payload);
    } else {
      Object.assign(state.tasks[index], payload);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
