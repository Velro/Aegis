#pragma strict
var ship : GameObject;
var distance : float;
function Start () {

}

function Update () {
	transform.position = ship.transform.position;
	transform.position.x += distance;
}