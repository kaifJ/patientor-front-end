import React from "react";
import { Field, FieldProps } from "formik";
import {
    Select,
    MenuItem,
} from "@material-ui/core";
import { InputLabel } from "@material-ui/core";

// structure of a single option
export type DiagnosisOptions = {
    value: string;
    label: string;
};

// props for select field component
type SelectFieldProps = {
    name: string;
    label: string;
    options: DiagnosisOptions[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
    <>
        <InputLabel>{label}</InputLabel>
        <Field
            fullWidth
            style={{ marginBottom: "0.5em" }}
            label={label}
            component={FormikSelect}
            name={name}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label || option.value}
                </MenuItem>
            ))}
        </Field>
    </>
);