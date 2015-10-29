/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.home.Heading', {
    extend: 'Ext.container.Container',
    alias:'widget.home_appheader',
    width: '100%',
    margin: '30 0 0 10',   
    items: [{
            xtype: 'label',
            reference: 'lab_heading',
            itemId:'lab_appheading',
            style: 'border-top: 4px #1fa1eb solid;font-weight: 400;color: #535151;font-size: 21px;padding: 5px 0 0 0;',
            text: ''
        }]

})

