export type ChromeRuntimeResponse<dataType = ResponseTypes> = {
    success:boolean,
    message:string,
    data : dataType
}

export type GetURLRESPONSE = {
    url:string,
}

type ResponseTypes = GetURLRESPONSE|unknown