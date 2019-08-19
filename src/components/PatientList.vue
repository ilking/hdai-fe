<template>
  <b-list-group class="mt-3">
    <b-list-group-item
      v-for="patient in patientsList"
      :id="patient._id"
      :key="patient._id"
      :active="patient._id === selectedPatientId"
      @click="setActive(patient._id)"
      :disabled="editMode"
    >{{patient.LastName}}, {{patient.FirstName}}</b-list-group-item>
  </b-list-group>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter } from 'vuex-class';
import Component from 'vue-class-component';
import { PatientsState } from '@/patient/state';
import { Patient } from '@/types/patient';

const namespace: string = 'patient';

@Component
export default class PatientList extends Vue {
  @State('state', { namespace }) patients!: PatientsState;
  @Action('selectPatient', { namespace }) selectPatient: any;
  @Getter('patientsList', { namespace }) patientsList!: Patient[];
  @Getter('selectedPatientId', { namespace }) selectedPatientId!: string;
  @Getter('editMode', { namespace }) editMode!: boolean;

  setActive(patientId: string) {
    this.selectPatient(patientId);
  }
}
</script>
