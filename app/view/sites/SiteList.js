Ext.define('CaptivePortal.view.sites.SiteList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.sites.SiteListController', 'CaptivePortal.store.site.Site'],
    alias: 'widget.sitelist',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
    controller: 'sitelistcontroller',
    listeners:{
      render:'getSite'  
    },
     initComponent: function(){
        var dockeditems = [{
                xtype: 'searchfield'
            }, {
                xtype: 'tbfill'
        }]
        var write = false;
        if (CaptivePortal.app.getAccessPermissionList() != undefined){
            console.log(CaptivePortal.app.getAccessPermissionList().filter(function(el){ return el.access_for == 'sites'}));
                 write = CaptivePortal.app.getAccessPermissionList().filter(function(el){ return el.access_for == 'sites'})[0].write
        }
        if(write){
            dockeditems.push({
                    xtype: 'button',
                    text: 'Add Site',
                    cls: 'btn-add-module',
                    itemId: 'btn_addsite'
                })
        }
        this.dockedItems= [{
            xtype: 'toolbar',
            padding: '30 30 0 30',
            dock: 'top',
            items: dockeditems
        }]

        var timezones = Ext.StoreManager.lookup('CaptivePortal.store.common.TimezoneStore')
        var grid_colunms = [
                    {
                        header: 'Name',
                        dataIndex: 'name',
                        width: '14.9%',
                        cls: 'table-row',
                       tdCls: 'table-cell',
                        renderer: function (value, metaData, rec, view) {
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            return value;
                        }
                    },
                    {
                        header: 'Tenant',
                        dataIndex: 'tenant',
                        width: '14.9%',
                         cls: 'table-row',
                        renderer: function (value, metaData, rec, view) {
                            var tenant = rec.get('tenant');
                            value = tenant ? tenant.name : '';
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            return value;
                        }
                    },
                    {
                        header: 'Time Zone',
                        dataIndex: 'timezone',
                        width: '29.9%',
                         cls: 'table-row',
                        renderer: function (value, metaData, rec, view) {
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            var record = timezones.findRecord('id', value);
                            return record ? record.data.name : value;
                        }
                    },
                    {
                        header: 'Tag',
                        dataIndex: 'tag',
                        width: '14.9%',
                         cls: 'table-row',
                        renderer: function (value, metaData, rec, view) {
                            var tag = rec.get('tag');
			    value = tag ? ((tag.name==null) ? '' : tag.name) : '';
                            //var userName = [];
                           // Ext.Array.each(users, function (r) {
                           //     userName.push(r.name)
                           // });
                           // value = userName.length ? userName.join() : "";
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            return value;
                        }
                    },
                    {
                        header: 'City',
                        dataIndex: 'city',
                        width: '14.9%',
                         cls: 'table-row',
                        renderer: function (value, metaData, rec, view) {
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            return value;
                        }
                    }]
                    if(write){
                        grid_colunms.push({
                                    header: 'Action',
                                     cls: 'table-row',
                                    renderer: function (value, metaData, rec, view) {
                                        return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                                    },
                                    width: '10%'
                                })
                    }
                this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_sitelist',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.site.Site',
                columns: grid_colunms,
                listeners: {
                    itemclick: 'editSiteItemClick'                    
                }
            }]
        this.callParent(arguments)
    }
})
        
