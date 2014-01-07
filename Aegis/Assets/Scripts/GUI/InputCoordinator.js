#pragma strict
//#IF UNITY_ANDROID platform dependent compiling
//var triggers : String = null; 
class TriggerInput {
	var axis : String = null;
	var positive : boolean;
}

public static var weaponOne : String;
public static var weaponTwo : String;
public static var weaponThree : String;
public static var weaponFour : String;

public static var usingController : boolean = false; //xbox stated explicitly because setup will be a little different with other controllers *sigh*
public static var usingMouseAndKeyboard : boolean = true;
static var rightTrigger : TriggerInput;
static var leftTrigger : TriggerInput;
static var rightBumper : String;
static var leftBumper : String;
static var leftStickHor : String;
static var leftStickVert : String;
static var rightStickHor : String;
static var rightStickVert : String;

public var controllerSetup : boolean = false;
function OnGUI () {
	if (controllerSetup){
		if (rightTrigger.axis == null || rightTrigger.axis == ""){
			GUI.Label(Rect(200,200,200,200), "Press Right Trigger");
			rightTrigger.axis = gameObject.GetComponent(JoystickController).GetCurrentAxis();
		} else {
			GUI.Label(Rect(200,200,200,200), "Right Trigger Found!");
			if (Input.GetAxisRaw(rightTrigger.axis) > 0){
				rightTrigger.positive = true;
			} else {
				rightTrigger.positive = false;
			}
			leftTrigger.axis = rightTrigger.axis;
			leftTrigger.positive = !rightTrigger.positive;	
		}
		//Debug.Log("Right Trigger name: "+rightTrigger.axis+" Right trigger bool: "+rightTrigger.positive+" Raw Input "+Input.GetAxisRaw(rightTrigger.axis));
		//Debug.Log("Left Trigger name: "+leftTrigger.axis+" Left trigger bool: "+leftTrigger.positive);
		if (rightBumper){} 
		//left = right -1 on oxblock
	}
}

function Start () {
	
}
function Awake (){
	if (usingMouseAndKeyboard == true && usingController == false)SetupKeyboard();
	if (usingMouseAndKeyboard == false && usingController == true)SetupController();
}
function Update () {

}

function SetupKeyboard (){
	weaponOne = "Fire1";
	weaponTwo = "Fire2";
	weaponThree = "Fire3";
	weaponFour = "Fire4";	
}
function SetupController(){

}