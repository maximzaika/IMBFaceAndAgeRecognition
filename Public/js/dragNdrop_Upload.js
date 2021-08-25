/** @desc Retrieved from https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
          -----------------drag and drop starts here ---------------*/
let dropArea = document.getElementById('drop-area'); // identifies the click

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => { //identifies the event
  dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(event_) { //disables defaults
  event_.preventDefault();
  event_.stopPropagation();
};

['dragenter', 'dragover'].forEach(eventName => { //identifies drag over event
  dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => { //identifies drop event
  dropArea.addEventListener(eventName, unhighlight, false);
});

function highlight(event_) { // when drag over happens, the area get's highlighted
  dropArea.classList.add('highlight');
};

function unhighlight(event_) { // when drag over stops, the area get's unhighlighted
  dropArea.classList.remove('highlight');
};
/* --------------------------drag and drop ends here------------------ */
