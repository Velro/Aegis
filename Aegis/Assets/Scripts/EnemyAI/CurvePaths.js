#pragma strict
@script AddComponentMenu("EnemyAI/Curve Paths")

//var paths : Transform[,] = new Transform[10,3];
var pathPoints : Transform[];
var speed : float = 25;

private var t : float;

function Update () {
    transform.position = Spline.MoveOnPath(pathPoints, transform.position, t,
    	speed,100,EasingType.Sine, true, true);
   // t += Time.deltaTime/10;
}
