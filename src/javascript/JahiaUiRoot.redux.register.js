import {createActions, handleAction} from 'redux-actions';

let reduxStoreCurrentValue;
let clearUpdateGWTParametersInterval;
let updateGWTParameters = function (previousValue, currentValue) {
    let authoringApi = window.authoringApi;
    if (authoringApi !== undefined) {
        if (clearUpdateGWTParametersInterval !== undefined) {
            clearInterval(clearUpdateGWTParametersInterval);
            clearUpdateGWTParametersInterval = undefined;
        }

        if (previousValue === undefined || currentValue.site !== previousValue.site) {
            if (authoringApi.switchSite !== undefined) {
                authoringApi.switchSite(currentValue.site, currentValue.language);
            }
        }

        if (previousValue === undefined || currentValue.language !== previousValue.language) {
            if (authoringApi.switchLanguage !== undefined) {
                authoringApi.switchLanguage(currentValue.language);
            }
        }
    }
};

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

    let uiRootReduxStoreListener = store => () => {
        if (window.authoringApi === undefined) {
            reduxStoreCurrentValue = store.getState();
            // Authoring api is not set when loading
            clearUpdateGWTParametersInterval = setInterval(() => {
                updateGWTParameters(undefined, store.getState());
            }, 100);
        } else {
            let previousValue = reduxStoreCurrentValue;
            reduxStoreCurrentValue = store.getState();
            updateGWTParameters(previousValue, reduxStoreCurrentValue);
        }
    };

    registry.add('redux-listener', 'site', {createListener: uiRootReduxStoreListener});
};
