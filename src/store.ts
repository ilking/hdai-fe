import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import { PatientsState, RootState } from './patient/state.js';
import { getters as patientGetters } from './patient/getters/getters';
import { actions as patientActions } from './patient/actions/actions';
import { mutations as patientMutations } from './patient/mutations/mutations';

Vue.use(Vuex);

export const patientState: PatientsState = {
  error: false,
  loadedPatients: {},
  selectedPatientId: '',
  editMode: false,
};

const namespaced: boolean = true;

export const patientStore: Module<PatientsState, RootState> = {
  namespaced,
  state: patientState,
  getters: patientGetters,
  actions: patientActions,
  mutations: patientMutations,
};

export default new Vuex.Store({
  modules: { patient: patientStore },
});
