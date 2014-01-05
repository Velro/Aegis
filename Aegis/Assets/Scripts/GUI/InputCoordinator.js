#pragma strict
//#IF UNITY_ANDROID platform dependent compiling
//var triggers : String = null; 
class TriggerInput {
	var axis : String = null;
	var positive : boolean;
}

static var rightTrigger : TriggerInput;
static var leftTrigger : TriggerInput;
static var rightBumper : String;
static var leftBumper : String;
static var leftStickHor : String;
static var leftStickVert : String;
static var rightStickHor : String;
static var rightStickVert : String;


function OnGUI () {

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

function Start () {
	
}

function Update () {

}