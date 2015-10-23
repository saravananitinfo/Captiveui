/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('CaptivePortal.Application', {
    extend: 'Ext.app.Application',
    
    name: 'CaptivePortal',

    stores: [
        'CaptivePortal.store.user.User',
        'CaptivePortal.store.tenant.Tenant',
        'CaptivePortal.store.role.Role'
    ],   
    
    launch: function () {
        // TODO - Launch the application
    }
});
