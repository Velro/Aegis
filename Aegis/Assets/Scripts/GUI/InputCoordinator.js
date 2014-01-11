#pragma strict
//#IF UNITY_ANDROID platform dependent compiling
//var triggers : String = null; 
class AxisInput {
	var axis : String = null;
	var positive : boolean;
}

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

var delayBetween : float = 0;
var lastTime : float = 0;

enum ControllerInputChoice {
	LeftStickVertical,
	LeftStickHorizontal,
	RightStickVertical,
	RightStickHorizontal,
	RightTrigger,
	LeftTrigger
}
var currentChoice : ControllerInputChoice = ControllerInputChoice.LeftStickVertical;

function  InputDialogOptions() {
	
	if (GUILayout.Button("Controller")){
		controllerSetup = true;
	}
	
	if (controllerSetup){
		switch (currentChoice){
			/**** LEFT UP ****/
			case ControllerInputChoice.LeftStickVertical:
				if (leftStickVert.axis == null || leftStickVert.axis == ""){
					GUILayout.Label("Move left joystick up");
					leftStickVert.axis = gameObject.GetComponent(JoystickController).GetCurrentAxis();
				} else {
					GUILayout.Label("Found left joystick up");
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
				Countdown();
				if (leftStickHor.axis == null || leftStickHor.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUILayout.Label("Move left joystick right");
						var returned = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned != leftStickVert.axis){ //check other axis
							leftStickHor.axis = returned;
						}
					}
				} else {
					GUILayout.Label("Found left joystick right");
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
				Countdown();
				if (rightStickVert.axis == null || rightStickVert.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUILayout.Label("Move right joystick up");
						var returned1 = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned1 != leftStickVert.axis &&
							returned1 != leftStickHor.axis
							){
							rightStickVert.axis = returned1;
							Debug.Log(rightStickVert.axis);
						}
					}
				} else {
					GUILayout.Label("Found right joystick up");
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
				Countdown();
				if (rightStickHor.axis == null || rightStickHor.axis == ""){
					if (Time.time > lastTime + delayBetween){
						GUILayout.Label("Move right joystick right");
						returned = gameObject.GetComponent(JoystickController).GetCurrentAxis();
						if (returned != rightStickVert.axis){
							rightStickHor.axis = returned;
						}
					}
				} else {
					GUILayout.Label("Found right joystick right");
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
		GUILayout.Label("Next input in "+Mathf.RoundToInt((lastTime + delayBetween) - Time.time));
	}
}