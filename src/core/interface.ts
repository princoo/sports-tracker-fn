export interface DefaultResponse <T = any> {
    status: string;
    statusCode: number;
    result:{
        message: string;
        data: T
    }
}