#pragma strict
@script AddComponentMenu("EnemyAI/Scene Pathing Lines")

var color : Color = Color.red;

function OnDrawGizmos (){
	Gizmos.color = color;
	for (var i : int = 0; i < transform.childCount - 1; i++){
		Gizmos.DrawLine(transform.GetChild(i).position, transform.GetChild(i+1).position);
	}
}