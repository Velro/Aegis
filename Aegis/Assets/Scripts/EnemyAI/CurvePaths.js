#pragma strict
@script AddComponentMenu("EnemyAI/Curve Paths")
// FollowAnimationCurve.js
// This script has to go outside of the Editor Folder.

var curveX : AnimationCurve = AnimationCurve.Linear(0,0,Screen.width, Screen.height);
var curveZ : AnimationCurve = AnimationCurve.Linear(0,0,Screen.width, Screen.height);
var speed : float = 1;

function Update() {
	transform.position = Vector3(curveX.Evaluate(Time.time*speed),
								transform.position.y,
								curveZ.Evaluate(Time.time*speed));
}