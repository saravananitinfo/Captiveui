/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.store.Template', {
    extend: 'Ext.data.Store',
    fields: ['id', 'imgsrc'],
    data: [{
            id: 1,
            imgsrc: 'resources/images/a01.png'
        }, {
            id: 2,
            imgsrc: 'resources/images/a02.png'
        }]
})

