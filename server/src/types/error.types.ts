export interface IErrorPayload{
    // errror object
    error:{
        message:string;
        stack?:string;
    };
    //  req heading
     request:{
        method:string;
        url:string;
        query?:object;
        body?:object;
        params?:object;
     };
        //  req headers
     headers:Record<string,any>;
 
     user:{
        id:string;
        token:string;
     };

     device:{
        browser:string;
        browserVersion:string;
        od?:string;
        deviceType?:string;
        cpu?:string;
     };

     response:{
        statusCode:number;
        
     };

     perfomance:{
        responseTime:number;
     };

}