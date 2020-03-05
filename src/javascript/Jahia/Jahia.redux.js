import {createActions, handleAction} from 'redux-actions';

export const jahiaRedux = (registry, jahiaCtx) => {
    const {setSite, setLanguage, setUiLanguage} = createActions('SET_SITE', 'SET_LANGUAGE', 'SET_UI_LANGUAGE');

    const siteReducer = handleAction(setSite, (state, action) => action.payload, jahiaCtx.siteKey ? jahiaCtx.siteKey : 'systemsite');
    const languageReducer = handleAction(setLanguage, (state, action) => action.payload, jahiaCtx.uilang);
    const uiLanguageReducer = handleAction(setUiLanguage, (state, action) => action.payload, jahiaCtx.uilang);

    registry.add('redux-reducer', 'site', {
        targets: ['root'],
        reducer: siteReducer,
        actions: {
            setSite
        }
    });

    registry.add('redux-reducer', 'language', {
        targets: ['root'],
        reducer: languageReducer,
        actions: {
            setLanguage
        }
    });

    registry.add('redux-reducer', 'uilang', {
        targets: ['root'],
        reducer: uiLanguageReducer,
        actions: {
            setUiLanguage
        }
    });
};
