import { ErrorMessage, Field, FieldAttributes, FormikValues, useFormikContext } from "formik";

interface FormFieldProps extends FieldAttributes<any> {
    className?: string;
    children?: React.ReactNode;
}

export default function FormField({ name, as, type = "text", className, children, ...props }: FormFieldProps) {
    const { touched, errors } = useFormikContext<FormikValues>();
    return (
        <div className="input-group">
            <Field
                as={as}
                type={as ? undefined : type}
                name={name}
                className={`form-control ${className || ""} ${touched?.[name] && errors?.[name] ? "is-invalid" : ""}`}
                {...props}>
                {children}
            </Field>
            <ErrorMessage name={name} component="div" className="invalid-feedback" />
        </div>
    );
}
