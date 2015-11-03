Ext.define('CaptivePortal.view.sites.SiteList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.sites.SiteListController', 'CaptivePortal.store.site.Site'],
    alias: 'widget.sitelist',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
    controller: 'sitelistcontroller',
    dockedItems: [{
            xtype: 'toolbar',
            padding: '30 30 0 30',
            dock: 'top',
            items: [{
                    xtype: 'searchfield'
                }, {
                    xtype: 'tbfill'
                }, {
                    xtype: 'button',
                    text: 'Add Site',
		    cls: 'btn-add-module',
                    itemId: 'btn_addsite'
                }]
        }],
    listeners: {
        //render: 'getSite'
    },
    initComponent: function () {
        this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_sitelist',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.site.Site',
                columns: [
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
                            return value;
                        }
                    },
                    {
                        header: 'Users',
                        dataIndex: 'users',
                        width: '14.9%',
			cls: 'table-row',
                        renderer: function (value, metaData, rec, view) {
                            var users = rec.get('users');
                            var userName = [];
                            Ext.Array.each(users, function (r) {
                                userName.push(r.name)
                            });
                            value = userName.length ? userName.join() : "";
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
                    },
                    {
                        header: 'Action',
			cls: 'table-row',
                        renderer: function (value, metaData, rec, view) {
                            return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                        },
                        width: '10%'
                    }

                ],
                listeners: {
                    itemclick: 'editSiteItemClick'                    
                }
            }]
        this.callParent(arguments)
    }
})
        
