#pragma strict

var startPoint : GameObject;
var endPoint : GameObject;
var scrollSpeed : float;

private var start : float = 0;
private var end : float = 0;
private var timeStarted : float = 0;
function Start () {
	timeStarted = Time.time;
	start = startPoint.transform.position.x;
	end = endPoint.transform.position.x;
}

function Update () {
	var distanceCovered = (Time.time - timeStarted) * scrollSpeed;
	var fracJourney = distanceCovered / end;
	transform.position.x = Mathf.Lerp(start, end, fracJourney);
	//if (transform.position.x == endPoint.transform.position.x){
	//	transform.FindChild("background").GetComponent(ParallaxSpeed).parallaxing = false;
	//}
}