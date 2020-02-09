import {createActions, handleAction} from 'redux-actions';

export const jahiaReduxReducers = (registry, jahiaCtx) => {
    const {setSite, setLanguage, setUiLanguage} = createActions('SET_SITE', 'SET_LANGUAGE', 'SET_UI_LANGUAGE');

    const siteReducer = handleAction(setSite, (state, action) => action.payload, 'systemsite');
    const languageReducer = handleAction(setLanguage, (state, action) => action.payload, jahiaCtx.uilang);
    const uiLanguageReducer = handleAction(setUiLanguage, (state, action) => action.payload, jahiaCtx.uilang);

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

    registry.add('redux-reducer', 'uilang', {
        reducer: uiLanguageReducer,
        actions: {
            setUiLanguage
        }
    });
};
