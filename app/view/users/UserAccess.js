/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.users.UserAccess', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.users_useraccess',
    columns: [{
            text: 'Access',
            dataIndex: 'access_for',
            flex: 1
        }, {
            text: 'Read',
            align: 'center',
            dataIndex: 'read',
            renderer: function (value) {
                var image;
                value ? image = '<img src="resources/images/tick.png" />' : image = '<img src="resources/images/cross.png"/>';
                return image;
            }
        }, {
            text: 'Write',
            align: 'center',
            dataIndex: 'write',
            renderer: function (value) {
                var image;
                value ? image = '<img src="resources/images/tick.png" />' : image = '<img src="resources/images/cross.png"/>';
                return image;
            }
        }]
})

