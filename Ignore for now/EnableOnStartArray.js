#pragma strict
@script AddComponentMenu("Scene View Helpers/Enable On Start Array")
var gameObjects : GameObject[];
function Start () {
	for (var object : GameObject in gameObjects){
		object.SetActive(true);
	}
}
