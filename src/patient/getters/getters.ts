import { GetterTree } from 'vuex';
import { PatientsState, RootState } from '../state';
import { Patient } from '@/types/patient';

export const getters: GetterTree<PatientsState, RootState> = {
  patientsList(state): Patient[] {
    const { loadedPatients } = state;

    if (!loadedPatients) {
      return [];
    }

    return Object.values(loadedPatients).sort((a: Patient, b: Patient) =>
      `${a.LastName}, ${a.FirstName}`.localeCompare(`${b.LastName}, ${b.FirstName}`)
    );
  },

  editMode(state): boolean {
    return state.editMode === true;
  },

  selectedPatient(state): Patient | undefined {
    if (!state.selectedPatientId || !state.loadedPatients) {
      return undefined;
    }

    return state.loadedPatients[state.selectedPatientId];
  },

  selectedPatientId(state): string | undefined {
    if (!state.selectedPatientId || !state.loadedPatients) {
      return undefined;
    }
    return state.selectedPatientId;
  },

  selectedPatientName(state): string {
    if (!state.selectedPatientId || !state.loadedPatients) {
      return '';
    }

    const selectedPatient = state.loadedPatients[state.selectedPatientId];

    if (!selectedPatient) {
      return '';
    }

    return `${selectedPatient.LastName}, ${selectedPatient.FirstName}`;
  },
};
