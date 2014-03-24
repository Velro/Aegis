using UnityEngine;
using System.Collections;

public class JoyGUIMenu {

    string vertAxis;
    string horAxis;
    string inButton;

    int numberOfColumns;
    int buttonsPerColumn; 

    bool isCheckingJoy;
    int currentFocus = 0;
    JoyGUIButton[] buttons;
    public bool enabled = true;

	public JoyGUIMenu (int numberOfButtonsPerColumn, Rect[] rectangles,
		string[] labels, string inputButton, string verticalAxis, string horizontalAxis)
    {
		vertAxis = verticalAxis;
		horAxis = horizontalAxis;
		inButton = inputButton;
		
		numberOfColumns = rectangles.Length % numberOfButtonsPerColumn;
		buttonsPerColumn = numberOfButtonsPerColumn;
		
		buttons = new JoyGUIButton[rectangles.Length];
		for (int z = 0; z < rectangles.Length; z++){
			buttons[z] = new JoyGUIButton(rectangles[z], labels[z]);
		}
		buttons[0].Focus(true);
	}

	public bool CheckJoyAxis ()
    {
		if (((Mathf.Abs(Input.GetAxis("Y axis")) > 0.9) || (Mathf.Abs(Input.GetAxis(horAxis)) > 0.9)) && isCheckingJoy == false)
        {
			if (Input.GetAxis(vertAxis)	> 0.1f)//up
				SetFocus(1);
			if (Input.GetAxis(horAxis) > 0.1f)//right
				SetColumn(1);
			if (Input.GetAxis(vertAxis)	< -0.1f)//down
				SetFocus(-1);
			if (Input.GetAxis(horAxis) < -0.1f)//left
				SetColumn(-1);
			isCheckingJoy = true; //switching focuses, start delay
			return true;
		}
		return false;
	}
	
	public int CheckJoyButton (){
		var pressedButton = -1;
		if (enabled){
			if (Input.GetButtonDown(inButton)){
				for (int i = 0; i < buttons.Length; i++){
					if (buttons[i].Click()){
						pressedButton = i;
					}
				}
			}
			if (Input.GetButtonUp(inButton)){
				foreach (JoyGUIButton b in buttons){
					b.UnClick();
				}
			}
		}
		return pressedButton;
	}
	
	public void SetFocus(int change){
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
			for (int i = 0; i < buttons.Length; i++){
				buttons[i].Focus(false);
				if (i == currentFocus)buttons[i].Focus(true);
			}
		}
	}
	
	public void SetColumn(int change){
		if (enabled){
			if (change == -1){
				currentFocus -= buttonsPerColumn;
				if (currentFocus < 0){
					currentFocus = buttons.Length + currentFocus;
				}
			} else if (change == 1){
				currentFocus += buttonsPerColumn;
				if (currentFocus > buttons.Length-1){	//loop back to top
					currentFocus = currentFocus % buttonsPerColumn;
				}
			}
			for (int i = 0; i < buttons.Length; i++){
				buttons[i].Focus(false);
				if (i == currentFocus)buttons[i].Focus(true);
			}
		}
	}
	
	public void CheckMousePosition (){
		if (enabled){
			var mousePos = Input.mousePosition;
			mousePos.y = Screen.height - mousePos.y;
			foreach (JoyGUIButton butt in buttons){
				if (butt.buttonRect.Contains(mousePos)){
					butt.Focus(true);
				} else {
					butt.Focus(false);
				}
			}
		}
	}
	public int CheckMouseClick (){
		int pressedButton = -1;
		if (enabled){
			if (Input.GetButtonDown("Fire1")){
			var mousePos = Input.mousePosition;
			mousePos.y = Screen.height - mousePos.y;
			for (int i = 0; i < buttons.Length; i++){
				if (buttons[i].buttonRect.Contains(mousePos)){
					buttons[i].Click();
					pressedButton = i;
					}
				}
			}
		}
		if (Input.GetButtonUp("Fire1")){
			foreach (JoyGUIButton b in buttons){
				b.UnClick();
			}
		}
		return pressedButton;
	}

	public void UnClickAll (){
		foreach (JoyGUIButton butt in buttons){
			butt.UnClick();
		}
	}
	
	public void Display(){
		if (enabled){
			foreach (JoyGUIButton butt in buttons){
				butt.Display();
			}
		}
	}
}
