Ext.namespace("idxm.create.provider.ux.window.SearchResultsHardError");
idxm.create.provider.ux.window.SearchResultsHardError = function (config){	
	var msg = 'Access cannot be added for the provider you selected:';
		      
	if(config.message) {
		msg = config.message;
	}
			
	var win = new Ext.Window({
				id: 'searchResultsHardErrorWindow',
				width:475,
				height:205,
				closable:false,
				modal:true,
				autoScroll:true,
				resizable:false,
				layout:'fit',
				plain:true,
				items:[{
						xtype:"panel"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,autoScroll:true
						,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"		
						,items:[{
								xtype:"idxmStatusBox"
								,status:"warning"
								,statusText:'Hard Error'
							},{
								xtype: "panel"
								,style:"padding-left:10px; padding-top:25px; padding-bottom:10px;"
								,html: '<div class="portal-text-medium">'+msg+'</div>'								
							}]
						,buttons:[{
							ctCls : "support-portal-btn"
							,text:"OK"
							,handler:function(){win.close();}
						}]
					}]
			});
	win.show();
};