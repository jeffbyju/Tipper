export interface IUser {
    id : string;
    firstname : string;
    lastname  : string;
}

export interface IGoFundMe {
    url?: string;
    picture?: string;
    title?: string;
    description?: string;
}

export interface IFacebook {
    url: string;
    api: string;
}

export interface IService {
    name: string;
    url: string;
    id: string;
    api: string;
}