#pragma strict

var lookSpeed : float = 1;
var sight : GameObject;
var sensitivity = 100;

var bullet : GameObject;
var heatCost : float = 1;
var cooldown : float = 0.1;
private var lastShot : float = 0;
private var mouseX : float = 0;
private var mouseY : float = 0;

var diff : float;
function Start () {
	diff = Camera.main.transform.position.y + sight.transform.position.y;
}

function Update () {
	if ((Input.GetButtonDown("Fire1") || Input.GetAxis("Fire1") < 0) && !gameObject.GetComponent(Stats).overheat &&
			Time.time - lastShot > cooldown){ //basic forward gun
		gameObject.GetComponent(Stats).heat += heatCost;
		var instance : GameObject;
		instance = Instantiate (bullet, sight.transform.position,sight.transform.rotation);
		instance.transform.localRotation.eulerAngles.x = 90;
		Destroy (instance, 5);
		lastShot = Time.time;
	}
	
	/**** Mouse Input ***
	mouseX = Input.mousePosition.x;
	mouseY = Input.mousePosition.y;
	var worldPos = Camera.main.ScreenToWorldPoint(Vector3(mouseX, mouseY, diff));
	sight.transform.LookAt(worldPos);
	sight.transform.rotation *= Quaternion.Euler(0,-90,0);
	sight.transform.eulerAngles.z = 0;
	*/
	/**** Controller Input ****/
	var xAxis = Input.GetAxis("AimHorizontal");
	var yAxis = Input.GetAxis("AimVertical");
	if (xAxis != 0 || yAxis != 0){
		var relativePos = (transform.position+Vector3(yAxis,0, xAxis)) - transform.position;
		var rotation = Quaternion.LookRotation(relativePos, Vector3.up);
		sight.transform.rotation = rotation;
	}
}
function CheckMouseInput(){
	if (Input.GetAxis){};
}
