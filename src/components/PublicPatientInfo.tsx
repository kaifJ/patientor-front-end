import React from 'react';
import { useStateValue, addEntry } from "../state";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Entry, Patient } from "../types";
import Male from "@mui/icons-material/Male";
import Female from '@mui/icons-material/Female';
import EntryComponent from "./Entry";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import AddEntryModal from '../AddEntryModal';


const PublicPatientInfo = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const patient: Patient = patients[id as string];
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const onHandleSubmit = async (values: EntryFormValues) => {
        console.log('here');
        const { data } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id as string}/entries`,
            values
        );
        dispatch(addEntry({
            data, patientId: id as string
        }));
        closeModal();
    };

    return (
        <div>
            <h2>{patient.name}{patient.gender === 'male' ? <Male /> : <Female />}</h2>
            <span>ssn: {patient.ssn}</span><br />
            <span>occupation: {patient.occupation}</span>
            <h3>entries</h3>
            {patient.entries?.length
                ? patient.entries.map((entry: Entry) => {
                    return (
                        <EntryComponent key={entry.id} entry={entry} />
                    );
                })
                : <p>No entries found</p>}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={onHandleSubmit}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" color="primary" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </div>
    );
};

export default PublicPatientInfo;