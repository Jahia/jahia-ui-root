const uiLangRegexp = /\$ui-lang\(\[([-a-zA-Z,]+)\],([-a-zA-Z]+)\)/g;

export const transformLink = (link, siteInfo, displayLanguage) => {
    return link
        .replace('$site-servername', siteInfo.serverName)
        .replace('$dx-version', window.contextJsParameters.version)
        .replace(uiLangRegexp, (_, availableLanguage, fallbackLanguage) => {
            if (availableLanguage.split(',').includes(displayLanguage)) {
                return displayLanguage;
            }

            return fallbackLanguage;
        });
};
