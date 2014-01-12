#pragma strict
@script AddComponentMenu("GUI/ThreeDeeIcon")
var mousePosition : Vector3;
var mouseX : float;
var mouseY : float;
var diff : float;
var rect : Rect;
var inside : boolean = false;

function Start (){
	//diff = transform.parent.parent.position.z - transform.position.z;
}

function Update () {
	mouseX = Input.mousePosition.x;
	mouseY = Input.mousePosition.y;
	mousePosition = transform.parent.parent.GetComponent(Camera).ScreenToWorldPoint(Vector3(mouseX, mouseY, diff));
	if (rect.Contains(new Vector2(mousePosition.x, mousePosition.y))){
		Bounce();
		inside = true;
	} else {
		gameObject.GetComponent(Animator).CrossFade("Default",0.1,0);
		inside = false;
	}
}

function Bounce (){
	gameObject.GetComponent(Animator).Play("Bounce");
}

