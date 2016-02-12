/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.report.ActiveSessionController',{
    extend:'Ext.app.ViewController', 
    alias:'controller.report_activesession',
    getReport:function(){
        var store = this.getView().lookupReference('grd_activesession').getStore();
        store.load();
    }
})

