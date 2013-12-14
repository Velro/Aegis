#pragma strict
var coefficient : float = 1;
private var screenSpeed : float = 0;

function Start () {
	screenSpeed = transform.parent.GetComponent(CameraScroll).scrollSpeed;
}

function Update () {
	transform.position.x += coefficient * Time.deltaTime;
}