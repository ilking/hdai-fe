export interface Medication {
  MedicationName: string;
  Dose: string;
  StartDate: Date;
  StopDate?: Date;
}

export interface Patient {
  FirstName: string;
  LastName: string;
  Temperature?: number;
  Pulse?: number;
  Medications?: Medication[];
  _id: string;
}
