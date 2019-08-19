<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Health Data Analytics Institute</b-navbar-brand>
    </b-navbar>

    <b-container class="layout-grid">
      <b-row>
        <b-col cols="4">
          <PatientList />
        </b-col>
        <b-col>
          <PatientView />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PatientList from '@/components/PatientList.vue';
import PatientView from '@/components/PatientView.vue';
import { PatientsState } from '@/patient/state';
import { Action } from 'vuex-class';
const namespace: string = 'patient';

@Component({
  components: {
    PatientList,
    PatientView,
  },
})
export default class App extends Vue {
  @Action('fetchData', { namespace }) fetchData: any;
  created() {
    this.fetchData();
  }
}
</script>

<style lang="scss">
@import './styles/bootstrap.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
