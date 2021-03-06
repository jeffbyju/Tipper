import {
    IUser, IGoFundMe, IFacebook, IService
} from 'src/app/models/user-form';
import { DActions, EDataActions } from '../actions/data.actions';
import { initialDataState, IDataState } from '../state/data.state';

export const dataReducers = (
    state = initialDataState,
    action: DActions
): IDataState => {
    switch (action.type) {
        case EDataActions.SetUser: {
            return {
                ...state,
                id : action.user.id,
                firstname : action.user.firstname,
                lastname : action.user.lastname
            };
        }
        case EDataActions.SetGoFundMe: {
            return {
                ...state,
                gofundme : action.fund
            };
        }
        case EDataActions.SetFacebook: {
            return {
                ...state,
                facebook : action.fb
            }
        }
        case EDataActions.AddService: {
            return {
                ...state,
                services : [
                    ...state.services,
                    action.service
                ]
            }
        }
        default:
            return state;
    }
}