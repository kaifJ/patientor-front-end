import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField } from "../AddPatientModal/FormField";
import { SelectField } from "./FormField";
import { BaseEntry } from "../types";
import { useStateValue } from "../state";


export type EntryFormValues = Omit<BaseEntry, "id">;

interface Props {
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
}


export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnosis },] = useStateValue();
    const diagnosisOptions = Object.values(diagnosis).map(diagnosis => ({ value: diagnosis.code, label: diagnosis.name }));

    return (
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                discharge: ""
            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (values.diagnosisCodes?.length === 0) {
                    errors.diagnosisCodes = requiredError;
                }
                if (!values.discharge) {
                    errors.discharge = requiredError;
                }
                return errors;
            }}
        >
            {({ isValid, dirty }) => {
                return (
                    <Form className="form ui">
                        <Field
                            label="Type"
                            placeholder="Type"
                            name="type"
                            component={TextField}
                        />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="DD-MM-YYYY"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <Field
                            label="Discharge"
                            placeholder="DD-MM-YYYY"
                            name="discharge"
                            component={TextField}
                        />
                        {/* <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            /> */}
                        <SelectField label="Diagnosis" name="diagnosisCodes" options={diagnosisOptions} />
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;
