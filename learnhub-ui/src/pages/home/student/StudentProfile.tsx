import { useReducer } from "react";
import { HomeLayout } from "../../../layouts";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useStudent } from "../../../hooks/useUser";
import { Student, StudentType, User } from "../../../types/User";
import { validatePassword } from "../../../utils/Validate";

interface Form {
    firstName: string;
    lastName: string;
    email: string;
    studentType: StudentType;
    school: string;
    phone: string;
    address: string;
    city: string;
    oldPassword: string;
    newPassword: string;
    rePassword: string;
}
interface Action {
    type: "UPDATE" | "CANCEL";
    field?: keyof Form;
    formType?: "user" | "password" | "student";
    value?: string | User | Student;
}

const initialState: Form = {
    firstName: "",
    lastName: "",
    email: "",
    studentType: StudentType.GRADE10,
    school: "",
    phone: "",
    address: "",
    city: "",
    oldPassword: "",
    newPassword: "",
    rePassword: ""
};

function isUser(value: unknown): value is User {
    return value && typeof value.firstName === "string" && typeof value.lastName === "string";
}

function isStudent(value: unknown): value is Student {
    const isStudentType = value && typeof value.studentType === "string";
    return isStudentType;
}
const formReducer = (state: Form, action: Action): Form => {
    switch (action.type) {
        case "UPDATE":
            if (action.field) {
                return { ...state, [action.field]: action.value };
            }
            return state;

        case "CANCEL":
            if (action.formType === "user" && action.value && isUser(action.value)) {
                return {
                    ...state,
                    firstName: action.value.firstName || "",
                    lastName: action.value.lastName || "",
                    email: action.value.email || "",
                    phone: action.value.phone || "",
                    address: action.value.address || "",
                    city: action.value.city || ""
                };
            }

            if (action.formType === "student" && action.value && isStudent(action.value)) {
                return {
                    ...state,
                    studentType: action.value.studentType || StudentType.GRADE10,
                    school: action.value.school || ""
                };
            }

            if (action.formType === "password") {
                return {
                    ...state,
                    oldPassword: "",
                    newPassword: "",
                    rePassword: ""
                };
            }

            return state;

        default:
            return state;
    }
};

export default function StudentProfile() {
    const { user, setUser } = useStudent();
    const [state, dispatch] = useReducer(formReducer, {
        ...initialState,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        studentType: user.details?.studentType || StudentType.GRADE10,
        address: user.address || "",
        school: user.details?.school || "",
        city: user.city || ""
    });

    const handleChange = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch({ type: "UPDATE", field, value: e.target.value });
    };

    const handleSubmitAccountChange = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(state);
            if (!state.firstName || !state.lastName || !state.phone || !state.address || !state.city) {
                toast.error("Please fill in all fields");
                return;
            }
            const resp = await API.put("/users/me", {
                firstName: state.firstName,
                lastName: state.lastName,
                phone: state.phone,
                address: state.address,
                city: state.city
            });
            if (resp.status === 200) {
                toast.success("Updated successfully");
                if (resp.data) {
                    setUser(resp.data);
                }
            }
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message);
            }
        }
    };

    const handleSubmitPasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!state.oldPassword || !state.newPassword || !state.rePassword) {
                toast.error("Please fill in all fields");
                return;
            }

            if (!validatePassword(state.newPassword)) {
                toast.error(
                    "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
                );
                return;
            }

            if (state.newPassword !== state.rePassword) {
                toast.error("Passwords do not match");
                return;
            }

            const resp = await API.put("/users/me/password", {
                oldPassword: state.oldPassword,
                newPassword: state.newPassword
            });
            if (resp.status === 200) {
                toast.success("Updated successfully");
                if (resp.data) {
                    setUser(resp.data);
                }
            }
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message);
            }
        }
    };

    const handleSubmitStudentChange = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!state.school || !state.studentType) {
                toast.error("Please fill in all fields");
                return;
            }
            const resp = await API.put("/students/me", {
                type: state.studentType,
                school: state.school
            });
            if (resp.status === 200) {
                toast.success("Updated successfully");
                if (resp.data) {
                    setUser(resp.data);
                }
            }
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message);
            }
        }
    };

    const handleCancelAccountChange = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "CANCEL", formType: "user", value: user as User });
    };

    const handleCancelStudentChange = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "CANCEL", formType: "student", value: user.details as Student });
    };

    const handleCancelPasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "CANCEL", formType: "password" });
    };

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>User Profile</h4>
                                </div>
                                <div className="widget-inner">
                                    <form className="edit-profile m-b30" onSubmit={handleSubmitAccountChange}>
                                        <div className="">
                                            <div className="form-group row">
                                                <div className="col-sm-10 ml-auto">
                                                    <h3>1. Personal Details</h3>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">First Name</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={state.firstName}
                                                        onChange={handleChange("firstName")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Last Name</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={state.lastName}
                                                        onChange={handleChange("lastName")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Email</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={state.email}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Phone</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={state.phone}
                                                        onChange={handleChange("phone")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Address</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={state.address}
                                                        onChange={handleChange("address")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">City</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={state.city}
                                                        onChange={handleChange("city")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="">
                                                <div className="row">
                                                    <div className="col-sm-2"></div>
                                                    <div className="col-sm-7">
                                                        <button
                                                            type="submit"
                                                            className="btn"
                                                            style={{ marginRight: "20px" }}>
                                                            Save changes
                                                        </button>
                                                        <button
                                                            type="reset"
                                                            className="btn-secondry"
                                                            onClick={handleCancelAccountChange}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    {/* Student's details */}
                                    <form className="edit-profile m-b30" onSubmit={handleSubmitStudentChange}>
                                        <div className="">
                                            <div className="form-group row">
                                                <div className="col-sm-10 ml-auto">
                                                    <h3>2. Student Details</h3>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Education Level</label>
                                                <div className="col-sm-7">
                                                    <select
                                                        // defaultValue={state.studentType}
                                                        value={state.studentType}
                                                        onChange={handleChange("studentType")}
                                                        className="form-select form-control">
                                                        <option value={StudentType.GRADE10}>Grade 10</option>
                                                        <option value={StudentType.GRADE11}>Grade 11</option>
                                                        <option value={StudentType.GRADE12}>Grade 12</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">School</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        value={state.school}
                                                        onChange={handleChange("school")}
                                                        className="form-control"></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="">
                                                <div className="row">
                                                    <div className="col-sm-2"></div>
                                                    <div className="col-sm-7">
                                                        <button
                                                            type="submit"
                                                            className="btn"
                                                            style={{ marginRight: "20px" }}>
                                                            Save changes
                                                        </button>
                                                        <button
                                                            type="reset"
                                                            className="btn-secondry"
                                                            onClick={handleCancelStudentChange}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>

                                    {/* Password  */}
                                    <form className="edit-profile" onSubmit={handleSubmitPasswordChange}>
                                        <div className="">
                                            <div className="form-group row">
                                                <div className="col-sm-10 ml-auto">
                                                    <h3>3. Password</h3>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Current Password</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        value={state.oldPassword}
                                                        className="form-control"
                                                        type="password"
                                                        onChange={handleChange("oldPassword")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">New Password</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        value={state.newPassword}
                                                        className="form-control"
                                                        type="password"
                                                        onChange={handleChange("newPassword")}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Re Type Password</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        value={state.rePassword}
                                                        className="form-control"
                                                        type="password"
                                                        onChange={handleChange("rePassword")}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-2"></div>
                                            <div className="col-sm-7">
                                                <button type="submit" className="btn" style={{ marginRight: "20px" }}>
                                                    Save changes
                                                </button>
                                                <button
                                                    type="reset"
                                                    className="btn-secondry"
                                                    onClick={handleCancelPasswordChange}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
