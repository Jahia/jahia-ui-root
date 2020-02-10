import PropTypes from 'prop-types';
import {registry} from '@jahia/ui-extender';
import './Jahia.routes';
import './Workflow/Workflow.routes';
import './PageComposer/PageComposer.routes';
import {jahiaApps} from './Jahia.app';
import {jahiaRedux} from './Jahia.redux';

const JahiaContainer = ({jahiaCtx}) => {
    jahiaApps(registry, jahiaCtx);
    jahiaRedux(registry, jahiaCtx);

    // App shell
    const apps = registry.find({type: 'app', target: 'root'}).map(m => m.render);
    const render = apps.reduceRight((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)), value => value);

    return render();
};

JahiaContainer.propTypes = {
    jahiaCtx: PropTypes.object
};

export default JahiaContainer;
