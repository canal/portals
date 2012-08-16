function uRadixBreadCrumbHandlerObject () {
	  var steps = {};
	  var addHandler = function(currentId, currentStep) {
		  steps[currentId] = currentStep;
	  };
	  
	  var callHandler = function(currentId) {
		  var currentStep = steps[currentId];
		  if(currentStep) {
			  currentStep.handler.call(currentStep.context, currentStep.step);
		  }
	  };
	  
	  var clearHandler = function( ) {
		 steps = { }; 		   
	  };
	  	  
	  return {
		  clearHandler: clearHandler,
		  addHandler : addHandler,
		  callHandler : callHandler
	  };
  }

uRadixBreadCrumbHandler =  new uRadixBreadCrumbHandlerObject();

function uRadixBreadCrumbs()
{
  /*
   * This function implements the breadcrumbs on a page
   */
  this.BreadCrumbs = function(o)
  {	  
	  if(o.BlnDisplayCurrentStep == null || o.BlnDisplayCurrentStep == undefined)
	  {
		  o.BlnDisplayCurrentStep = true;
	  }
	  
	  if(o.BlnDisplayPreviousSteps == null || o.BlnDisplayPreviousSteps == undefined)
	  {
		  o.BlnDisplayPreviousSteps = true;
	  }
	  
	  if(o.BlnDisplayNextSteps == null || o.BlnDisplayNextSteps == undefined)
	  {
		  o.BlnDisplayNextSteps = true;
	  }
	  
	  var context = o.context;	  
	  var data = o.Data;
	  
	  var htmlTemp = '<div class="breadCrumbPanel">';
	  var futureMatch = false; 
	  var separators = '';
	  var className = '';
	  
	  for(var i=0; i<data.length; i++) {
		  
		  var currentstep = data[i];
		  var currentId = Ext.id();
		  
		  if(i < data.length-1)
		  {
			  separators = '<span class="breadCrumbSeparator-portal">&nbsp;&gt;&nbsp;</span>';
		  }
		  else {
			  separators = '';
		  }
		  
		  if(futureMatch || (o.Step == currentstep.step)) {
			  
			 
			  
			  if(futureMatch){
				  className = 'breadCrumbInactive-portal';
			  }else {
				  className = 'breadCrumbActive-portal';
			  }
			  
			  if((!futureMatch && o.BlnDisplayCurrentStep) || 
					  (futureMatch && o.BlnDisplayNextSteps))
			  {				  
				  htmlTemp += '<span class = "' + className + '">' + currentstep.text + '</span>' + separators;
			  }
			  
			  futureMatch = true;
			  
		  } else if(o.BlnDisplayPreviousSteps) {
			  
			  htmlTemp += '<a class="breadCrumb-portal" id="' + currentId +  '" href="#" onclick="javascript: uRadixBreadCrumbHandler.callHandler(&quot;' + currentId + '&quot;);return false;">' + currentstep.text + '</a>' + separators;
			  uRadixBreadCrumbHandler.addHandler(currentId, currentstep);			  
		  }
	  } 
	  
	  return htmlTemp + '</div>';
	 
  };  
};

uRadixBreadCrumbs = new uRadixBreadCrumbs();
