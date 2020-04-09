import {transformLink} from './links.utils';

describe('links utils', () => {
    describe('transformLink', () => {
        it('should replace dx-version', () => {
            window.contextJsParameters = {
                version: '8.6.0'
            };
            const link = 'http://jahia.com/$dx-version';
            const siteInfo = {
                serverName: 'basket'
            };
            const displayLanguage = 'fr';
            expect(transformLink(link, siteInfo, displayLanguage)).toEqual('http://jahia.com/8.6.0');
        });

        it('should replace serverName', () => {
            window.contextJsParameters = {
                version: '8.0.0'
            };
            const link = 'http://jahia.com/$site-servername';
            const siteInfo = {
                serverName: 'snickers'
            };
            const displayLanguage = 'fr';
            expect(transformLink(link, siteInfo, displayLanguage)).toEqual('http://jahia.com/snickers');
        });

        it('should replace generate link with current displayLanguage', () => {
            window.contextJsParameters = {
                version: '8.0.0'
            };
            const link = 'http://jahia.com/$site-servername/$dx-version/$ui-lang([en,fr],fr)';
            const siteInfo = {
                serverName: 'snickers'
            };
            const displayLanguage = 'en';
            expect(transformLink(link, siteInfo, displayLanguage)).toEqual('http://jahia.com/snickers/8.0.0/en');
        });

        it('should replace generate links', () => {
            window.contextJsParameters = {
                version: '8.0.0'
            };
            const link = 'http://jahia.com/$site-servername/$dx-version/$ui-lang([en,fr],fr)/$ui-lang([it,fr],fr)';
            const siteInfo = {
                serverName: 'snickers'
            };
            const displayLanguage = 'en';
            expect(transformLink(link, siteInfo, displayLanguage)).toEqual('http://jahia.com/snickers/8.0.0/en/fr');
        });

        it('should replace generate link with current fallback language', () => {
            window.contextJsParameters = {
                version: '8.0.0'
            };
            const link = 'http://jahia.com/$site-servername/$dx-version/$ui-lang([fr,it],fr)';
            const siteInfo = {
                serverName: 'snickers'
            };
            const displayLanguage = 'en';
            expect(transformLink(link, siteInfo, displayLanguage)).toEqual('http://jahia.com/snickers/8.0.0/fr');
        });
    });
});
