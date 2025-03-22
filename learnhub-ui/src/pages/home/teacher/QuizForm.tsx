import { ErrorMessage, FieldArray, Form, Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import FormField from "../../../layouts/FormField";
import Swal from "sweetalert2";

interface Option {
    text: string;
    correct: boolean;
}

interface Question {
    text: string;
    explanation: string;
    options: Option[];
}

interface FormValues {
    name: string;
    passGrade: number;
    description: string;
    questions: Question[];
}

interface QuizFormProps {
    initialValues: FormValues;
    onSubmit: (values: FormValues, actions: FormikHelpers<FormValues>) => void;
}

const optionSchema = yup.object({
    text: yup.string().required("Option text is required"),
    correct: yup.boolean()
});

const questionSchema = yup.object({
    text: yup.string().required("Question text is required"),
    explanation: yup.string().required("Explanation is required"),
    options: yup
        .array()
        .of(optionSchema)
        .min(1, "Question should have at least 1 option")
        .test("min-correct", "Question must have at least 1 correct answer", (options) => {
            return options?.some((option) => option.correct === true);
        })
});

const validationSchema = yup.object({
    name: yup.string().required("Quiz title is required"),
    description: yup.string().required("Description is required"),
    passGrade: yup
        .number()
        .integer("Pass grade should be integer")
        .min(0, "Pass grade should be greater than 0")
        .test("passGrade-max", "Pass grade should not greater than total questions", (value, context) =>
            value !== undefined ? value <= context.parent.questions.length : false
        ),
    questions: yup.array().of(questionSchema).min(1, "Quiz should have at least 1 question")
});

export default function QuizForm({ initialValues, onSubmit }: QuizFormProps) {
    const addQuestion = async (push: (question: Question) => void) => {
        const { value } = await Swal.fire({
            title: "Add Question",
            input: "textarea",
            inputPlaceholder: "Enter question text...",
            showCancelButton: true
        });
        if (value) {
            push({ text: value, explanation: "", options: [] });
        }
    };

    const addOption = async (push: (option: Option) => void) => {
        const { value } = await Swal.fire({
            title: "Add Option",
            input: "textarea",
            inputPlaceholder: "Enter option text...",
            showCancelButton: true
        });
        if (value) {
            push({ text: value, correct: false });
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ values, isSubmitting, resetForm }) => (
                <Form noValidate className="edit-profile m-b30">
                    <div className="row">
                        <div className="form-group col-6">
                            <label className="col-form-label">Quiz title</label>
                            <FormField name="name" />
                        </div>
                        <div className="form-group col-6">
                            <label className="col-form-label">Pass Grade</label>
                            <FormField name="passGrade" />
                        </div>
                        <div className="form-group col-12">
                            <label className="col-form-label">Description</label>
                            <FormField name="description" as="textarea" />
                        </div>
                        <FieldArray name="questions">
                            {({ push: pushQuestion, remove: removeQuestion }) => (
                                <>
                                    <div className="col-12">
                                        <button
                                            type="button"
                                            onClick={() => addQuestion(pushQuestion)}
                                            className="btn-secondry add-item m-r5">
                                            <i className="fa fa-fw fa-plus-circle"></i>Add Question
                                        </button>
                                    </div>
                                    {values.questions.map((question, index) => (
                                        <div key={index} className="col-12">
                                            <FieldArray name={`questions[${index}].options`}>
                                                {({ push, remove }) => (
                                                    <div className="my-3 card">
                                                        <div className="card-header">
                                                            <div className="ml-auto d-flex justify-content-between align-items-center">
                                                                <h5>{question.text}</h5>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        className="btn mr-3"
                                                                        onClick={() => addOption(push)}>
                                                                        Add Option
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn red"
                                                                        onClick={() => removeQuestion(index)}>
                                                                        Remove Question
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <ul>
                                                                {question.options.map((_, optIndex) => (
                                                                    <li key={optIndex} className="card my-3">
                                                                        <div className="card-body">
                                                                            <div className="d-flex justify-content-between align-items-center w-100">
                                                                                <div className="row w-100">
                                                                                    <div className="col-8">
                                                                                        <FormField
                                                                                            name={`questions[${index}].options[${optIndex}].text`}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-auto d-flex align-items-center form-check">
                                                                                        <FormField
                                                                                            name={`questions[${index}].options[${optIndex}].correct`}
                                                                                            type="checkbox"
                                                                                            className="mr-2"
                                                                                        />
                                                                                        <div>Correct</div>
                                                                                    </div>
                                                                                </div>
                                                                                <div>
                                                                                    <a
                                                                                        className="delete"
                                                                                        href="#"
                                                                                        onClick={() =>
                                                                                            remove(optIndex)
                                                                                        }>
                                                                                        <i className="fa fa-close"></i>
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <div>
                                                                <h6>Explanation</h6>
                                                                <FormField
                                                                    name={`questions[${index}].explanation`}
                                                                    as="textarea"
                                                                    placeholder="Enter your explanation for the question..."
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </FieldArray>
                                            <ErrorMessage
                                                name={`questions[${index}].options`}
                                                render={(msg) =>
                                                    typeof msg === "string" ? (
                                                        <div className="text-danger">{msg}</div>
                                                    ) : null
                                                }
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                        </FieldArray>
                        <div className="col-12">
                            <ErrorMessage
                                name="questions"
                                render={(msg) =>
                                    typeof msg === "string" ? <div className="text-danger">{msg}</div> : null
                                }
                            />
                        </div>
                        <div className="col-12 mt-4">
                            <button type="submit" className="btn mr-3" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save"}
                            </button>
                            <button type="button" className="btn-secondry" onClick={() => resetForm()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
