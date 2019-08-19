import { Patient } from '@/types/patient';

export interface PatientsState {
  loadedPatients?: { [key: string]: Patient };
  selectedPatientId?: string;
  error: boolean;
  editMode: boolean;
}

export interface RootState {
  version: string;
}
