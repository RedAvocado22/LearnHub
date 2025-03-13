import { ErrorMessage, Field, FormikValues, useFormikContext } from "formik";

interface FormFieldProps {
    name: string;
    as?: string;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    children?: React.ReactNode;
}

export default function FormField({ name, as, type = "text", placeholder, className, children }: FormFieldProps) {
    const { touched, errors } = useFormikContext<FormikValues>();
    return (
        <div className="input-group">
            <Field
                as={as}
                type={as ? undefined : type}
                id={name}
                name={name}
                placeholder={placeholder}
                className={`form-control ${className || ""} ${touched?.[name] && errors?.[name] ? "is-invalid" : ""}`}>
                {children}
            </Field>
            <ErrorMessage name={name} component="div" className="invalid-feedback" />
        </div>
    );
}
