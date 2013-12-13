#pragma strict
var destination : GameObject;
var trigger : GameObject;
var entered : boolean = false;
var force : float = 1;

private var startTime : float;
private var enterOnce : boolean = true;
private var applyForceOnce : boolean = true;

function Start () {
	if (trigger  == null){
		entered = true;
	}
}

function Update () {
	if (!entered){
		CheckTrigger();
	} else if (applyForceOnce){
		rigidbody.AddForce(destination.transform.position.x*force, 0, destination.transform.position.z*force);
		//rigidbody.AddRelativeTorque(Vector3(Random.value*5, Random.value*5, Random.value*5));
		applyForceOnce = false;
	}
	
}

function CheckTrigger(){
	entered = trigger.GetComponent(TriggeredAwaken).hit;
	if (entered && enterOnce){
		entered = true;
		startTime = Time.time;
		enterOnce = false;
	}
}
