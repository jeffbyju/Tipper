export interface IUser {
    id : string;
    firstname : string;
    lastname  : string;
    gofundme : IGoFundMe | null;
    facebook : IFacebook | null;
    services : IService[];
}

export interface IGoFundMe {
    url: string
    title: string;
    description: string;
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