Ext.define('CaptivePortal.view.users.UserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userlistcontroller',
     listen: {
        component: {
            'button#btn_adduser': {
                click: 'showAddEditMaster'
            }
        }
    },
    showAddEditMaster: function () {
        this.fireEvent('showAddEditMaster', this);
    },
    getUsers: function () {
        var store = this.getView().lookupReference('grd_userlist').getStore();
        store.load();
        store.on('load', function (store, record) {
            console.log(store, record);
        })
    },
})