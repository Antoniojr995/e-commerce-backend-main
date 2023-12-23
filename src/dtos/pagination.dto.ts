
export class PaginationMeta {
    itemsPerPage: number;
    totalItems: number;
    currentPages: number;
    totalPages: number;

    constructor(
        itemsPerPage: number,
        totalItems: number,
        currentPages: number,
        totalPages: number,
    ) {
        this.itemsPerPage = itemsPerPage;
        this.totalItems = totalItems;
        this.currentPages = currentPages;
        this.totalPages = totalPages;
    }
}

export class PaginationDTO<T> {
    meta: PaginationMeta;
    data: T;

    constructor(paginationMeta: PaginationMeta, data: T) {
        this.meta = paginationMeta;
        this.data = data;
    }
}