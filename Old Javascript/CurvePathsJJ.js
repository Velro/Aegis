#pragma strict
@script AddComponentMenu("EnemyAI/Curve Paths")

//var paths : Transform[,] = new Transform[10,3];
var parentPath : Transform;
private var pathPoints : Transform[];
var speed : float = 25;
var rotateToPath : boolean = false;
@System.NonSerializedAttribute
var t : float;
private var q : Quaternion;
var waitingForParentPathAssignment : boolean = false;

function Start () {
	if (parentPath != null){
		AssignParentPath();
	} else {
		waitingForParentPathAssignment = true;
	}
	if (gameObject.GetComponent(Stats) != null){
		speed = gameObject.GetComponent(Stats).speed;
	} else if (transform.parent != null){
		speed = transform.parent.gameObject.GetComponent(Stats).speed;
	} else {
		Debug.Log("No Stats attached on "+gameObject.name+" or parent");
	}
	q = transform.rotation;
}

function Update () {
	if (!waitingForParentPathAssignment){
		if (!rotateToPath){
		    transform.position = Spline.MoveOnPath(pathPoints, transform.position, t,
		    	speed,100,EasingType.Sine, true, true);
	    }
	    if (rotateToPath){
	    	transform.position = Spline.MoveOnPath(pathPoints, transform.position, t, q,
		    	speed,100f,EasingType.Sine, true, true);
		    q.eulerAngles.x = 90;
		    transform.rotation = q;
	    }
	} else if (waitingForParentPathAssignment && parentPath != null){
		AssignParentPath();
	}
}

function AssignParentPath (){
		pathPoints = new Transform[parentPath.childCount];
		for (var i : int = 0; i < parentPath.childCount; i++){
			pathPoints[i] = parentPath.GetChild(i);
		}
		waitingForParentPathAssignment = false;
}