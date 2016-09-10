$(document).one('pageinit', function(){

	showYourRuns();

	//Add Handlers
	$('#submitAddBtn').on('tap', addYourRun);

	$('#submitEditBtn').on('tap', editYourRun);

	$('#stats').on('tap','#deleteLink', deleteYourRun);

	$('#stats').on('tap','#editLink', setCurrent);

	$('#clearYourRuns').on('tap', clearYourRuns);
	
	
	/*
	 * Show the runs
	 */
	 function showYourRuns(){

		var numRuns = getRunsObject();

		if(numRuns != '' && numRuns != null){
			for(var i = 0;i < numRuns.length;i++){
				$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+numRuns[i]["date"]+
				' <br><strong>Distance: </strong>'+numRuns[i]["miles"]+'m<div class="controls">' +
				'<a href="#edit" id="editLink" data-miles="'+numRuns[i]["miles"]+'" data-date="'+numRuns[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+numRuns[i]["miles"]+'" data-date="'+numRuns[i]["date"]+'" onclick="return confirm(\'Are You Sure?\')">Delete</a></li>');
			}
			$('#home').on('pageinit', function(){
				$('#stats').listview('refresh');
			});
		} else {
			$('#stats').html('<p>You have no runs listed</p>');
		}
	 }
	 
	/*
	 * Add a run
	 */
	 function addYourRun(){
		var miles = $('#addMiles').val();
		var date = $('#addDate').val();

		var run = {
			date: date,
			miles: parseFloat(miles)
		};
		
		var numRuns = getRunsObject();

		numRuns.push(run);
		
		alert('Run Added');

		localStorage.setItem('numRuns', JSON.stringify(numRuns));

		window.location.href="index.html";
		
		return false;
	 }
	 
	 
	 /*
	 * Edit run
	 */
	 function editYourRun(){
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		
		var numRuns = getRunsObject();

		for(var i = 0;i < numRuns.length;i++){
			if(numRuns[i].miles == currentMiles && numRuns[i].date == currentDate){
				numRuns.splice(i,1);
			}
			localStorage.setItem('numRuns',JSON.stringify(numRuns));
		}

		var miles = $('#editMiles').val();
		var date = $('#editDate').val();

		var update_run = {
			date: date,
			miles: parseFloat(miles)
		};

		numRuns.push(update_run);
		
		alert('Run Updated');

		localStorage.setItem('numRuns', JSON.stringify(numRuns));

		window.location.href="index.html";
		
		return false;
	 }
	 
	 function clearYourRuns(){
		localStorage.removeItem('numRuns');
		$('#stats').html('<p>You have no runs listed</p>');
	 }
	 
	 
	 /*
	 * Delete run
	 */
	 function deleteYourRun(){
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));

		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');
		
		var numRuns = getRunsObject();

		for(var i = 0;i < numRuns.length;i++){
			if(numRuns[i].miles == currentMiles && numRuns[i].date == currentDate){
				numRuns.splice(i,1);
			}
			localStorage.setItem('numRuns',JSON.stringify(numRuns));
		}
		
		alert('Run Deleted');

		window.location.href="index.html";
		
		return false;
	 }
	 
	 
	 /*
	 * Get the runs object
	 */
	 function getRunsObject(){
		var numRuns = new Array();
		var currentRuns = localStorage.getItem('numRuns');

		if(currentRuns != null){
			var numRuns = JSON.parse(currentRuns);
		}

		return numRuns.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
	 }
	 
	 /*
	 * Set the current clicked miles and date
	 */
	 function setCurrent(){
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));

		$('#editMiles').val(localStorage.getItem('currentMiles'));
		$('#editDate').val(localStorage.getItem('currentDate'));
	 }
});