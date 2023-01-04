import { Entry, HealthCheckEntry } from "../types";
import assertNever from "./AssertNever";
import OccupationalHealthcare from '@mui/icons-material/Work';
import HealthCheck from '@mui/icons-material/MedicalServices';
import HealthRating from "./HealthRating";
// import { useStateValue } from "../state";

const EntryComponent = (props: { entry: Entry }) => {
    // const [{ diagnosis },] = useStateValue();
    const entry: Entry = props.entry;
    const dummyJsx = (<>
        <span>{entry.description}</span><br />
        <span>diagnosed by {entry.specialist}</span>
    </>);

    // const diagnosisEntry = (
    //     <>
    //         {entry.diagnosisCodes?.length && (
    //             <ul>
    //                 {entry.diagnosisCodes.map((code, index) => {
    //                     return (
    //                         <li key={`${code}~${index}`}>{code} {diagnosis[code]['name']}</li>
    //                     );
    //                 })}
    //             </ul>
    //         )}
    //     </>
    // );
    let jsx;
    switch ((entry.type)) {
        case 'Hospital':
            jsx = (
                <div style={{ border: 'solid', borderWidth: 1, borderRadius: 20, marginTop: 5, paddingLeft: 5 }}>
                    <h3>{entry.date} {<OccupationalHealthcare />}</h3>
                    {dummyJsx}
                    {/* {diagnosisEntry} */}
                </div>
            );
            break;
        case 'HealthCheck':
            const _entry: HealthCheckEntry = { healthCheckRating: 0, ...entry, type: "HealthCheck" };
            jsx = (
                <div style={{ border: 'solid', borderWidth: 1, borderRadius: 20, marginTop: 5, paddingLeft: 5 }}>
                    <h3>{entry.date} {<HealthCheck />}</h3>
                    {dummyJsx}
                    <div>
                        <HealthRating rating={_entry.healthCheckRating} />
                    </div>
                    {/* {diagnosisEntry} */}
                </div>
            );
            break;
        case 'OccupationalHealthcare':
            jsx = (
                <div style={{ border: 'solid', borderWidth: 1, borderRadius: 20, marginTop: 5, paddingLeft: 5 }}>
                    <h3>{entry.date} {<HealthCheck />}</h3>
                    {dummyJsx}
                    {/* {diagnosisEntry} */}
                </div>
            );
            break;
        default:
            return assertNever(entry as never);
    }

    return jsx;
};

export default EntryComponent;