import { IUser, IGoFundMe, IFacebook, IService } from "src/app/models/user-form";

export interface IDataState extends IUser {
    found?: boolean;
    gofundme : IGoFundMe | null;
    facebook : IFacebook | null;
    services : IService[];
}

export const initialDataState: IDataState = {
    found: false,
    id : '',
    firstname : '',
    lastname  : '',
    gofundme : null,
    facebook : null,
    services : []
}