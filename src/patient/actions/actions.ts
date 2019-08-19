import { ActionTree } from 'vuex';
import axios from 'axios';
import { PatientsState, RootState } from '../state';
import { Patient } from '@/types/patient';

export interface UpdatePatientRequest {
  temperature?: number;
  pulse?: number;
  successCallback: CallableFunction;
  failureCallback: CallableFunction;
  patientId: string;
}

function convertData(jsonInput: { [key: string]: any }): { [key: string]: Patient } {
  const result: { [key: string]: Patient } = {};

  jsonInput.forEach((element: { [key: string]: any }) => {
    result[element._id] = element as Patient;
  });

  return result;
}

export const actions: ActionTree<PatientsState, RootState> = {
  async fetchData({ commit }): Promise<any> {
    const patientsResults = await axios.get('http://localhost:3000/api/patients');

    const convertedResults = convertData(patientsResults.data);

    commit('beginLoadingPatients');
    commit('patientsLoaded', convertedResults);
  },

  async updatePatient({ commit }, request: UpdatePatientRequest): Promise<any> {
    if (!request.temperature && !request.pulse) {
      return false;
    }

    const params: { [key: string]: number } = {};

    if (request.temperature) {
      params['Temperature'] = request.temperature;
    }
    if (request.pulse) {
      params['Pulse'] = request.pulse;
    }

    await axios
      .post(`http://localhost:3000/api/patient/${request.patientId}/temperatureAndPulse`, params)
      .then(result => {
        if (result.status !== 200) {
          return false;
        }
        commit('updatePatient', result.data);
        commit('setEditMode', false);

        return true;
      })
      .then(result => {
        if (result) {
          request.successCallback();
        } else {
          request.failureCallback('Failed to update patient');
        }
      });

    return true;
  },
  selectPatient({ commit }, patientId: string): any {
    commit('setEditMode', false);
    commit('selectPatient', patientId);
  },
  activateEditMode({ commit }) {
    commit('setEditMode', true);
  },
  cancelEditMode({ commit }) {
    commit('setEditMode', false);
  },
};
