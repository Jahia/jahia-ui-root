function actions(registry) {

    registry.add('action_test', {
        type: 'action',
        label: 'Test',
        target: ['nav-apps:1'],
        link: '/test'
    });

}

export default actions;
