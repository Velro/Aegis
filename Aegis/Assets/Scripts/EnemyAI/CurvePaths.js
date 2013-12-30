#pragma strict
@script AddComponentMenu("EnemyAI/Curve Paths")

//var paths : Transform[,] = new Transform[10,3];
var parentPath : Transform;
private var pathPoints : Transform[];
var speed : float = 25;
var color : Color = Color.red;
private var t : float;

function Start () {
	pathPoints = new Transform[parentPath.childCount];
	for (var i : int = 0; i < parentPath.childCount; i++){
		pathPoints[i] = parentPath.GetChild(i);
	}
}

function Update () {
    transform.position = Spline.MoveOnPath(pathPoints, transform.position, t,
    	speed,100,EasingType.Sine, true, true);
}



