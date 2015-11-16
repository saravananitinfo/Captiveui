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
        'CaptivePortal.store.role.Role',
	    'CaptivePortal.store.role.RoleAccess',
        'CaptivePortal.store.user.TenantList',
        'CaptivePortal.store.users.TenantList',
        'CaptivePortal.store.users.Site',
        'CaptivePortal.store.users.Role',
        'CaptivePortal.store.users.RoleAccess',
        'ProfileMenuList',
        'CaptivePortal.store.users.AccessPermission',
        'CaptivePortal.store.site.Site',
        'CaptivePortal.store.sms_gateway.SmsGatewayType',
        'CaptivePortal.store.sms_gateway.Sites',
        'CaptivePortal.store.sms_gateway.SMSGateways',
        'CaptivePortal.store.guest_user.GuestUsers',
        'CaptivePortal.store.access_point.AddAccessPoint',
        'CaptivePortal.store.access_point.Sites'
    ],
    launch: function () {
        // TODO - Launch the application
    }
});
