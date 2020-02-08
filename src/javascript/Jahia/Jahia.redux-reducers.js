import {createActions, handleAction} from 'redux-actions';

export const jahiaReduxReducers = (registry, jahiaCtx) => {
    const {setSite, setLanguage} = createActions('SET_SITE', 'SET_LANGUAGE');
    const siteReducer = handleAction(setSite, (state, action) => action.payload, 'systemsite');
    const languageReducer = handleAction(setLanguage, (state, action) => action.payload, jahiaCtx.uilang);

    registry.add('redux-reducer', 'site', {
        reducer: siteReducer,
        actions: {
            setSite
        }
    });

    registry.add('redux-reducer', 'language', {
        reducer: languageReducer,
        actions: {
            setLanguage
        }
    });
};
