export declare enum OperationEnum {
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export declare enum EntityEnum {
    USER = "USER",
    VINYL = "VINYL",
    REVIEW = "REVIEW"
}
export declare class CreateLogerDto {
    entity: EntityEnum;
    operation: OperationEnum;
    data: string;
}
