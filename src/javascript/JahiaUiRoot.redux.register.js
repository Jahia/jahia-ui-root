import {createActions, handleAction} from 'redux-actions';

export const jahiaRedux = (registry, jahiaCtx) => {
    const {setSite, setLanguage, setUiLanguage} = createActions('SET_SITE', 'SET_LANGUAGE', 'SET_UI_LANGUAGE');

    registry.add('redux-reducer', 'siteBase', {targets: ['site:1'], reducer: handleAction(setSite, (state, action) => action.payload, jahiaCtx.site ? jahiaCtx.site : 'systemsite')});
    registry.add('redux-reducer', 'languageBase', {targets: ['language:1'], reducer: handleAction(setLanguage, (state, action) => action.payload, jahiaCtx.language)});

    let sitesReducers = registry.find({type: 'redux-reducer', target: 'site'});
    registry.add('redux-reducer', 'site', {
        targets: ['root'],
        reducer: (state, action) => sitesReducers.reduce((accState, r) => r.reducer(accState, action), state),
        actions: {
            setSite
        }
    });

    let languageReducers = registry.find({type: 'redux-reducer', target: 'language'});
    registry.add('redux-reducer', 'language', {
        targets: ['root'],
        reducer: (state, action) => languageReducers.reduce((accState, r) => r.reducer(accState, action), state),
        actions: {
            setLanguage
        }
    });

    registry.add('redux-reducer', 'uilang', {
        targets: ['root'],
        reducer: handleAction(setUiLanguage, (state, action) => action.payload, jahiaCtx.uilang),
        actions: {
            setUiLanguage
        }
    });

    registry.add('redux-action', 'setSite', {action: setSite});
    registry.add('redux-action', 'setLanguage', {action: setLanguage});
    registry.add('redux-action', 'setUiLanguage', {action: setUiLanguage});

    let uiRootReduxStoreListener = store => {
        let updateGWTParameters = currentValue => {
            let authoringApi = window.authoringApi;
            if (authoringApi && authoringApi.switchSite && authoringApi.switchLanguage) {
                if (clearUpdateGWTParametersInterval) {
                    clearInterval(clearUpdateGWTParametersInterval);
                    clearUpdateGWTParametersInterval = undefined;
                }

                let language = window.overrideLang || currentValue.language;

                authoringApi.switchLanguage(language);
                authoringApi.switchSite(currentValue.site, language);
            }
        };

        let clearUpdateGWTParametersInterval = setInterval(() => {
            updateGWTParameters(store.getState());
        }, 100);
        return () => {
            updateGWTParameters(store.getState());
        };
    };

    registry.add('redux-listener', 'site', {createListener: uiRootReduxStoreListener});
};
