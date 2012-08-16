Ext.namespace("idxm.create.provider.ux.results.ProviderPracSearchResultsGrid");
idxm.create.provider.ux.results.ProviderPracSearchResultsGrid = function (config) {
	
	var sm = new Ext.grid.CheckboxSelectionModel({header:"",singleSelect:true, width:25});
	
	var columnModel = new Ext.grid.ColumnModel({
			columns:[
			         	sm,
	                 	{	
	                 		header: '<b>Practitioner Name</b>'
	             			,sortable: false
	             			,dataIndex:"name"
	             			,width: 200
	             			,renderer : function (value) { return "Dr. " + value; }
	                 	},{			        		         
	                 		header: '<b>NPI</b>'
	             			,sortable: false
	             			,dataIndex:"npi"
             				,width: 150
				       	 },{
				       		 header: '<b>Primary Address</b>'
			       			 ,sortable: false
	       				 	,dataIndex:"address"
	       				 	,width: 150
				       	 },{
				       		 header: '<b>State(s)</b>'
			       			 ,sortable: false
			       			 ,dataIndex:"state"
		       				,width: 100
		       				,renderer : function(value) {
		       							       					
		       					var statesObj = uRadixUtilities.jsonPath(value, "$.[*].Address.DomesticAddress.State.stateName");
		       					
		       					if(typeof statesObj == 'object') {
		       						return statesObj.getUnique().join();
		       					}
		       					
		       					return value;
		       					
		       				}
				       	 },{
				       		 header: '<b>Primary Specialty</b>'
			       			 ,sortable:false
			       			 ,dataIndex:"specialty"
		       				 ,width: 200
				       	 }/*,{
				       		 header: 'Confidence'
			       			 ,sortable:false
			       			 ,dataIndex:"confidence"			                	
				       	 }*/
			       	 ]
	      	,defaults: {sortable: true,menuDisabled: true}
	 });
	
	var searchReader = new Ext.data.JsonReader({
			root: 'searchResult.ProviderSearchResponseDetail.MatchingProviders'
			,fields: [
			          	{name: 'npi', mapping:'ProviderIdentifier.PractionerIdentifier.NPI'}
			          	,{name: 'name', mapping:'ProviderDetails.Practitioner.PersonalDetails.FirstName + " " + obj.ProviderDetails.Practitioner.PersonalDetails.LastName'}
			          	,{name: 'address',mapping:'OfficeList[0].Address.DomesticAddress.AddressLine1'}
			          	,{name: 'state',mapping:'OfficeList'}
					   	,{name: 'specialty', mapping: 'OfficeList[0].SpecialtyList[0].SpecialityName'}
					   	,{name: 'confidence',mapping:''}					   
				   	]	
			,totalProperty: 'searchResult.ProviderSearchResponseDetail.TotalMatchingRecords'
	});
	
	var provType = config.createProviderParentObject.accessType == "prac"?"P":"G";	
		
	var searchGridStore = new Ext.data.Store({
			        reader: searchReader
//				   ,proxy: new Ext.data.HttpProxy ({url:this.SEARCH_CASE_SUBMIT_URL})
			        ,proxy: new Ext.data.HttpProxy ({url:config.Actions.providerSearch})
				   //,remoteSort: true
				   	,baseParams: {
						ProviderID: config.createProviderParentObject.pracProviderId
						,ProviderType: provType
   					}	       	                  
	});
	
	var ProviderPracSearchResultsGrid = new Ext.grid.GridPanel({
	  frame: false
	  ,id: 'pracSearchResultsGrid'
	  //,cls:"idxm-grid"              
	  ,style:"padding-top:5px;"
	  ,width: 800
	  ,layout:'fit'
	  ,border:false
	  ,sm: sm
	  ,selModel: sm
	  ,colModel: columnModel
	  ,stripeRows:true
	  ,autoHeight:true
	  ,enableColumnMove:false
	  ,enableColumnResize:false              
	  ,loadMask:true
	  ,store: searchGridStore	  
	});
	
	return ProviderPracSearchResultsGrid;
	
};

Ext.namespace("idxm.create.provider.ux.results.ProviderGroupSearchResultsGrid");
idxm.create.provider.ux.results.ProviderGroupSearchResultsGrid = function (config) {

	var sm = new Ext.grid.CheckboxSelectionModel({header:"",singleSelect:true, width:25});
	
	var columnModel = new Ext.grid.ColumnModel({
		columns:[
			         sm,
	                 {	
	                	 header: 'Group/Contract Name'
	                	 ,sortable: false
	                	 ,dataIndex:"name"			                	 				                 
	                 },{			        		         
	                	 header: 'NPI'
	                	 ,sortable: false
	                	 ,dataIndex:"npi"			                	 
			       	 },{
			       		 header: 'Primary Address'
	       				 ,sortable: false
	       				 ,dataIndex:"address"
			       	 }
		       	 ]
      	,defaults: {sortable: true,menuDisabled: true}
	});

	var searchGridView = new Ext.grid.GridView({ 
		forceFit: true, 
		/*getRowClass : function (row, index) {               
			var cls = ''; 			
			var data = row.data; 
			if(isRowChangedToday(data.lastExternalModifyDate, data.lastModifyDate)) {
				cls = 'grid-row-highlight';
			}
			return cls;
		} 
		,*/emptyText:'<div align="center" class="casetrackingGridEmpty"><BR><b>No group facilities found.</b></div>'
	});
	
	var searchReader = new Ext.data.JsonReader({
			root: 'searchResult.ProviderSearchResponseDetail.MatchingProviders'
			,fields: [
			          	{name: 'npi', mapping:'ProviderIdentifier.PractionerIdentifier.NPI'}
//					   ,{name: 'name',mapping:'lastCloseDate'}
//					   ,{name: 'address',mapping:'priority'}					   
					   ]
			,totalProperty: 'searchResult.ProviderSearchResponseDetail.TotalMatchingRecords'
	});
	
	var provType = config.createProviderParentObject.accessType == "grp"?"G":"P";
	
	var searchGridStore = new Ext.data.Store({
			        reader: searchReader
				    ,proxy: new Ext.data.HttpProxy ({url:config.Actions.providerSearch})				   
				   //,remoteSort: true
				   ,baseParams: {
					   	ProviderID: config.createProviderParentObject.groupProviderId
					   	,ProviderType: provType
	   				}
    });
			
	var ProviderGroupSearchResultsGrid = new Ext.grid.GridPanel({
      frame: false
      ,id: 'groupSearchResultsGrid'
      //,cls:"idxm-grid"              
      ,style:"padding-top:5px;"
	  ,width: 800
      ,layout:'fit'
      ,border:false     
      ,colModel: columnModel
      ,stripeRows:true
      ,autoHeight:true
      ,enableColumnMove:false
      ,enableColumnResize:false              
      ,loadMask:true
      ,store: searchGridStore      
    });
	
	return ProviderGroupSearchResultsGrid;
};
