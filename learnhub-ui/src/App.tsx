import "react-toastify/ReactToastify.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
    NotFound,
    Landing,
    Login,
    ManagerLogin,
    Register,
    Unauthorized,
    ForgotPassword,
    ResetPassword,
    CourseList,
    TeacherDetails,
    ContactUs,
    Home,
    UserProfile,
    FAQ,
    About,
    UserCourseList,
    ContactList,
    ContactDetails,
    UserList,
    UserDetails,
    AddUser,
    DoQuiz,
    QuizResult,
    TestVideo,
    CreateCourse,
    CourseDetail,
    CourseDetails,
    AddLesson,
    TeacherMaterialDetails,
    AddQuiz,
    ManagerCourseList,
    ManagerCourseDetails,
    ManagerMaterialDetails,
    Order,
    PaymentCallback,
    StudentMaterialDetails,
    AdminCourseList,
    AssignCourseManager,
    TransactionHistory
} from "./pages";
import { ContactsProviderRoute, GuestRoute, ProtectedRoute } from "./routers";
import Dummy from "./pages/Dummy";
import { ToastContainer } from "react-toastify";
import { UserRole } from "./types/User";
import UserProvider from "./hooks/useUser";

export default function App() {
    const [isLoading, setLoading] = useState(true);
    function fakeRequest() {
        return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    }

    useEffect(() => {
        fakeRequest().then(() => {
            const loadingIcon = document.querySelector("#loading-icon-bx");
            if (loadingIcon) {
                loadingIcon.remove();
            }
            setLoading(false);
        });
    }, []);
    if (isLoading) {
        return null;
    }

    return (
        <UserProvider>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dummy" element={<Dummy />} />
                </Route>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/activate/:token" element={<Login />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/teacher/:id" element={<TeacherDetails />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses/:id" element={<CourseDetail />} />

                {/* Routes for unauthenticated users */}
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/manager/login" element={<ManagerLogin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                    <Route path="/test" element={<TestVideo />} />
                </Route>

                {/* Routes for authenticated users */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.STUDENT, UserRole.TEACHER]} />}>
                    <Route path="/home/courses" element={<UserCourseList />} />
                    <Route path="/home/courses/:id" element={<CourseDetails />} />
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.STUDENT]} />}>
                    <Route path="/home/courses/:cid/materials/:mid" element={<StudentMaterialDetails />} />
                    <Route path="/home/courses/:cid/quizzes/:qid/do-quiz" element={<DoQuiz />} />
                    <Route path="/home/courses/:cid/quizzes/:qid/result/:rid" element={<QuizResult />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/payment-callback" element={<PaymentCallback />} />
                    <Route path="/transaction-history" element={<TransactionHistory />} />
                </Route>

                <Route element={<ProtectedRoute roles={[UserRole.TEACHER]} />}>
                    <Route path="/home/courses/create" element={<CreateCourse />} />
                    <Route path="/home/courses/:cid/chapters/:chid/lessons/add" element={<AddLesson />} />
                    <Route path="/home/courses/:cid/chapters/:chid/quizes/add" element={<AddQuiz />} />
                    <Route path="/home/courses/materials/:mid" element={<TeacherMaterialDetails />} />
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.ADMIN]} />}>
                    <Route element={<ContactsProviderRoute />}>
                        <Route path="/admin/contacts" element={<ContactList />} />
                        <Route path="/admin/contacts/:id" element={<ContactDetails />} />
                    </Route>
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.ADMIN]} />}>
                    <Route path="/admin/users" element={<UserList />} />
                    <Route path="/admin/users/:id" element={<UserDetails />} />
                    <Route path="/admin/users/add" element={<AddUser />} />
                    <Route path="/admin/courses" element={<AdminCourseList />} />
                    <Route path="/admin/courses/:courseId/assign-manager" element={<AssignCourseManager />} />
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.COURSE_MANAGER]} />}>
                    <Route path="/manager/courses" element={<ManagerCourseList />} />
                    <Route path="/manager/courses/:id" element={<ManagerCourseDetails />} />
                    <Route path="/manager/courses/:cid/materials/:id" element={<ManagerMaterialDetails />} />
                </Route>

                {/* Error Boundary */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="top-right" style={{ zIndex: 999999 }} />
        </UserProvider>
    );
}
