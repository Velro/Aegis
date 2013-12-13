#pragma strict
/*
* This class lets us disable a gameObject's specific components until we hit a trigger. I made this because I didn't think my logic through.
* Might be useful later though.
*
*/

var triggerBox : GameObject;
var entered : boolean = false;
var componentsToDisable : Behaviour[];
private var once : boolean = true;

//behaviour is a subset of component
function Start () {
	for (var component : Behaviour in componentsToDisable){
		component.enabled = false;
	}
	if (gameObject.collider != null){
		collider.enabled = false;
	}
}

function Update () {
	CheckTrigger();
	if (entered){
		if (gameObject.collider != null){
			collider.enabled = true;
		}
		for (var component : Behaviour in componentsToDisable){
			component.enabled = true;
		}
	}
}

function CheckTrigger(){
	entered = triggerBox.GetComponent(TriggeredAwaken).hit;
	if (entered && once){
		entered = true;
		once = false;
	}
}