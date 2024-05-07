export declare enum OrderByEnum {
    ASC = "ASC",
    DESC = "DESC"
}
export declare enum SortFieldEnum {
    NAME = "name",
    AUTHOR_NAME = "authorName",
    PRICE = "price"
}
export declare class SortVinylDto {
    orderBy?: OrderByEnum;
    sortField: SortFieldEnum;
}
