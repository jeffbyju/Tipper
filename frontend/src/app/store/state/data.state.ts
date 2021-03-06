import { IUser, IGoFundMe, IFacebook, IService } from "src/app/models/user-form";

export interface IDataState extends IUser {
    gofundme : IGoFundMe | null;
    facebook : IFacebook | null;
    services : IService[];
}

export const initialDataState: IDataState = {
    id : '',
    firstname : '',
    lastname  : '',
    gofundme : null,
    facebook : null,
    services : []
}