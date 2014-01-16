#pragma strict
var vertAxis : String;
var horAxis : String;
var inButton : String;

var numberOfColumns : int;
var buttonsPerColumn : int; 

var isCheckingJoy : boolean = false;
var currentFocus : int = 0;
private var actionButton;
var buttons : JoyGUIButton[];
var enabled : boolean = true;

class JoyGUIMenu {
	function JoyGUIMenu (numberOfButtonsPerColumn : int, rectangles : Rect[],
		labels : String[],  inputButton : String, verticalAxis : String, horizontalAxis : String){
		vertAxis = verticalAxis;
		horAxis = horizontalAxis;
		inButton = inputButton;
		
		if (rectangles.length != labels.length)Debug.Log("Array lengths are not even! Check rectangles[] and labels[]");
		if (rectangles.length % numberOfButtonsPerColumn)Debug.Log("column lengths don't fit evenly into rectangles");
		numberOfColumns = rectangles.length % numberOfButtonsPerColumn;
		buttonsPerColumn = numberOfButtonsPerColumn;
		
		buttons = new JoyGUIButton[rectangles.length];
		for (var z : int = 0; z < rectangles.length; z++){
			buttons[z] = new JoyGUIButton(rectangles[z], labels[z]);
		}
		//buttons[0].Focus(true);
	}

	function DebugFunc (){
		Debug.Log("currentfocus "+currentFocus);
	}	
	function CheckJoyAxis (){
		if (((Mathf.Abs(Input.GetAxis("Y axis")) > 0.9) || (Mathf.Abs(Input.GetAxis(horAxis)) > 0.9)) && isCheckingJoy == false){
			if (Input.GetAxis(vertAxis)	> 0.1f){//up
				SetFocus(1);
			}
			if (Input.GetAxis(horAxis) > 0.1f){//right
				SetColumn(1);
			}
			if (Input.GetAxis(vertAxis)	< -0.1f){//down
				SetFocus(-1);
			}
			if (Input.GetAxis(horAxis) < -0.1f){//left
				SetColumn(-1);
			}
			isCheckingJoy = true; //switching focuses, start delay
			return true;
		}
		return false;
	}
	
	function CheckJoyButton (){
		var pressedButton = -1;
		if (enabled){
			if (Input.GetButtonDown(inButton)){
				for (var i : int = 0; i < buttons.length; i++){
					if (buttons[i].Click()){
						pressedButton = i;
					}
				}
			}
			if (Input.GetButtonUp(inButton)){
				for (var b in buttons){
					b.UnClick();
				}
			}
		}
		return pressedButton;
	}
	
	function SetFocus(change : int){
		if (enabled){
			if (change == -1){	//down on stick
				currentFocus++;	//down the array
				if ((currentFocus % buttonsPerColumn) == 0){
					currentFocus = 0; //loop back to the top
				}
			} else if (change == 1){// up on stick
				currentFocus--; // up the array
				if (currentFocus == -1){
					currentFocus = buttonsPerColumn - 1; // loop to bottom from top
				}
			}
			for (var i : int = 0; i < buttons.length; i++){
				buttons[i].Focus(false);
				if (i == currentFocus)buttons[i].Focus(true);
			}
		}
	}
	
	function SetColumn(change : int){
		if (enabled){
			if (change == -1){
				currentFocus -= buttonsPerColumn;
				if (currentFocus < 0){
					currentFocus = buttons.length + currentFocus;
				}
			} else if (change == 1){
				currentFocus += buttonsPerColumn;
				if (currentFocus > buttons.length-1){	//loop back to top
					currentFocus = currentFocus % buttonsPerColumn;
				}
			}
			for (var i : int = 0; i < buttons.length; i++){
				buttons[i].Focus(false);
				if (i == currentFocus)buttons[i].Focus(true);
			}
		}
	}
	
	function CheckMousePosition (){
		if (enabled){
			var mousePos = Input.mousePosition;
			mousePos.y = Screen.height - mousePos.y;
			for (var butt in buttons){
				if (butt.buttonRect.Contains(mousePos)){
					butt.Focus(true);
				} else {
					butt.Focus(false);
				}
			}
		}
	}
	function CheckMouseClick (){
		var pressedButton : int = -1;
		if (enabled){
			if (Input.GetButtonDown("Fire1")){
			var mousePos = Input.mousePosition;
			mousePos.y = Screen.height - mousePos.y;
			for (var i : int = 0; i < buttons.length; i++){
				if (buttons[i].buttonRect.Contains(mousePos)){
					buttons[i].Click();
					pressedButton = i;
					Debug.Log("GOTCHA");
					}
				}
			}
		}
		if (Input.GetButtonUp("Fire1")){
			for (var b in buttons){
				b.UnClick();
			}
		}
		return pressedButton;
	}


	function Display(){
		if (enabled){
			for (var butt : JoyGUIButton in buttons){
				butt.Display();
			}
		}
	}
}