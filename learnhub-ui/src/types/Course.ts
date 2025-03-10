import { User } from "./User";

export enum CourseStatus {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    PENDING = "PENDING",
    CANCELLED = "CANCELLED",
    ARCHIVED = "ARCHIVED"
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
    image: string;
    createdAt: Date;
    updatedAt: Date;
    cancelledAt: Date;
    archivedAt: Date;
    teacher: User;
}
