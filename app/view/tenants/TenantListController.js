Ext.define('CaptivePortal.view.tenants.TenantListController',{
	extend:'Ext.app.ViewController',
	alias:'controller.tenantlistcontroller',
	listen: {
    component: {
      'button#btn_addtenant': {
        click: 'showAddEditTenant'
      }
    }
	},
	showAddEditTenant: function () {
		this.fireEvent('showAddEditTenant', this);
  },
	getTenantList:function(){
		var store = this.getView().lookupReference('grd_tenantlist').getStore();
		store.load();
		store.on('load',function(store,record){
			Ext.getCmp('viewport').setLoading(false);
			console.log(record)
		})
	},
	userItemClick: function (view, record, item, index, e, eOpts) {
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_USER + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        var record = this.createUserModel(resObj.data.user_profile, true);
                        var tenant = record.data.tenant_id
                        console.log(record)
                      //  CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.AddOrEditUser', this, {
                            //roleData: resObj.data.roles, tenantData: resObj.data.tenants, sites: resObj.data.sites, user_id: resObj.data.user_profile.id});
                        var tenantStr = Ext.StoreManager.lookup('CaptivePortal.store.users.TenantList');
                        tenantStr.load();
                        tenantStr.on('load',function(str,rec){
                            console.log(rec)
                        })
                        var data = tenantStr.find('id',tenant);
                        var form = Ext.ComponentQuery.query('#userform')[0];
                        form.loadRecord(record);
                        //this.getAllRoles();
                        this.selectRole(form.down('#role'));
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteUser(view, record, item, index, e, eOpts);
            }
        }
    },
    deleteUser: function (view, record, item, index, e, eOpts) {
        Ext.Msg.show({
            title: 'Delete Tenant',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                	Ext.getCmp('viewport').setLoading(true);
					var url = CaptivePortal.Config.SERVICE_URLS.DELETE_TENANT + record.data.id + '.json';
					CaptivePortal.util.Utility.doAjax(url,{},function(response){
						var resObj = Ext.decode(response.responseText);
						if(resObj.success){
							this.getTenantList();
						}
					}.bind(this),function(response){},'DELETE');
				} else if (btn === 'no') {
					
				}
            }.bind(this)
        });
    }

});