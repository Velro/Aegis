#pragma strict
var player : GameObject;
var trigger : GameObject;
var turnSpeed : float = 2;
private var lastShot : float;
private var entered : boolean = false;
private var once : boolean = false;
private var startTime : float;
private var step : float;
function Start () {
	if (trigger == null){
		entered = true;
	}
}

function Update () {
	if (!entered){
		CheckTrigger();
	} else if (player != null){
		transform.LookAt(player.transform.position);

	}
}

function CheckTrigger(){
	entered = trigger.GetComponent(TriggeredAwaken).hit;
	if (entered && once){
		entered = true;
		startTime = Time.time;
		once = false;
	}
}