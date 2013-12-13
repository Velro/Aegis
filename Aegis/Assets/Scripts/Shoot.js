#pragma strict

var bullet : GameObject;
var cooldown : float;
private var lastShot : float;
private var grabInitialTimeBool : boolean = false;
private var grabInitialTime : float = 1;
var wait : float = 0;

function Update () {
	if (!grabInitialTimeBool){
		grabInitialTime = Time.time;
		grabInitialTimeBool = true;
	}
	if (Time.time - lastShot > cooldown && Time.time - grabInitialTime > wait){ //basic forward gun
		var instance : GameObject;
		instance = Instantiate (bullet, transform.position, 
	Quaternion.Euler(transform.parent.transform.eulerAngles.x,transform.parent.transform.eulerAngles.y+90,transform.parent.transform.eulerAngles.z));
		instance.transform.localRotation.eulerAngles.x = 90;
		Destroy (instance, 5);
		lastShot = Time.time;
	}
}