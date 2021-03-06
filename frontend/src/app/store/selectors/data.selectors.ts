import { createSelector, select } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { IDataState } from '../state/data.state';

const selectApp = (state: IAppState) => state.appData;

export const getData = createSelector(
    selectApp,
    (state: IDataState) => state
)


export const selectUser = createSelector(
    selectApp,
    (state: IDataState) => {
        return {
            id : state.id,
            firstname : state.firstname,
            lastname : state.lastname,
        }
    }
);

export const selectGoFundMe = createSelector(
    selectApp,
    (state: IDataState) => state.gofundme
);

export const selectFacebook = createSelector(
    selectApp,
    (state: IDataState) => state.facebook
);

export const selectServices = createSelector(
    selectApp,
    (state: IDataState) => state.services
);