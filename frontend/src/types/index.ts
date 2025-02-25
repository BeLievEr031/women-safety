export interface IContact {
    id: number;
    clerkId: string;
    name: string;
    phone: string;
}

export interface IPagination {
    page: number;
    limit: number;
    order: "asc" | "desc";
    sortBy: string;
    clerkId?: string;
    userId?: string;
}

export interface IPhone {
    numbers: string[]
}