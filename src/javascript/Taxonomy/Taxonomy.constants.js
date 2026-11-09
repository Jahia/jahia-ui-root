// Route serving the Taxonomy app (level 1 navigation entry)
export const TAXONOMY_ROUTE = '/taxonomy';

/*
 * Registry target that level 2 navigation entries must register into. Contributing modules register
 * their own, so an entry simply disappears with the module that owns it - there is nothing here to
 * keep in step:
 *
 *   registry.add('taxonomyAccordionItem', 'myEntry', {
 *       targets: ['taxonomy:60'],
 *       icon: <MyIcon/>,
 *       label: 'my-module:taxonomy.myEntry',
 *       routeRender: (routeProps, item) => <MyApp/>, // or iframeUrl, for a server-rendered panel
 *       onSelect: item => ...,                       // optional, when the entry owns its navigation
 *       renderNavHeader: item => ...,                // optional extra controls in the level 2 header
 *       requiredPermission: 'myPermission',          // optional
 *       requireModuleInstalledOnSite: 'myModule'     // optional
 *   });
 */
export const TAXONOMY_ACCORDION_TARGET = 'taxonomy';
export const TAXONOMY_ACCORDION_TYPE = 'taxonomyAccordionItem';
