import { User } from "./User";

export enum CourseStatus {
    PUBLIC,
    PRIVATE,
    PENDING,
    CANCELLED,
    ARCHIVED
}

export interface Category {
    id: number;
    name: string;
}

export interface Course {
    id: number;
    name: string;
    category: Category;
    price: number;
    status: CourseStatus;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    cancelledAt: Date;
    archivedAt: Date;
    teacher: User;
}
