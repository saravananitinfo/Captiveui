Ext.define('CaptivePortal.view.guest_users.GuestUserController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.guest_user',
    cancelGuestUser: function () {
        var me = this;
        me.fireEvent('setGuestUsersMainActiveItem', 0);
        Ext.StoreManager.lookup('CaptivePortal.store.guest_user.GuestUsers').reload();
    }
});