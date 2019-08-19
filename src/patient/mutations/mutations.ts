import { MutationTree } from 'vuex';
import { PatientsState } from '../state';
import { Patient } from '@/types/patient';

export const mutations: MutationTree<PatientsState> = {
  patientsLoaded(state, payload: { [key: string]: Patient }) {
    state.error = false;
    state.loadedPatients = payload;
  },

  beginLoadingPatients(state) {
    state.error = false;
    state.loadedPatients = {};
  },

  patientsError(state) {
    state.error = true;
    state.loadedPatients = {};
  },

  selectPatient(state, patientId: string) {
    state.selectedPatientId = patientId;
  },

  setEditMode(state, editMode: boolean) {
    state.editMode = editMode;
  },

  updatePatient(state, updatedPatient) {
    if (!state.loadedPatients) {
      state.loadedPatients = {};
    }
    state.loadedPatients[updatedPatient._id] = updatedPatient;
  },
};
