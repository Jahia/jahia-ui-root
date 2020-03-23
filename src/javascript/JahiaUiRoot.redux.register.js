import {createActions, handleAction} from 'redux-actions';

let clearUpdateGWTParametersInterval;
let reduxStoreCurrentValue;
let updateGWTParameters = function (currentValue) {
    let authoringApi = window.authoringApi;
    if (authoringApi && authoringApi.switchSite && authoringApi.switchLanguage) {
        let previousValue = reduxStoreCurrentValue;
        reduxStoreCurrentValue = {site: currentValue.site, language: currentValue.language};

        if (clearUpdateGWTParametersInterval) {
            clearInterval(clearUpdateGWTParametersInterval);
            clearUpdateGWTParametersInterval = undefined;
        }

        if (previousValue === undefined || currentValue.site !== previousValue.site) {
            authoringApi.switchSite(currentValue.site, currentValue.language);
        }

        if (previousValue === undefined || currentValue.language !== previousValue.language) {
            authoringApi.switchLanguage(currentValue.language);
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

    let uiRootReduxStoreListener = store => {
        clearUpdateGWTParametersInterval = setInterval(() => {
            updateGWTParameters(store.getState());
        }, 100);
        return () => {
            updateGWTParameters(store.getState());
        };
    };

    registry.add('redux-listener', 'site', {createListener: uiRootReduxStoreListener});
};
