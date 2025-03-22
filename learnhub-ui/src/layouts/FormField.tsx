import { ErrorMessage, Field, FieldAttributes, FormikValues, useFormikContext } from "formik";
import { get } from "lodash";

interface FormFieldProps extends FieldAttributes<any> {
    className?: string;
    children?: React.ReactNode;
}

export default function FormField({ name, as, type = "text", className, children, ...props }: FormFieldProps) {
    const { touched, errors } = useFormikContext<FormikValues>();
    const isError = get(errors, name);
    const isTouched = get(touched, name);
    return (
        <div className="input-group">
            <Field
                as={as}
                type={as ? undefined : type}
                name={name}
                className={`form-control ${className || ""} ${isTouched && isError ? "is-invalid" : ""}`}
                {...props}>
                {children}
            </Field>
            <ErrorMessage name={name} component="div" className="invalid-feedback" />
        </div>
    );
}
