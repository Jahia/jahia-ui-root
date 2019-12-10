var react = require('react');
var reacti18next = require('react-i18next');

module.exports = {
    getI18n: reacti18next.getI18n,
    withTranslation: () => Component => props => <Component t={k => k} {...props}/>,
    useTranslation: () => ({t: key => key}),
    I18nextProvider: reacti18next.I18nextProvider,
};
