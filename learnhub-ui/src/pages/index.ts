// Public pages
export { default as Landing } from "./public/Landing";
export { default as TeacherDetails } from "./public/TeacherDetails";
export { default as CourseList } from "./public/CourseList";
export { default as ContactUs } from "./public/ContactUs";
export { default as FAQ } from "./public/FAQ";
export { default as About } from "./public/About";

// Auth pages
export { default as Register } from "./auth/Register";
export { default as Login } from "./auth/Login";
export { default as ManagerLogin } from "./auth/ManagerLogin";
export { default as ForgotPassword } from "./auth/ForgotPassword";
export { default as ResetPassword } from "./auth/ResetPassword";

// User home
export { default as Home } from "./home/Home";
export { default as UserProfile } from "./home/UserProfile";
<<<<<<< HEAD
export { default as ContactList } from "./home/teachermanager/ContactList";
export { default as ContactDetails } from "./home/teachermanager/ContactDetails";
export { default as UserList } from "./home/teachermanager/UserList";
export { default as UserDetails } from "./home/teachermanager/UserDetails";
export { default as AddUser } from "./home/teachermanager/AddUser";
export { default as CourseManagerHome } from "./home/coursemanager/CourseManagerHome";
export { default as CourseListManager } from "./home/coursemanager/CourseListManager";
export { default as CourseQuiz } from "./home/student/CourseQuiz";
export { default as DoQuiz } from "./home/student/DoQuiz";
export { default as QuizResult } from "./home/student/QuizResult";
=======
export { default as UserCourseList } from "./home/UserCourseList";
export { default as CreateCourse } from "./home/teacher/CreateCourse";

export { default as CourseQuiz } from "./home/student/CourseQuiz";
export { default as DoQuiz } from "./home/student/DoQuiz";
export { default as QuizResult } from "./home/student/QuizResult";

export { default as ContactList } from "./home/admin/ContactList";
export { default as ContactDetails } from "./home/admin/ContactDetails";
export { default as UserList } from "./home/admin/UserList";
export { default as UserDetails } from "./home/admin/UserDetails";
export { default as AddUser } from "./home/admin/AddUser";
>>>>>>> 41e861c208d9a1e44e7b8ea77dc5f2637f029a4b

//Payment
export { default as Order } from "./home/payment/Order";
export { default as PaymentCallback } from "./home/payment/PaymentCallback";
// Error boundary
export { default as NotFound } from "./error/NotFound";
export { default as Unauthorized } from "./error/Unauthorized";
