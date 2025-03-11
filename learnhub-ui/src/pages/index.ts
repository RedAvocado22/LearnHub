// Public pages
export { default as Landing } from "./public/Landing";
export { default as TeacherDetails } from "./public/TeacherDetails";
export { default as CourseList } from "./public/CourseList";
export { default as ContactUs } from "./public/ContactUs";
export { default as FAQ } from "./public/FAQ";
export { default as About } from "./public/About";
export { default as BookList } from "./public/BookList";

// Auth pages
export { default as Register } from "./auth/Register";
export { default as Login } from "./auth/Login";
export { default as ManagerLogin } from "./auth/ManagerLogin";
export { default as ForgotPassword } from "./auth/ForgotPassword";
export { default as ResetPassword } from "./auth/ResetPassword";

// User home
export { default as Home } from "./home/Home";
export { default as UserProfile } from "./home/UserProfile";
export { default as Mailbox } from "./home/teachermanager/Mailbox";
export { default as CourseManagerHome } from "./home/coursemanager/CourseManagerHome";
export { default as CourseListManager } from "./home/coursemanager/CourseListManager";

//Payment
export { default as Order } from "./home/payment/Order";
export { default as PaymentCallback } from "./home/payment/PaymentCallback";
// Error boundary
export { default as NotFound } from "./error/NotFound";
export { default as Unauthorized } from "./error/Unauthorized";
