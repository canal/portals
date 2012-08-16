		</div>
		<script>
			new Ext.Viewport	({
					id:'g_extviewportid'
					,layout:'border'
					,border:false
					,bodyBorder:false
					,items: [{	
								region: 'north'		
								,contentEl: 'northRegionDiv'
								,height:95
								,bodyStyle:"padding-top:2px;"
								,border: false
								,bodyBorder: false									
							},{
								region: 'center'
								,contentEl: 'centerRegionDiv'										
								,autoScroll: true
								,bodyStyle:"padding:7px;"
								,border: false
								,bodyBorder: false
							}]								
				}); 			
		</script>
	</body>
</html>