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
export { default as ContactList } from "./home/teachermanager/ContactList";
export { default as ContactDetails } from "./home/teachermanager/ContactDetails";
export { default as UserList } from "./home/teachermanager/UserList";
export { default as UserDetails } from "./home/teachermanager/UserDetails";
export { default as AddUser } from "./home/teachermanager/AddUser";
export { default as Mailbox } from "./home/teachermanager/Mailbox";
export { default as CourseQuiz } from "./home/student/CourseQuiz";
export { default as DoQuiz } from "./home/student/DoQuiz";
export { default as QuizResult } from "./home/student/QuizResult";

// Error boundary
export { default as NotFound } from "./error/NotFound";
export { default as Unauthorized } from "./error/Unauthorized";
