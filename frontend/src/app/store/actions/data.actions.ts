import { Action } from '@ngrx/store';
import { 
    IUser, IGoFundMe, IFacebook, IService 
} from 'src/app/models/user-form';

export enum EDataActions {
    SetUser = '[DATA] Setting User Data',
    SetGoFundMe = '[DATA] Setting GoFundMe',
    SetFacebook = '[DATA] Setting Facebook',
    AddService = '[DATA] Adding Delivery Serivce',
}

export class SetUser implements Action {
    public readonly type = EDataActions.SetUser;
    constructor(public user : IUser) { }
}

export class SetGoFundMe implements Action {
    public readonly type = EDataActions.SetGoFundMe;
    constructor(public fund : IGoFundMe) { }
}

export class SetFacebook implements Action {
    public readonly type = EDataActions.SetFacebook;
    constructor(public fb : IFacebook) { }
}

export class AddService implements Action {
    public readonly type = EDataActions.AddService;
    constructor(public service : IService) { }
}

export type DActions = 
    | SetUser
    | SetGoFundMe
    | SetFacebook
    | AddService;
