Ext.define('CaptivePortal.view.accesstimepolicy.AccessTimePolicyEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.accesstimepolicyedit',
    intervalTime:15,
    fromMinValue: '12:00 AM',
    fromMaxValue: '11:30 PM',
    toMinValue: '12:15 AM',
    toMaxValue: '11.45 AM',
    minTime:'',    
    id:'vc_access_time_policy_edit_controller',
    listen:{
            controller : {
                '#vcaccess_time_policy_maincontroller': {
                loadSitesData: 'loadSitesCombo',
                resetTimePolicyForm:'resetTimePolicyForm',
                loadDataToPolicyForm:'loadDataToPolicyForm'
            }
    	}
    },

    formatData:function(recs){
        Ext.Array.each(recs, function(rec){
            if(rec.from){
                var fromTime = rec.from.split(':');
                rec['from'] = new Date(2008, 0, 1, parseInt(fromTime[0]), parseInt(fromTime[1]));
            }
            if(rec.to){
                var toTime = rec.to.split(':');
                rec['to'] = new Date(2008, 0, 1, parseInt(toTime[0]), parseInt(toTime[1]));
            }
            if(rec.start_date){                
                rec['start_date'] = new Date(rec.start_date);
            }
            if(rec.end_date){                
                rec['end_date'] = new Date(rec.end_date);
            }
            if(rec.date){                
                rec['date'] = new Date(rec.date);
            }


        }.bind(this));
        return recs;
    },
    loadDataToPolicyForm:function(data){
        var form = this.getView().down('form');
        var model = Ext.create('CaptivePortal.model.accesstimepolicy.TimePolicy', data.time_policy);
        form.loadRecord(model);
        if(data.time_policy.site_info && data.time_policy.site_info.id){
            form.down('#site_combo').setValue(data.time_policy.site_info.id);
        }
        form.down('#time_policy_day_grid').store.loadRawData(this.formatData(data.time_policy.default_policies));
        form.down('#time_policy_date_range_grid').store.loadRawData(this.formatData(data.time_policy.date_range_policies));
        form.down('#time_policy_specific_day_grid').store.loadRawData(this.formatData(data.time_policy.date_policies));
    },
    removeSelectedRecords: function(btn){
        var grid = btn.up('gridpanel');
        var selected = grid.getSelectionModel().getSelection();
        grid.store.remove(selected);
    },

    resetTimePolicyForm: function(){
        this.getView().down('form').reset();
        Ext.Array.each(this.getView().query('gridpanel'), function(g){
            g.up('panel').collapse();
            g.store.loadRawData([]);
        }.bind(this))
    },

    cancelAccessTimePolicy: function(){
        this.fireEvent('setTimePolicyActiveItem', 0);
    },
    loadSitesCombo: function(data){
        this.getView().down('#site_combo').store.loadRawData(data.sites);
    },

    saveTimePolicy: function(btn){
        this.saveData(btn);
    },

    getDataForSpecificDayRangeGrid:function(grid, isEdit){
        var store = grid.getStore(), rec = [];
        store.each(function(r){
            var d = {}, from =  r.get('from'), to = r.get('to'), date = r.get('date');            
            d['from'] = from ? Ext.Date.format(new Date(from),'H:i') : '';
            d['to'] = to ? Ext.Date.format(new Date(to),'H:i') : '';
            d['available'] = r.get('available');
            d['date'] = date ? Ext.Date.format(new Date(date),'m/d/Y') : '';
            if(isEdit && !r.phantom) {
                d['id'] = r.get('id');
            }
            rec.push(d);
        }.bind(this));
        return rec;
    },

    getDataForDateRangeGrid:function(grid, isEdit){
        var store = grid.getStore(), rec = [];
        store.each(function(r){
            var d = {}, from =  r.get('from'), to = r.get('to'), start = r.get('start_date'), end = r.get('end_date');            
            d['from'] = from ? Ext.Date.format(new Date(from),'H:i') : '';
            d['to'] = to ? Ext.Date.format(new Date(to),'H:i') : '';
            d['available'] = r.get('available');
            d['start_date'] = start ? Ext.Date.format(new Date(start),'m/d/Y') : '';
            d['end_date'] = end ? Ext.Date.format(new Date(end),'m/d/Y') : '';
            if(isEdit && !r.phantom) {
                d['id'] = r.get('id');
            }
            rec.push(d);
        }.bind(this));
        return rec;
    },

    getDataForDayGrid:function(grid, isEdit){
        var store = grid.getStore(), rec = [];
        store.each(function(r){
            var d = {}, from =  r.get('from'), to = r.get('to');
            d['days'] = r.get('days');
            d['from'] = from ? Ext.Date.format(new Date(from),'H:i') : '';
            d['to'] = to ? Ext.Date.format(new Date(to),'H:i') : '';
            d['available'] = r.get('available');
            if(isEdit && !r.phantom) {
                d['id'] = r.get('id');
            }
            rec.push(d);
        }.bind(this));
        return rec;
    },

    getRemovedRecordsForSpecific:function(grid){
        var recs = [];
        var removedRecs = grid.store.getRemovedRecords();
        Ext.Array.each(removedRecs, function(r){
            if(!r.phantom && r.data.id.indexOf('model') == -1 ){
                var d = {}, from =  r.get('from'), to = r.get('to'), date = r.get('date');            
                d['from'] = from ? Ext.Date.format(new Date(from),'H:i') : '';
                d['to'] = to ? Ext.Date.format(new Date(to),'H:i') : '';
                d['available'] = r.get('available');
                d['date'] = date ? Ext.Date.format(new Date(date),'m/d/Y') : '';
                d['id'] = r.get('id');
                d['_destroy'] = "true";
                recs.push(d);
            }
        }.bind(this));
        return recs;
    },
    getRemovedRecordsForDateRange:function(grid){
        var recs = [];
        var removedRecs = grid.store.getRemovedRecords();
        Ext.Array.each(removedRecs, function(r){
            if(!r.phantom && r.data.id.indexOf('model') == -1 ){
                var d = {}, from =  r.get('from'), to = r.get('to'), start = r.get('start_date'), end = r.get('end_date');            
                d['from'] = from ? Ext.Date.format(new Date(from),'H:i') : '';
                d['to'] = to ? Ext.Date.format(new Date(to),'H:i') : '';
                d['available'] = r.get('available');
                d['start_date'] = start ? Ext.Date.format(new Date(start),'m/d/Y') : '';
                d['end_date'] = end ? Ext.Date.format(new Date(end),'m/d/Y') : '';
                d['id'] = r.get('id');
                d['_destroy'] = "true";
                recs.push(d);
            }
        }.bind(this));
        return recs;
    },
    getRemovedRecordsForDays:function(grid){
        var recs = [];
        var removedRecs = grid.store.getRemovedRecords();
        Ext.Array.each(removedRecs, function(r){
            if(!r.phantom && r.data.id.indexOf('model') == -1 ){
                var d = {}, from =  r.get('from'), to = r.get('to');
                d['days'] = r.get('days');
                d['from'] = from ? Ext.Date.format(new Date(from),'H:i') : '';
                d['to'] = to ? Ext.Date.format(new Date(to),'H:i') : '';
                d['available'] = r.get('available');
                d['id'] = r.get('id');
                d['_destroy'] = "true";
                recs.push(d);
            }
        }.bind(this));
        return recs;
    },
   
    saveData:function(btn){
        var me = this;
        var form = btn.up('form'), data = {};
        if(form.isValid()){
            data = form.getValues(), isEdit = data.id ? true : false;    
            data['close_message'] = "sorry!!";
            data['default_policies_attributes'] = this.getDataForDayGrid(this.getView().down('#time_policy_day_grid'), isEdit);
            data['date_range_policies_attributes'] = this.getDataForDateRangeGrid(this.getView().down('#time_policy_date_range_grid'), isEdit);
            data['date_policies_attributes'] = this.getDataForSpecificDayRangeGrid(this.getView().down('#time_policy_specific_day_grid'), isEdit);
            if(isEdit){
                data['default_policies_attributes'] = data['default_policies_attributes'].concat(this.getRemovedRecordsForDays(this.getView().down('#time_policy_day_grid')));
                data['date_range_policies_attributes'] = data['date_range_policies_attributes'].concat(this.getRemovedRecordsForDateRange(this.getView().down('#time_policy_date_range_grid')));
                data['date_policies_attributes'] = data['date_policies_attributes'].concat(this.getRemovedRecordsForSpecific(this.getView().down('#time_policy_specific_day_grid')));
            } else{
                delete data['id'];
            }
            var param = {time_policy : data};

            if(!isEdit){
                CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.SAVE_ACCESS_TIME_POLICY, param, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        me.fireEvent('setTimePolicyActiveItem', 0);
                        me.fireEvent('loadTimePolicyGrid');
                    }
                }.bind(this), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (!resObj.success && resObj.error.length) {
                        CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                    }
                }, 'POST');
            } else {
                CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.UPDATE_ACCESS_TIME_POLICY + param.time_policy.id + '.json' , param, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        me.fireEvent('setTimePolicyActiveItem', 0);
                        me.fireEvent('loadTimePolicyGrid');
                    }
                }.bind(this), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (!resObj.success && resObj.error.length) {
                        CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                    }
                }, 'PUT');
            }
        }
    },
    addRowToDateSpecficDayGrid: function(btn){
        var model = Ext.create('CaptivePortal.model.accesstimepolicy.SpecificDay',{available : true});
        btn.up('gridpanel').store.insert(0,model);
    },
    addRowToDateRangeGrid: function(btn){
        var model = Ext.create('CaptivePortal.model.accesstimepolicy.DateRange',{available : true});
        btn.up('gridpanel').store.insert(0,model);
    },

    addRowToDayGrid: function(btn){
        var model = Ext.create('CaptivePortal.model.accesstimepolicy.Day',{available : true});
        btn.up('gridpanel').store.insert(0,model);
    }
})