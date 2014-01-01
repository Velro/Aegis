#pragma strict
@script AddComponentMenu("EnemyAI/Curve Paths")

//var paths : Transform[,] = new Transform[10,3];
var parentPath : Transform;
private var pathPoints : Transform[];
private var speed : float = 25;
var rotateToPath : boolean = false;
private var t : float;

function Start () {
	pathPoints = new Transform[parentPath.childCount];
	for (var i : int = 0; i < parentPath.childCount; i++){
		pathPoints[i] = parentPath.GetChild(i);
	}
	if (gameObject.GetComponent(Stats) == null){
		speed = transform.parent.gameObject.GetComponent(Stats).speed;
	} else if (gameObject.GetComponent(Stats) != null){
		speed = gameObject.GetComponent(Stats).speed;
	} else {
		Debug.Log("No Stats attached on "+gameObject.name+" or parent");
	}
}

function Update () {
	if (!rotateToPath){
	    transform.position = Spline.MoveOnPath(pathPoints, transform.position, t,
	    	speed,100,EasingType.Sine, true, true);
    }
    if (rotateToPath){
    	transform.position = Spline.MoveOnPath(pathPoints, transform.position, t,// transform.rotation,
	    	speed,100f,EasingType.Sine, true, true);
    }
}

//MoveOnPath(Path pts, Vector3 currentPosition, ref float pathPosition, ref Quaternion rotation,  float maxSpeed=1f, float smoothnessFactor=100, EasingType ease = EasingType.Linear, bool easeIn = true, bool easeOut = true)

