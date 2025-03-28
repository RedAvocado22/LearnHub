// Public pages
export { default as Landing } from "./public/Landing";
export { default as TeacherDetails } from "./public/TeacherDetail";
export { default as CourseList } from "./public/CourseList";
export { default as ContactUs } from "./public/ContactUs";
export { default as FAQ } from "./public/FAQ";
export { default as About } from "./public/About";
export { default as TestVideo } from "./public/TestVideo";
export { default as CourseDetail } from "./public/CourseDetail";
export { default as AddContactDetails } from "./public/AddContactDetails";

// Auth pages
export { default as Register } from "./auth/Register";
export { default as Login } from "./auth/Login";
export { default as ManagerLogin } from "./auth/ManagerLogin";
export { default as ForgotPassword } from "./auth/ForgotPassword";
export { default as ResetPassword } from "./auth/ResetPassword";

// User home
export { default as Home } from "./home/Home";
export { default as UserProfile } from "./home/UserProfile";
export { default as UserCourseList } from "./home/UserCourseList";
export { default as CourseDetails } from "./home/CourseDetails";

export { default as CreateCourse } from "./home/teacher/CreateCourse";
export { default as TeacherMaterialDetails } from "./home/teacher/TeacherMaterialDetails";
export { default as AddLesson } from "./home/teacher/AddLesson";
export { default as AddQuiz } from "./home/teacher/AddQuiz";

export { default as StudentMaterialDetails } from "./home/student/StudentMaterialDetails";
export { default as CourseLesson } from "./home/student/CourseLesson";
export { default as CourseQuiz } from "./home/student/CourseQuiz";
export { default as DoQuiz } from "./home/student/DoQuiz";
export { default as QuizResult } from "./home/student/QuizResult";

export { default as ContactList } from "./home/admin/ContactList";
export { default as ContactDetails } from "./home/admin/ContactDetails";
export { default as UserList } from "./home/admin/UserList";
export { default as UserDetails } from "./home/admin/UserDetails";
export { default as AddUser } from "./home/admin/AddUser";
export { default as AdminCourseList } from "./home/admin/CourseList";
export { default as AssignCourseManager } from "./home/admin/AssignCourseManager";
export { default as TransactionHistory } from "./home/student/TransactionHistory";
export { default as AddCategory } from "./home/admin/AddCategory";

//Payment
export { default as Order } from "./home/payment/Order";
export { default as PaymentCallback } from "./home/payment/PaymentCallback";
export { default as ManagerCourseList } from "./home/manager/CourseLists";
export { default as ManagerCourseDetails } from "./home/manager/CourseDetails";
export { default as ManagerMaterialDetails } from "./home/manager/MaterialDetails";

// Error boundary
export { default as NotFound } from "./error/NotFound";
export { default as Unauthorized } from "./error/Unauthorized";
