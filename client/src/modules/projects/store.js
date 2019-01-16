import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

const FETCH_PROJECTS = 'FETCH_PROJECTS';
const FETCH_PROJECTS_OWNED = 'FETCH_PROJECTS_OWNED';
const FETCH_PROJECTS_ASSIGNED = 'FETCH_PROJECTS_ASSIGNED';
const SET_CURRENT_PROJECT_BY_ID = 'SET_CURRENT_PROJECT_BY_ID';
const SET_CURRENT_OWNED_PROJECT_BY_ID = 'SET_CURRENT_OWNED_PROJECT_BY_ID';
const SET_CURRENT_ASSIGNED_PROJECT_BY_ID = 'SET_CURRENT_ASSIGNED_PROJECT_BY_ID';
const INIT_NEW_PROJECT = 'INIT_NEW_PROJECT';
const SET_NEW_PROJECT_INFO = 'SET_NEW_PROJECT_INFO';
const UPDATE_PROJECT = 'UPDATE_PROJECT';

const state = () => {
  return {
    projects: {
      list: [],
      ownedList: [],
      assignedList: []
    },
    currentProject: {},
    ownerId: null,
    newProject: {
      status: 'NEW',
      description: '',
      category: null,
      subcategory: null,
      frontend: {},
      aboutyou: {},
      aboutcompany: {},
      assignee: {}
    }
  };
};
const getters = {
  projects: state => {
    return state.projects.list;
  },
  ownedProjects: state => {
    return state.projects.ownedList;
  },
  assignedProjects: state => {
    return state.projects.assignedList;
  },
  currentProject: state => {
    return state.currentProject;
  },
  newProject: state => {
    return state.newProject;
  }
};
const actions = {
  async fetchProjects({commit}) {
    let docs = await Vue.$api.get('projects');
    commit(FETCH_PROJECTS, docs);
  },
  async fetchProjectsByOwnerId({commit}, { ownerId }) {
    let docs = await Vue.$api.get('/projects', {
      params: {
        ownerId
      }
    });
    commit(FETCH_PROJECTS_OWNED, docs);
  },
  setCurrentProjectById({commit}, projectId) {
    commit(SET_CURRENT_PROJECT_BY_ID, projectId);
  },
  setCurrentOwnedProjectById({commit}, projectId) {
    commit(SET_CURRENT_OWNED_PROJECT_BY_ID, projectId);
  },
  setCurrentAssignedProjectById({commit}, projectId) {
    commit(SET_CURRENT_ASSIGNED_PROJECT_BY_ID, projectId);
  },
  initNewProject({commit}, { category, subcategory, ownerId }) {
    commit(INIT_NEW_PROJECT, { category, subcategory, ownerId });
  },
  setNewProjectInfo({commit}, data) {
    commit(SET_NEW_PROJECT_INFO, data);
  },
  async fetchProjectsByAssigneeId({commit}, { assigneeId }) {
    let docs = await Vue.$api.get('/projects', {
      params: {
        'assignee.userId': assigneeId
      }
    });
    commit(FETCH_PROJECTS_ASSIGNED, docs);
  },
  updateProject({commit}, project) {
    commit(UPDATE_PROJECT, { project, list: 'list'});
    commit(UPDATE_PROJECT, { project, list: 'ownedList'});
    commit(UPDATE_PROJECT, { project, list: 'assignedList'});
  },
  async validateClearupFreelancer({dispatch}, project) {
    let validationClient = _.get(project, 'clearup.validation.client', false);
    if(validationClient === true) {
      project = await Vue.$api.put('/projects/'+project._id, {
        'clearup.validation.freelancer': true,
        'status': 'OPEN'
      });
      dispatch('updateProject', project);
    }
  },
  async validateClearupClient({dispatch}, project) {
    project = await Vue.$api.put('/projects/'+project._id, {
      'clearup.validation.client': true
    });
    dispatch('updateProject', project);
  },
  async acceptProject({dispatch}, project) {
    project = await Vue.$api.put('/projects/'+project._id, {
      'status': 'CLEARUP',
      'clearup.validation.client': false,
      'clearup.validation.freelancer': false
    });
    dispatch('updateProject', project);
  },
  async rejectProject({dispatch}, project) {
    project = await Vue.$api.put('/projects/'+project._id, {
      'status': 'REJECT'
    });
    dispatch('updateProject', project);
  },
  async reopenProject({dispatch}, project) {
    project = await Vue.$api.put('/projects/'+project._id, {
      'status': 'NEW'
    });
    dispatch('updateProject', project);
  },
  async closeProject({dispatch}, project) {
    project = await Vue.$api.put('/projects/'+project._id, {
      'status': 'CLOSED'
    });
    dispatch('updateProject', project);
  }
};
const mutations = {
  [FETCH_PROJECTS] (state, payload) {
    state.projects.list = payload;
  },
  [FETCH_PROJECTS_OWNED] (state, payload) {
    state.projects.ownedList = payload;
  },
  [SET_CURRENT_PROJECT_BY_ID] (state, payload) {
    if(_.isEmpty(state.projects.list)) {
      return false;
    }
    state.currentProject = state.projects.list.find((x) => {
      return x._id === payload;
    });
  },
  [SET_CURRENT_OWNED_PROJECT_BY_ID] (state, payload) {
    if(_.isEmpty(state.projects.ownedList)) {
      return false;
    }
    state.currentProject = state.projects.ownedList.find((x) => {
      return x._id === payload;
    });
  },
  [SET_CURRENT_ASSIGNED_PROJECT_BY_ID] (state, payload) {
    if(_.isEmpty(state.projects.assignedList)) {
      return false;
    }
    state.currentProject = state.projects.assignedList.find((x) => {
      return x._id === payload;
    });
  },
  [INIT_NEW_PROJECT] (state, { category, subcategory, ownerId }) {
    Object.assign(state.newProject, {
      category,
      subcategory,
      ownerId
    });
  },
  [SET_NEW_PROJECT_INFO] (state, payload) {
    Object.assign(state.newProject, {
      ...payload
    });
  },
  [FETCH_PROJECTS_ASSIGNED] (state, payload) {
    state.projects.assignedList = payload;
  },
  [UPDATE_PROJECT] (state, { project, list }) {
    let projects = state.projects[list];
    if(_.isEmpty(projects)) {
      return false;
    }

    let index = projects.findIndex((x) => {
      return x._id === project._id;
    });

    if(index > -1) {
      Object.assign(projects[index], project);
    }

  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
