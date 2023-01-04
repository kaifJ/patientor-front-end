import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis, ADD_ENTRY_PROPS } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnosis: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  diagnosis: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: data
  };
};

export const addPatient = (data: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: data
  };
};

export const fetchPatient = (data: Patient): Action => {
  return {
    type: 'FETCH_PATIENT',
    payload: data
  };
};

export const fetchDiagnosis = (data: Diagnosis[]): Action => {
  return {
    type: 'FETCH_DIAGNOSIS',
    payload: data
  };
};

export const addEntry = ({ data, patientId }: ADD_ENTRY_PROPS): Action => {
  return {
    type: 'ADD_ENTRY',
    payload: { data, patientId }
  };
};