/**
 * Puzzle - Facebook
 * 
 *
 * 
 *
 * 2013 Cristobal Chao
 * 
 **/

/** Puzzle **/
var Puzzle = function(input){
	this.grid = [];
	this.input = input;
	this.maxColumnWidth = 600;
	this.paddingLeft = parseInt($('#container').css('padding-left'));
}

Puzzle.prototype = {
	run: function(){
		this.init();
		this.createGrid();
		this.columnsPosition();
		this.test();
	},
	compare: function(a,b){
		return a.start - b.start;
	},
 	init: function(){
 		//First is sorted the input ( events )
 		this.input.sort(this.compare);

 		for(var i=0,j=1;i < this.input.length;i++){
    		this.input[i].id = j++;
    	}

    	//Initializing Grid : Two-dimensional Array which saves the events according to their column on the layout
    	this.grid[0] = [];

    	$('#container').html('');
 	},
 	createGrid: function(){ // Sweep the input data and storing in the Grid
 		for(var i = 0; i < this.input.length; i++){
 			for(var j = 0; j < this.grid.length; j++){
 				if (!!!this.grid[j].length){
 					this.grid[j][0] = this.input[i];
 					break;
 				}else{
 					if (this.input[i].start >= this.grid[j][parseInt(this.grid[j].length-1)].end){
 						this.grid[j][this.grid[j].length] = this.input[i];
 						break;
 					}else if(!!!this.grid[parseInt(j+1)]){
 						this.grid[parseInt(j+1)] = [];
 						this.grid[parseInt(j+1)][0] = this.input[i];
 						break;
 					}
 				}
 			}
 		}
 	},
 	columnsPosition: function(){ // Elements positioning to their respective columns
 		var map = {},
 			result = [];
 		
 		for(var i = 0;i < this.input.length;i++){
 			for(var j = this.input[i].start; j < this.input[i].end; j++){
 				map[j] = (!!map[j])?map[j]+1:1;
 			}
 		}

 		for(var i = 0, max = 0;i < this.input.length;i++){
 			for(var j = this.input[i].start; j < this.input[i].end; j++){
 				if(map[j] > max){
 					max = map[j];
 				}
 			}
 			this.input[i].max = max;
 		}
 	},
 	test: function(){
 		for(var i = 0; i < this.grid.length;i++){
 			for(var j = 0; j < this.grid[i].length; j++){
 				var _element = document.createElement("div"),
 					_title = document.createElement("p"),
 					_location = document.createElement("p"),
 					max = (!!this.input[this.grid[i][j].id-1].max)?this.input[this.grid[i][j].id-1].max:1,
 					widthElement = this.maxColumnWidth/max;

 				_element.className = "element";
 				_title.className = "title";
 				_location.className = "location";
 				_title.innerHTML = "Simple Element";
 				_location.innerHTML = "Simple Location";

 				_element.appendChild(_title);
 				_element.appendChild(_location);

 				$(_element).css({'top' : this.grid[i][j].start, 'width' : widthElement+'px', 'height' : parseInt(this.grid[i][j].end - this.grid[i][j].start), 'left' : i*widthElement+this.paddingLeft}).addClass('element');
 				$(_element).appendTo($('#container'));
 			}
 		}
 	}
 }

/**				INPUT				**/

var events = [
	{id: 0, start: 30, end: 150},
    {id: 1, start: 540, end: 600},
    {id: 2, start: 560, end: 620},
    {id: 3, start: 610, end: 670}
  ];

$(window).load(function(){
	var puzzle = new Puzzle(events);
	puzzle.run();
	$('li input').val('');

	$('#render').click(function(){
		var _events = [],
			i = 0;
		for(var i = 0; i < $('#test li').length; i++){
			var _s = parseInt($('#test li').eq(i).find('input').eq(0).val()),
				_e = parseInt($('#test li').eq(i).find('input').eq(1).val());

			if (!!_s && !!_e && _s >= _e){
				alert('Error. End must be later than start');
				return;
			}

			if (!!_s && !!_e && _s < 0 || _s > 720 || _e < 0 || _e > 720 ){
				alert('Error. The Interval must be between 0 - 720');
				return;
			}
			if (!!!_s && !!!_e){
				break;
			}else{
				var _event = {};
				_event.id = i;
				_event.start = _s;
				_event.end = _e;
				_events.push(_event);
			}
		}
		
		var new_puzzle = new Puzzle(_events);
		new_puzzle.run();
	});
});