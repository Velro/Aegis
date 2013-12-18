#pragma strict

var lookAt : GameObject;
var bullet : GameObject;	//gameObject to be used. should be a prefab
var cooldown : float;		//how long of a wait between shots? in seconds
var getParent : boolean = false; 	//should we use the parents transforms?
private var lastShot : float;
private var grabInitialTimeBool : boolean = false;
private var grabInitialTime : float = 1;
var wait : float = 0;		//wait 4 seconds after being activated to shoot, geared towards AI

function Update () {
	//aiming
	transform.LookAt(lookAt.transform.position);

	//shooting
	if (!grabInitialTimeBool){
		grabInitialTime = Time.time;
		grabInitialTimeBool = true;
	}
	if (Time.time - lastShot > cooldown && Time.time - grabInitialTime > wait){ 
		var instance : GameObject;
		transform.localRotation.y = 0;
		transform.localRotation.z = 0;
		if (transform.parent.localEulerAngles.x > 390)transform.parent.localEulerAngles.x = 390;
		var rotation : Quaternion = Quaternion.Euler(90, 360 - transform.parent.localEulerAngles.x, 0);
		Debug.Log(transform.parent.localEulerAngles.x+" "+transform.parent.name);
		instance = Instantiate (bullet, transform.parent.position, rotation);
		Destroy (instance, 5);
		lastShot = Time.time;
	}
}


