Ext.define('CaptivePortal.view.radius_vsa.RadiusVSAAddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.radius_vsa_add_controller',
    id: 'vc_radius_vsa_add_controller',
    listen:{
        controller: {
            '#vc_radius_vsa_maincontroller':{
                initiateForm:'initiateForm',
                loadRecToRadius:'loadRecToRadius'
            }
        }
    },
    loadRecToRadius:function(data){
        this.initiateForm();
        var rec = Ext.create('CaptivePortal.model.radius_vsa.RadiusVSA',data.radius_vsa);
        var form = this.getView().down('form');
        form.loadRecord(rec);
        form.down('grid').store.loadRawData(data.radius_vsa.vsa_attributes);
        form.down('#btn_save_radius_vsa').setText('Update');
    },
    cancelRSA: function(){
        this.fireEvent('setRadiusVSAActiveItem', 0);
        Ext.ComponentQuery.query('#lab_appheading')[0].setText('Radius VSA'); 
    },
    initiateForm: function(){
        var form = this.getView().down('form');
        form.reset();
        form.down('grid').store.removeAll();
        form.down('#btn_save_radius_vsa').setText('Create');
    },
    generateRecs: function(isDel, recs){
        var reqRecs = [];
        Ext.Array.each(recs, function(r, index){
            var obj = {};
            for(var key in r.data){
                obj[key] = r.data[key];
            }
            if(r.phantom){
                delete obj['id'];
            } 
            if(isDel){
                obj['_destroy'] = true;
            }
            reqRecs.push(obj)
        }.bind(this));
        return reqRecs;
    },
    saveRadius:function(btn){
        var form = btn.up('form'), data, isEdit = false;
        if(form.isValid()){
            data = form.getValues(), url = CaptivePortal.Config.SERVICE_URLS.SAVE_RADIUS_VSA,
            method = 'POST';
            if(data.id){
                isEdit = true;                
            } else{
                delete data['id'];
            }
            var gridValues = this.generateRecs(false, form.down('grid').store.data.items);
            var param = {
                radius_vsa:data                
            }
            param.radius_vsa['vsa_attributes_attributes'] = gridValues;
            if(isEdit){
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_RADIUS_VSA + param.radius_vsa.id + '.json';
                method = 'PUT'; 
                param.radius_vsa['vsa_attributes_attributes'] = gridValues.concat(this.generateRecs(true, form.down('grid').store.getRemovedRecords()));
            }
            CaptivePortal.util.Utility.doAjaxJSON(url, param, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                       this.fireEvent('setRadiusVSAActiveItem', 0);
                       this.fireEvent('loadRadiusList');
                       Ext.ComponentQuery.query('#lab_appheading')[0].setText('Radius VSA'); 
                    }
                }.bind(this), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (!resObj.success && resObj.error.length) {
                        CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                    }
                }, method);
        }
    },
    removeSelectedRecords: function(btn){
        var grid = btn.up('gridpanel');
        var selected = grid.getSelectionModel().getSelection();
        grid.store.remove(selected);
    },
    addVSAAttribute: function(btn){
        var rec = Ext.create('CaptivePortal.model.radius_vsa.VSAAttribute');
        var store = btn.up('grid').store;
        store.insert(store.getCount(), rec);
    }
});