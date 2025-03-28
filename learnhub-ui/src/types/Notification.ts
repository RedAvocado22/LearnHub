export enum NotificationType {
    COURSE_SUBMITTED = "COURSE_SUBMITTED",
    COURSE_PUBLISHED = "COURSE_PUBLISHED",
    COURSE_REJECTED = "COURSE_REJECTED",
    COURSE_UPDATED = "COURSE_UPDATED",
    COURSE_ASSIGNED = "COURSE_ASSIGNED",
    CONTACT_SUBMITTED = "CONTACT_SUBMITTED",
    CONTACT_UPDATED = "CONTACT_UPDATED",
    USER_REGISTERED = "USER_REGISTERED",
    STUDENT_ENROLLED = "STUDENT_ENROLLED"
}

export type NotifContextType =
    | { id: number; email: string }
    | { id: number; isManager: boolean; teacherName: string }
    | { id: number; managerName: string }
    | { id: number; courseName: string }
    | { id: number; contactName: string }
    | { id: number }
    | null;

export const isCourseSubmitted = (
    type: NotificationType,
    context: NotifContextType
): context is { id: number; isManager: boolean; teacherName: string } =>
    type === NotificationType.COURSE_SUBMITTED && "teacherName" in (context ?? {});

export const isCoursePublishedAdmin = (
    type: NotificationType,
    context: NotifContextType
): context is { id: number; managerName: string } =>
    type === NotificationType.COURSE_PUBLISHED && "managerName" in (context ?? {});

export const isCoursePublishedTeacher = (
    type: NotificationType,
    context: NotifContextType
): context is { id: number; courseName: string } =>
    type === NotificationType.COURSE_PUBLISHED && "courseName" in (context ?? {});

export const isCourseRejected = (
    type: NotificationType,
    context: NotifContextType
): context is { id: number; courseName: string } =>
    type === NotificationType.COURSE_REJECTED && "courseName" in (context ?? {});

export const isCourseUpdated = (
    type: NotificationType,
    context: NotifContextType
): context is { id: number; courseName: string } =>
    type === NotificationType.COURSE_UPDATED && "courseName" in (context ?? {});

export const isCourseAssigned = (type: NotificationType, context: NotifContextType): context is { id: number } =>
    type === NotificationType.COURSE_ASSIGNED && "id" in (context ?? {});

export const isContactSubmitted = (type: NotificationType, context: NotifContextType): context is { id: number } =>
    type === NotificationType.CONTACT_SUBMITTED && "id" in (context ?? {});

export const isContactUpdated = (
    type: NotificationType,
    context: NotifContextType
): context is { id: number; contactName: string } =>
    type === NotificationType.CONTACT_UPDATED && "contactName" in (context ?? {});

export const isStudentEnrolled = (
    type: NotificationType,
    context: NotifContextType
): context is { id: number; courseName: string } =>
    type === NotificationType.STUDENT_ENROLLED && "courseName" in (context ?? {});

export const isUserRegistered = (
    type: NotificationType,
    context: NotifContextType
): context is { id: number; email: string } => type === NotificationType.USER_REGISTERED && "email" in (context ?? {});
