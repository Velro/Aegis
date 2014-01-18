#pragma strict
@script AddComponentMenu("GUI/InputCoordinator")
//#IF UNITY_ANDROID platform dependent compiling
//var triggers : String = null; 
class AxisInput {
	var axis : String = null;
	var positive : boolean;
	var button : String = null;
}
var backgroundTex : Texture;

public static var weaponOne : String;
public static var weaponTwo : String;
public static var weaponThree : String;
public static var weaponFour : String;
public static var usingController : boolean = false;
public static var usingMouseAndKeyboard : boolean = true;
public static var rightTrigger : AxisInput;
public static var leftTrigger : AxisInput;
public static var rightBumper : String;
public static var leftBumper : String;
public static var leftStickHor : AxisInput;
public static var leftStickVert : AxisInput;
public static var rightStickHor : AxisInput;
public static var rightStickVert : AxisInput;
public static var confirm : String = "joystick button 0";
public static var back : String = "joystick button 1";
public static var pause : String = "joystick button 7";

public var controllerSetup : boolean = false;

var baseController : Texture;
var leftStickMovedUpController : Texture;
var leftStickMovedRightController : Texture;
var rightStickMovedUpController : Texture;
var rightStickMovedRightController : Texture;
var rightTriggerController : Texture;
var rightBumperController : Texture;
var leftTriggerController : Texture;
var leftBumperController : Texture;
var confirmButtonController : Texture;
var backButtonController : Texture;
var pauseButtonController : Texture;

var controllerTexRect : Rect;
var controllerLabelRect : Rect;

var labelStyle : GUIStyle;

var delayBetween : float = 0;
var lastTime : float = 0;
private var initialCall : boolean = false;

enum ControllerInputChoice {
	LeftStickVertical,
	LeftStickHorizontal,
	RightStickVertical,
	RightStickHorizontal,
	RightTrigger,
	LeftTrigger,
	RightBumper,
	LeftBumper,
	ConfirmButton,
	BackButton,
	PauseButton,
	Complete
}
var currentChoice : ControllerInputChoice = ControllerInputChoice.LeftStickVertical;

function  OnGUI() {
	
	if (controllerSetup){
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),backgroundTex,ScaleMode.StretchToFill,true,1.0);
		if (initialCall == false){
			lastTime = Time.time;
			initialCall = true;
		}
		Countdown();
		switch (currentChoice){
			/**** LEFT JOY UP ****/
			case ControllerInputChoice.LeftStickVertical:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				if (leftStickVert.axis == null || leftStickVert.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, leftStickMovedUpController, ScaleMode.StretchToFill, true, 1.0);
						GUI.Label(controllerLabelRect,"Move left joystick up", labelStyle);
						leftStickVert.axis = gameObject.GetComponent(JoystickController).GetCurrentAxis();
					}
				} else {
					GUI.Label(controllerLabelRect,"Found left joystick up", labelStyle);
					if (Input.GetAxisRaw(leftStickVert.axis) > 0){
						leftStickVert.positive = true;
					} else {
						leftStickVert.positive = false;
					}
					currentChoice = ControllerInputChoice.LeftStickHorizontal;
					lastTime = Time.time;
				}
				break;
			/**** LEFT JOY RIGHT ****/
			case ControllerInputChoice.LeftStickHorizontal:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (leftStickHor.axis == null || leftStickHor.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, leftStickMovedRightController, ScaleMode.StretchToFill, true, 1.0);
						GUI.Label(controllerLabelRect,"Move left joystick right", labelStyle);
						var returned = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned != leftStickVert.axis){ //check other axis
							leftStickHor.axis = returned;
						}
					}
				} else {
					GUI.Label(controllerLabelRect,"Found left joystick right", labelStyle);
					if (Input.GetAxisRaw(leftStickHor.axis) > 0){
						leftStickHor.positive = true;
					} else {
						leftStickHor.positive = false;
					}
					currentChoice = ControllerInputChoice.RightStickVertical;
					lastTime = Time.time;
				}
				break;
			/**** RIGHT JOY UP ****/
			case ControllerInputChoice.RightStickVertical:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (rightStickVert.axis == null || rightStickVert.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, rightStickMovedUpController, ScaleMode.StretchToFill, true, 1.0);
						GUI.Label(controllerLabelRect,"Move right joystick up", labelStyle);
						returned = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned != leftStickVert.axis &&
							returned != leftStickHor.axis
							){
							rightStickVert.axis = returned;
						}
					}
				} else {
					GUI.Label(controllerLabelRect,"Found right joystick up", labelStyle);
					if (Input.GetAxisRaw(rightStickVert.axis) > 0){
						rightStickVert.positive = true;
					} else {
						rightStickVert.positive = false;
					}
					currentChoice = ControllerInputChoice.RightStickHorizontal;
					lastTime = Time.time;
				}
				break;
				
			/**** RIGHT JOY RIGHT ****/
			case ControllerInputChoice.RightStickHorizontal:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (rightStickHor.axis == null || rightStickHor.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, rightStickMovedRightController, ScaleMode.StretchToFill, true, 1.0);
						GUI.Label(controllerLabelRect,"Move right joystick right", labelStyle);
						returned = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned != rightStickVert.axis){
							rightStickHor.axis = returned;
						}
					}
				} else {
					GUI.Label(controllerLabelRect,"Found right joystick right", labelStyle);
					if (Input.GetAxisRaw(rightStickHor.axis) > 0){
						rightStickHor.positive = true;
					} else {
						rightStickHor.positive = false;
					}
					currentChoice = ControllerInputChoice.RightTrigger;
					lastTime = Time.time;
				}
				break;
			
			/**** RIGHT TRIGGER ****/
			case ControllerInputChoice.RightTrigger:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if ((rightTrigger.axis == null || rightTrigger.axis == "") && (rightTrigger.button == "" || rightTrigger.button == null)){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, rightTriggerController, ScaleMode.StretchToFill, true, 1.0);//rightTrigger
						GUI.Label(controllerLabelRect,"Press right trigger", labelStyle);
						returned = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned != rightStickVert.axis &&
							returned != rightStickHor.axis &&
							returned != leftStickVert.axis &&
							returned != leftStickHor.axis){
								rightTrigger.axis = returned;
						} else if (gameObject.GetComponent(JoystickController).GetCurrentButton() != null){
							returned = gameObject.GetComponent(JoystickController).GetCurrentButton();
							rightTrigger.button = returned;
						}
					}
				} else {
					GUI.Label(controllerLabelRect,"Found right trigger", labelStyle);
					if (rightTrigger.axis != null || rightTrigger.axis != ""){
						if (Input.GetAxisRaw(rightTrigger.axis) > 0){
							rightTrigger.positive = true;
						} else {
							rightTrigger.positive = false;
						}
					}
					currentChoice = ControllerInputChoice.LeftTrigger;
					lastTime = Time.time;
				}
				break;
				
			/**** LEFT TRIGGER ***/
			case ControllerInputChoice.LeftTrigger:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (Time.time > lastTime + delayBetween){
					//Debug.Log(leftTrigger.axis +" QQQQ "+leftTrigger.button);
					if ((leftTrigger.axis == null || leftTrigger.axis == "") && (leftTrigger.button == "" || leftTrigger.button == null)){
						//Debug.Log("all blank/null");
						GUI.DrawTexture(controllerTexRect, leftTriggerController, ScaleMode.StretchToFill, true, 1.0);
						GUI.Label(controllerLabelRect,"Press left trigger", labelStyle);
						var returned1 = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						var buttonReturned = gameObject.GetComponent(JoystickController).GetCurrentButton();
						if (((Input.GetAxisRaw(returned1) > 0 && rightTrigger.positive == false)) || 
								(Input.GetAxisRaw(returned1) < 0 && rightTrigger.positive == true)){
							leftTrigger.axis = returned1;
							//Debug.Log(returned1);
						} else if (buttonReturned != rightTrigger.button){
							leftTrigger.button = buttonReturned;
							//Debug.Log("HIT "+	leftTrigger.button);
						
						}
					} else {
						GUI.Label(controllerLabelRect,"Found left trigger", labelStyle);
						if (leftTrigger.axis != null || leftTrigger.axis != ""){
							if (leftTrigger.axis == rightTrigger.axis){
								leftTrigger.positive = !rightTrigger.positive;
							}
							//Debug.Log("Right trigger "+rightTrigger.axis+" rightbool "+rightTrigger.positive+" left trigger "+leftTrigger.axis+" leftbool "+leftTrigger.positive);
						}
					currentChoice = ControllerInputChoice.RightBumper;
					lastTime = Time.time;
					//Debug.Log(leftTrigger.axis +" QQQQ "+leftTrigger.button);
					}
				}

				
				break;
			
			/**** RIGHT BUMPER ***/
			case ControllerInputChoice.RightBumper:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (rightBumper == null || rightBumper == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, rightBumperController, ScaleMode.StretchToFill, true, 1.0);//rightTrigger
						GUI.Label(controllerLabelRect,"Press right bumper", labelStyle);
						returned = gameObject.GetComponent(JoystickController).GetCurrentButton();
						if (returned != rightTrigger.axis &&
							returned != leftTrigger.axis
							){
								rightBumper = returned;
							}
						}
				} else {
					GUI.Label(controllerLabelRect,"Found right bumper", labelStyle);
					currentChoice = ControllerInputChoice.LeftBumper;
					lastTime = Time.time;
				}
				break;
			
			case ControllerInputChoice.LeftBumper:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (leftBumper == null || leftBumper == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, leftBumperController, ScaleMode.StretchToFill, true, 1.0);//rightTrigger
						GUI.Label(controllerLabelRect,"Press right bumper", labelStyle);
						returned = gameObject.GetComponent(JoystickController).GetCurrentButton();
						if (returned != rightTrigger.axis &&
							returned != leftTrigger.axis &&
							returned != rightBumper
							){
								leftBumper = returned;
							}
						}
				} else {
					GUI.Label(controllerLabelRect,"Found left bumper", labelStyle);
					currentChoice = ControllerInputChoice.ConfirmButton;
					lastTime = Time.time;
				}
				break;
			
			/**** CONFIRM BUTTON ****/
			case ControllerInputChoice.ConfirmButton:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (confirm == null || confirm == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, confirmButtonController, ScaleMode.StretchToFill, true, 1.0);//rightTrigger
						GUI.Label(controllerLabelRect,"Press A button", labelStyle);
						returned = gameObject.GetComponent(JoystickController).GetCurrentButton();
						if (returned != rightTrigger.axis &&
							returned != leftTrigger.axis &&
							returned != rightBumper &&
							returned != leftBumper
							){
								confirm = returned;
							}
						}
				} else {
					GUI.Label(controllerLabelRect,"Found a button", labelStyle);
					currentChoice = ControllerInputChoice.BackButton;
					lastTime = Time.time;
				}
				break;
				
			/**** BACK BUTTON ****/
			case ControllerInputChoice.BackButton:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (back == null || back == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, backButtonController, ScaleMode.StretchToFill, true, 1.0);//rightTrigger
						GUI.Label(controllerLabelRect,"Press B button", labelStyle);
						returned = gameObject.GetComponent(JoystickController).GetCurrentButton();
						if (returned != rightTrigger.axis &&
							returned != leftTrigger.axis &&
							returned != rightBumper &&
							returned != leftBumper &&
							returned != confirm
							){
								back = returned;
							}
						}
				} else {
					GUI.Label(controllerLabelRect,"Found B button", labelStyle);
					currentChoice = ControllerInputChoice.PauseButton;
					lastTime = Time.time;
				}
				break;
			
			/**** PAUSE BUTTON ****/
			case ControllerInputChoice.PauseButton:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (pause == null || pause == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.DrawTexture(controllerTexRect, pauseButtonController, ScaleMode.StretchToFill, true, 1.0);//rightTrigger
						GUI.Label(controllerLabelRect,"Press Start button", labelStyle);
						returned = gameObject.GetComponent(JoystickController).GetCurrentButton();
						if (returned != rightTrigger.axis &&
							returned != leftTrigger.axis &&
							returned != rightBumper &&
							returned != leftBumper &&
							returned != confirm &&
							returned != back
							){
								pause = returned;
							}
						}
				} else {
					GUI.Label(controllerLabelRect,"Found Start button", labelStyle);
					currentChoice = ControllerInputChoice.Complete;
				}
				break;
			
			case ControllerInputChoice.Complete:
				//write preferences to UserPrefs
				//if (controllerSetup == true)GUI.Label(controllerLabelRect,"Setup Complete!", labelStyle);
				if (Time.time > lastTime + 0.25){
					Camera.main.gameObject.GetComponent(UpgroidsGUI).render = true;
					Camera.main.gameObject.GetComponent(UpgroidsGUI).currentState = Menu.InputOptions;
					controllerSetup = false;
				}
				break;
		}
	}
}
function Start (){
	leftStickVert = new AxisInput();
	leftStickVert.axis = "Y axis";
	leftStickHor = new AxisInput();
	leftStickHor.axis = "X axis";
	rightStickVert = new AxisInput();
	rightStickHor = new AxisInput();
	rightTrigger = new AxisInput();
	leftTrigger = new AxisInput();
	controllerTexRect = new Rect(0,0,(Screen.width/4)*2,(Screen.height/4)*2);
	controllerTexRect.center = new Vector2(Screen.width/2, Screen.height/3);
	controllerLabelRect = new Rect(0,0,(Screen.width), Screen.height/10);
	controllerLabelRect.center = new Vector2(Screen.width/2, (Screen.height/3)*2);
}
function Awake (){
	//pick up UserPrefs 
	if (usingMouseAndKeyboard == true && usingController == false)SetupKeyboard();
	if (usingMouseAndKeyboard == false && usingController == true)SetupController();
}

function SetupKeyboard (){
	weaponOne = "Fire1";
	weaponTwo = "Fire2";
	weaponThree = "Fire3";
	weaponFour = "Fire4";	
}
function SetupController(){

}
function WipeCurrentLayout (){
	
}
function Countdown (){
	if (Time.time < lastTime + delayBetween){
		//GUI.Label(controllerLabelRect,"Next input in "+(Mathf.RoundToInt((lastTime + delayBetween) - Time.time)+1),labelStyle);
	}
}