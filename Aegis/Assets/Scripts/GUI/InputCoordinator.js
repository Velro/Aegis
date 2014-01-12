#pragma strict
@script AddComponentMenu("GUI/InputCoordinator")
//#IF UNITY_ANDROID platform dependent compiling
//var triggers : String = null; 
class AxisInput {
	var axis : String = null;
	var positive : boolean;
}
var backgroundTex : Texture;

public static var weaponOne : String;
public static var weaponTwo : String;
public static var weaponThree : String;
public static var weaponFour : String;

public static var usingController : boolean = false; //xbox stated explicitly because setup will be a little different with other controllers *sigh*
public static var usingMouseAndKeyboard : boolean = true;
static var rightTrigger : AxisInput;
static var leftTrigger : AxisInput;
static var rightBumper : String;
static var leftBumper : String;
static var leftStickHor : AxisInput;
static var leftStickVert : AxisInput;
static var rightStickHor : AxisInput;
static var rightStickVert : AxisInput;
static var confirm : String;
static var back : String;

public var controllerSetup : boolean = false;

var baseController : Texture;
var leftStickMovedUpController : Texture;
var leftStickMovedRightController : Texture;
var rightStickMovedUpController : Texture;
var rightStickMovedRightController : Texture;
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
	LeftTrigger
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
			/**** LEFT UP ****/
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
			/**** LEFT RIGHT ****/
			case ControllerInputChoice.LeftStickHorizontal:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (leftStickHor.axis == null || leftStickHor.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.Label(controllerLabelRect,"Move left joystick right");
						var returned = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned != leftStickVert.axis){ //check other axis
							leftStickHor.axis = returned;
						}
					}
				} else {
					GUI.Label(controllerLabelRect,"Found left joystick right");
					if (Input.GetAxisRaw(leftStickHor.axis) > 0){
						leftStickHor.positive = true;
					} else {
						leftStickHor.positive = false;
					}
					currentChoice = ControllerInputChoice.RightStickVertical;
					lastTime = Time.time;
				}
				break;
			/**** RIGHT UP ****/
			case ControllerInputChoice.RightStickVertical:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (rightStickVert.axis == null || rightStickVert.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.Label(controllerLabelRect,"Move right joystick up");
						returned = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned != leftStickVert.axis &&
							returned != leftStickHor.axis
							){
							rightStickVert.axis = returned;
						}
					}
				} else {
					GUI.Label(controllerLabelRect,"Found right joystick up");
					if (Input.GetAxisRaw(rightStickVert.axis) > 0){
						rightStickVert.positive = true;
					} else {
						rightStickVert.positive = false;
					}
					currentChoice = ControllerInputChoice.RightStickHorizontal;
					lastTime = Time.time;
				}
				break;
			/**** RIGHT RIGHT ****/
			case ControllerInputChoice.RightStickHorizontal:
				GUI.DrawTexture(controllerTexRect, baseController, ScaleMode.StretchToFill, true, 1.0);
				Countdown();
				if (rightStickHor.axis == null || rightStickHor.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUI.Label(controllerLabelRect,"Move right joystick right");
						returned = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned != rightStickVert.axis){
							rightStickHor.axis = returned;
						}
					}
				} else {
					GUI.Label(controllerLabelRect,"Found right joystick right");
					if (Input.GetAxisRaw(rightStickHor.axis) > 0){
						rightStickHor.positive = true;
					} else {
						rightStickHor.positive = false;
					}
					currentChoice = ControllerInputChoice.RightTrigger;
					lastTime = Time.time;
				}
				break;
			
		}
	}
}
function Start (){
	leftStickVert = new AxisInput();
	leftStickHor = new AxisInput();
	rightStickVert = new AxisInput();
	rightStickHor = new AxisInput();
	controllerTexRect = new Rect(0,0,(Screen.width/4)*2,(Screen.height/4)*2);
	controllerTexRect.center = new Vector2(Screen.width/2, Screen.height/3);
	controllerLabelRect = new Rect(0,0,(Screen.width), Screen.height/10);
	controllerLabelRect.center = new Vector2(Screen.width/2, (Screen.height/3)*2);
}
function Awake (){
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

function Countdown (){
	if (Time.time < lastTime + delayBetween){
		GUI.Label(controllerLabelRect,"Next input in "+(Mathf.RoundToInt((lastTime + delayBetween) - Time.time)+1),labelStyle);
	}
}