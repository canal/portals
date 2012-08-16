Ext.namespace("IDXM.CreateUser.ProviderUser.CreateProviderWizard");
IDXM.CreateUser.ProviderUser.CreateProviderWizard = function (config){

	
	this.id = 'createProviderWizard';
//	this.actionUrls = uradixActionUrl({"Actions":config.Actions, "RenderUrl":config.RenderUrl});
	this.blnReadUser = (config.ProviderUserData != null && (config.ProviderUserData.userList)) ? true:false;
	this.title = this.blnReadUser ? "Add Access for " + config.ProviderUserData.Name : "Create a Provider User";
	this.accessType = "";
	this.newSearchPerformed = false;
	this.searchProviderCriteria = {};
	this.searchProviderResultsPayload = {};
	this.providerUserSummaryData = {};
	this.selectedProvider = {};	
	this.userDetails = {};
	Ext.History.init();
	
	this.DisplayStep = function(step) {
		var wizardContainer = Ext.getCmp("createProviderWizardContainer");
		wizardContainer.layout.setActiveItem(step);
		Ext.History.add(step);
	};
	
	Ext.History.on('change', function(token){
		var wizardContainer = Ext.getCmp("createProviderWizardContainer");
		if(token == null || token == '')
		{
			wizardContainer.layout.setActiveItem("ProviderUserDetailsStep");
		}
		else
		{
			wizardContainer.layout.setActiveItem(token);
		}
	});
	
	this.ProviderSearchResultsGridBuild = function(config) {
		
		var selectPracPanel = Ext.getCmp('selectPracTitle');
		var selectGroupPanel = Ext.getCmp('selectGroupTitle');
		
		if(this.accessType == 'prac')
		{				
			selectPracPanel.show();
			selectGroupPanel.hide();
			return new idxm.create.provider.ux.results.ProviderPracSearchResultsGrid(config);
		}
		else
		{			
			selectGroupPanel.show();
			selectPracPanel.hide();
			return new idxm.create.provider.ux.results.ProviderGroupSearchResultsGrid(config);
		}
	};
	
	var breadCrumbsCreate = [{text: "Add Account Details", handler: this.DisplayStep, context: this, step: 'ProviderUserDetailsStep'}
		,{text: "Search for Provider", handler: this.DisplayStep, context: this, step: 'ProviderUserSearchStep'}							
		,{text: "Select Provider", handler: this.DisplayStep, context: this, step: 'ProviderUserSearchResultsStep'}
		,{text: "Summary", handler: this.DisplayStep, context: this, step: "ProviderUserSummaryStep"}
		];
	var breadCrumbsGrant = [{text: "Search for Provider", handler: this.DisplayStep, context: this, step: 'ProviderUserSearchStep'}							
		,{text: "Select Provider", handler: this.DisplayStep, context: this, step: 'ProviderUserSearchResultsStep'}
		,{text: "Summary", handler: this.DisplayStep, context: this, step: "ProviderUserSummaryStep"}
		];
	
		
	config.title = this.title;
	
	config.createProviderParentObject = this;
	
	this.nextStep = function() {
		var providerWizardContainer = Ext.getCmp('createProviderWizardContainer');
		if(providerWizardContainer.layout.activeItem.id == 'ProviderUserDetailsStep')
		{
			var formPanel = Ext.getCmp("providerUserDetailsForm");
			var formObj = formPanel.getForm();
			
			var providerType = config.createProviderParentObject.accessType == 'prac'?'P':'G';			
			
			if(formObj.isValid()) {
				g_hideStatusBox();
				Ext.get(document.body.id).mask('<b> Create a Provider User...</b>', 'x-mask-loading');
				formObj.submit({
					url : config.Actions.doesUserExist,				
					clientValidation : true,
					isRedirect : false,
					params: {ProviderType: providerType},
					success : function(form, action) {
						
						var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
						Ext.get(document.body.id).unmask();
						
						config.doesUserExist = {};
						config.doesUserExist.sysKey = jsonResponse.sysKey;
						
						if(jsonResponse.userExists) {
							new idxm.create.provider.ux.window.ProviderUserAlreadyExist(config);							
						}
						else {
							config.createProviderParentObject.userDetails = formObj.getValues();
							config.createProviderParentObject.DisplayStep('ProviderUserSearchStep');
						}	
						
					},
					failure : function(form, action) {
						uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);					

						g_showStatusBox();
						Ext.get(document.body.id).unmask();
						formPanel.el.dom.scrollIntoView();					
					}
				});	
			}else{
				uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);
				g_showStatusBox();
				formPanel.el.dom.scrollIntoView();
			}
		}
		else if(providerWizardContainer.layout.activeItem.id == 'ProviderUserSearchStep')
		{
			if(config.createProviderParentObject.accessType == 'prac')
			{
				config.createProviderParentObject.submitPracSearchForm();				
			} else {				
				config.createProviderParentObject.submitGroupSearchForm();				
			}		
		}
		else if(providerWizardContainer.layout.activeItem.id == 'ProviderUserSearchResultsStep')
		{	
			config.createProviderParentObject.setProviderAccess();			
		}
		else if(providerWizardContainer.layout.activeItem.id == 'ProviderUserSummaryDetailsStep')
		{	
			config.createProviderParentObject.createProviderUser();			
		}
	};
	
	this.cancelStep = function() {
		var providerWizardContainer = Ext.getCmp('createProviderWizardContainer');
		if(providerWizardContainer.layout.activeItem.id == 'ProviderUserSearchStep' ||
				providerWizardContainer.layout.activeItem.id == 'ProviderUserSearchResultsStep')
		{
			providerWizardContainer.layout.setActiveItem('ProviderUserDetailsStep');			
		}		
	};
	
	this.redirectToUserProfile = function (redirectUrl, sysKey) {
		var url = redirectUrl + "?systemUserId=" + sysKey;
		uRadixRedirectHandler.redirect(url);
	};
	
					
	var CreateProviderWizardContainer = new Ext.Panel({
		id: "createProviderWizardContainer",
		layout: 'card',
		renderTo: config.RenderToId,
		layoutOnCardChange: true,
		width: 1000,
		activeItem: 0,
		bodyBorder: false,
		border : false,
		items: [{
					id: 'ProviderUserDetailsStep',
					bodyBorder: false,
					border: false,					
					items: [{bodyBorder: false, border: false, html: uRadixBreadCrumbs.BreadCrumbs({Step:"ProviderUserDetailsStep", Data:breadCrumbsCreate})},					        
							new idxm.create.provider.ux.panel.ProviderUserDetailsStep(config)
					]	
				},
				{
					id: 'ProviderUserSearchStep',
					bodyBorder: false,
					border: false,
					items: [/*{html: uradixBreadCrumbs("ProviderUserSearch", breadCrumbsCreate)},*/
					        {bodyBorder: false, border: false, html: uRadixBreadCrumbs.BreadCrumbs({Step:"ProviderUserSearchStep", Data:breadCrumbsCreate})},
					        new idxm.create.provider.ux.panel.ProviderSearchStep(config)
					    ]
				},
				{
					id: 'ProviderUserSearchResultsStep',
					bodyBorder: false,
					border: false,
					items: [/*{html: uradixBreadCrumbs("ProviderUserSearchResults", breadCrumbsCreate)},*/
					        {bodyBorder: false, border: false, html: uRadixBreadCrumbs.BreadCrumbs({Step:"ProviderUserSearchResultsStep", Data:breadCrumbsCreate})},
					        new idxm.create.provider.ux.panel.ProviderSearchResultsStep(config)
				        ],
			        listeners: {
						show : function(){
							var resultsStepPanel = Ext.getCmp('providerSearchResults');
							
							if(config.createProviderParentObject.newSearchPerformed)
							{
								resultsStepPanel.remove('pracSearchResultsGrid');
								resultsStepPanel.remove('groupSearchResultsGrid');
							}							
							
							var searchResultsGrid = config.createProviderParentObject.ProviderSearchResultsGridBuild(config);
							resultsStepPanel.add(searchResultsGrid);
							resultsStepPanel.doLayout();
						}						
					}
				},
				{
					id: 'ProviderUserSummaryDetailsStep',
					bodyBorder: false,
					border: false,
					items: [{bodyBorder: false, border: false, html: uRadixBreadCrumbs.BreadCrumbs({Step:"ProviderUserSummaryDetailsStep", Data:breadCrumbsCreate})},
					        new idxm.create.provider.ux.panel.ProviderUserSummaryDetailsStep(config)]
					,
			        listeners: {
						show : function(){
							var summaryDetailsStepPanel = Ext.getCmp('providerUserSummaryDetails');
							summaryDetailsStepPanel.remove('providerUserSummaryDetailsView');
							
							summaryDetailsStepPanel.add(new idxm.create.provider.ux.panel.ProviderUserSummaryDetailsView(config));
							summaryDetailsStepPanel.doLayout();
						}						
					}
				}]
	
	});	
	
	this.submitPracSearchForm = function() {
		
		var formPanel = Ext.getCmp("providerSearchPracForm");
		var formObj = formPanel.getForm();
		
		var pracProviderId = Ext.getCmp('PRACPROVIDERID').getValue();
		config.createProviderParentObject.pracProviderId = pracProviderId;
		
		if(formObj.isValid()) {
			g_hideStatusBox();
			Ext.get(document.body.id).mask('<b> Searching for a Practitioner...</b>', 'x-mask-loading');
			formObj.submit({
				url : config.Actions.validateSearch,				
				clientValidation : true,
				isRedirect : false,
				success : function(form, action) {
					
					var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
					Ext.get(document.body.id).unmask();
					
					config.createProviderParentObject.newSearchPerformed = true;
					config.createProviderParentObject.DisplayStep('ProviderUserSearchResultsStep');
					
					var pracResultsGrid = Ext.getCmp('pracSearchResultsGrid');
//					pracResultsGrid.store.load({params:{start:0, limit:25}});
					pracResultsGrid.store.load({});
				},
				failure : function(form, action) {
					uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);					

					g_showStatusBox();
					Ext.get(document.body.id).unmask();
					formPanel.el.dom.scrollIntoView();					
				}
			});	
		}else{
			uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);
			g_showStatusBox();
			formPanel.el.dom.scrollIntoView();
		}
	};
	
	this.submitGroupSearchForm = function () {
		
		var formPanel = Ext.getCmp("providerSearchGroupForm");
		var formObj = formPanel.getForm();
		
		var groupProviderId = Ext.getCmp('GROUPPROVIDERID').getValue();
		config.createProviderParentObject.groupProviderId = groupProviderId;
		
		if(formObj.isValid()) {
			g_hideStatusBox();
			Ext.get(document.body.id).mask('<b> Searching for a Group...</b>', 'x-mask-loading');
			formObj.submit({
				url : config.Actions.validateSearch,				
				clientValidation : true,
				isRedirect : false,
				success : function(form, action) {
					
					var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
					Ext.get(document.body.id).unmask();
					
					config.createProviderParentObject.newSearchPerformed = true;
					config.createProviderParentObject.DisplayStep('ProviderUserSearchResultsStep');
					
					var groupResultsGrid = Ext.getCmp('groupSearchResultsGrid');
//					groupResultsGrid.store.load({params:{start:0, limit:25}});
					groupResultsGrid.store.load();
					groupResultsGrid.getView().refresh();
				},
				failure : function(form, action) {
					uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);					

					g_showStatusBox();
					Ext.get(document.body.id).unmask();
					formPanel.el.dom.scrollIntoView();					
				}
			});	
		}else{
			uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);
			g_showStatusBox();
			formPanel.el.dom.scrollIntoView();
		}
	};
	
	this.setProviderAccess = function() {
		
		var providerType = config.createProviderParentObject.accessType == "prac"?"P":"G";
				
		if(providerType == 'P')
		{
			var pracResultsGrid = Ext.getCmp('pracSearchResultsGrid');
			var selectedRecord = pracResultsGrid.getSelectionModel().getSelected();
			
			config.createProviderParentObject.selectedProvider = selectedRecord.data;
		}
		else {
			var groupResultsGrid = Ext.getCmp('groupSearchResultsGrid');
			var selectedRecord = groupResultsGrid.getSelectionModel().getSelected();
			
			config.createProviderParentObject.selectedProvider = selectedRecord.data;
		}
		
		
		var name = config.createProviderParentObject.selectedProvider.name;
		var npi = config.createProviderParentObject.selectedProvider.npi;
		
		
		// Mask Body
		Ext.get(document.body.id).mask("<b> Set Provider Access...</b> ", "x-mask-loading");
		
		Ext.Ajax.request({
		   url: config.Actions.setProviderAccess,
		   method: 'POST',
		   params: {
			   ProviderName: name,
			   NPI: npi,
			   ProviderType: providerType
		   },
		   success: function(result, request) 
   	    	{	
			   	Ext.get(document.body.id).unmask();
				var response = uRadixUtilities.jsonDecode(result.responseText);
				
				if(response.status.statusCD == 'C' && response.advice[0].adviceCD == 'P')
				{
					if(response.adviceComment && response.adviceComment == 'Exists')
					{
						new idxm.create.provider.ux.window.SearchResultsSoftError(config);
					}
					else
					{
						config.createProviderParentObject.providerUserSummaryData = response.userDetails;
						
						config.createProviderParentObject.DisplayStep('ProviderUserSummaryDetailsStep');
					}
				}
				else if(response.status.statusCD == 'C' && response.advice[0].adviceCD == 'A')
				{
					new idxm.create.provider.ux.window.SearchResultsHardError(config);
				}
	   	    },
		   failure: function(result, request)
	   	    {
	    			Ext.get(document.body.id).unmask();
	   	    }
		});				
	};
	
	this.createProviderUser = function() {
		
		var formPanel = Ext.getCmp('providerUserSummaryDetailsView');
		var formObj = formPanel.getForm();
		
		
		if(formObj.isValid())
		{
			// Mask Body
			Ext.get(document.body.id).mask("<b> Creating a Provider User...</b> ", "x-mask-loading");
			
			formObj.submit({
				url : config.Actions.createProviderUser,
				isRedirect : true,
				adviceDescription : 'User Created', 
				success : function(form, action) {
					
					var jsonResponse = uRadixUtilities.jsonDecode(action.response.responseText);
					Ext.get(document.body.id).unmask();
					
					var sysKey = jsonResponse.User.User.PrimaryIdentity.IdentityIdentifier.SysKey;
					
					uRadixClientMessageHandler.setAdvice(false,[{"description":"User Created"}]);
					
					config.createProviderParentObject.redirectToUserProfile(config.RedirectUrl, sysKey);
															
				},
				failure : function(form, action) {
					uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);					

					g_showStatusBox();
					Ext.get(document.body.id).unmask();
					formPanel.el.dom.scrollIntoView();					
				}
			});	
		} else {
			uRadixClientMessageHandler.setAdvice(false,[{"description":"Error(s) Encountered"}]);
			g_showStatusBox();
			formPanel.el.dom.scrollIntoView();
		}
		
		
		
		
	};
};