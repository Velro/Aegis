#pragma strict

var numberOfColumns : int;
var arrayOfColumns = new Array(numberOfColumns);
var buttonsPerColumn : int; 

var ischeckingJoy : boolean;
var currentColumn : int;
var currentFocus : int;
private var actionButton;

function JoystickButtonMenu (numberOfButtonsPerColumn : int, rectangles : Rect[],
	labels : String[],  inputButton : String, verticalAxis : String, horizontalAxis : String){
	if (rectangles.length != labels.length)Debug.Log("Array lengths are not even! Check rectangles[] and labels[]");
	if (rectangles.length % numberOfButtonsPerColumn)Debug.Log("column lengths don't fit evenly into rectangles");
	numberOfColumns = rectangles.length % numberOfButtonsPerColumn;
	buttonsPerColumn = numberOfButtonsPerColumn;
	
	var bigArrayOfButtons = new JoyGUIButton[rectangles.length];
	for (var i : int = 0; i < rectangles.length; i++){
		bigArrayOfButtons[i] = new JoyGUIButton(rectangles[i], labels[i]);
	}
	for (var j : int = 0; j < numberOfColumns; j++){
		var buildingColumn = new JoyGUIButton[buttonsPerColumn];
		for (var k : int = 0; k < buttonsPerColumn; k++){
			//buildingColumn
		}
	}
}