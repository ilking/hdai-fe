<template>
  <div v-if="selectedPatient">
    <b-table-simple>
      <b-row>
        <b-col>
          <h4 class="mt-3">Patient Info</h4>
        </b-col>
        <b-col v-if="!editMode">
          <b-button class="mt-3" size="sm" variant="outline-primary" @click="openEditMode">Edit</b-button>
        </b-col>
      </b-row>
    </b-table-simple>
    <b-table-simple bordered small fixed>
      <b-tr>
        <b-th>Pulse:</b-th>
        <b-td>
          <span class="mr-auto" v-if="selectedPatient.Pulse">{{ selectedPatient.Pulse }}</span>
        </b-td>
      </b-tr>
      <b-tr>
        <b-th>Temperature:</b-th>
        <b-td>
          <span class="mr-auto" v-if="selectedPatient.Temperature">{{ selectedPatient.Temperature }}</span>
        </b-td>
      </b-tr>
    </b-table-simple>

    <div class="mb-5" v-if="editMode">
      <b-form inline @submit="onSubmit" @reset="onReset">
        <label class="sr-only" for="input-pulse">Pulse in BPM</label>
        <b-input-group append="BPM" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input v-model="form.pulse" id="input-pulse"></b-input>
        </b-input-group>

        <label class="sr-only" for="input-temperature">Temperature deg F</label>
        <b-input-group append="F" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input v-model="form.temperature" id="input-temperature"></b-input>
        </b-input-group>

        <b-button size="sm" variant="outline-success" type="submit">Save</b-button>
        <b-button class="ml-3" size="sm" variant="outline-secondary" type="reset">Cancel</b-button>
      </b-form>
    </div>

    <div v-if="selectedPatient.Medications.length > 0">
      <h4>Medications</h4>
      <b-list-group>
        <b-list-group-item v-for="(medication, index) in selectedPatient.Medications" :key="index">
          <span class="medicationTitle">{{medication.MedicationName}} ({{medication.Dose}})</span>
          <br />
          <span class="medicationStartDate">{{formatDate(medication.StartDate)}}</span>
          <span
            class="medicationEndDate"
            v-if="medication.StopDate"
          >&nbsp;- {{formatDate(medication.StopDate)}}</span>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Getter } from 'vuex-class';
import Component from 'vue-class-component';
import { PatientsState } from '@/patient/state';
import { Patient, Medication } from '@/types/patient';
import { UpdatePatientRequest } from '@/patient/actions/actions';
import moment from 'moment';

const namespace: string = 'patient';

@Component
export default class PatientView extends Vue {
  form = {
    temperature: undefined,
    pulse: undefined,
  };

  @State('state', { namespace }) patientsState!: PatientsState;
  @Getter('selectedPatient', { namespace }) selectedPatient!: Patient;
  @Getter('selectedPatientId', { namespace }) selectedPatientId!: string;
  @Getter('editMode', { namespace }) editMode!: boolean;
  @Action('activateEditMode', { namespace }) openEditMode!: any;
  @Action('cancelEditMode', { namespace }) cancelEditMode!: any;
  @Action('updatePatient', { namespace }) updatePatient!: any;

  formatDate(date: Date) {
    return moment(date).format('YYYY-MMM-DD');
  }

  onReset() {
    this.form = {
      temperature: undefined,
      pulse: undefined,
    };
    this.cancelEditMode();
  }

  async onSubmit(evt: Event) {
    const self = this;
    evt.preventDefault();
    await this.updatePatient({
      patientId: this.selectedPatientId,
      successCallback: () => {
        this.$bvToast.toast('Successfully updated patient!', {
          title: 'Success',
          variant: 'success',
          toaster: 'b-toaster-bottom-center',
        });
      },
      failureCallback: (errMsg: String) => {
        this.$bvToast.toast(`Error: ${errMsg}`, {
          title: 'Error',
          variant: 'danger',
          toaster: 'b-toaster-bottom-center',
        });
      },
      ...this.form,
    });

    this.form = {
      temperature: undefined,
      pulse: undefined,
    };
  }
}
</script>

<style lang="scss" scoped>
.patient_view {
  width: 100%;
  border: 1px solid red;
}
</style>