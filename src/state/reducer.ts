import { State } from "./state";
import { Diagnosis, Patient, ADD_ENTRY_PROPS } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "FETCH_PATIENT";
    payload: Patient;
  }
  | {
    type: 'FETCH_DIAGNOSIS';
    payload: Diagnosis[];
  }
  | {
    type: 'ADD_ENTRY',
    payload: ADD_ENTRY_PROPS
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "FETCH_PATIENT":
      const _patients = { ...state.patients[action.payload.id] };
      _patients['entries'] = action.payload.entries;
      _patients.fetched = true;

      return {
        ...state,
        patients: {
          ...state.patients,
          [_patients.id]: _patients
        }
      };
    case "FETCH_DIAGNOSIS":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_ENTRY":
      const _patient = { ...state.patients[action.payload.patientId] };
      _patient['entries'] = _patient['entries']?.concat(action.payload.data);

      return {
        ...state,
        patients: {
          ...state.patients,
          [_patient.id]: _patient
        }
      };
    default:
      return state;
  }
};
