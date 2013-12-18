var lookAt : GameObject;
var bullet : GameObject;	//gameObject to be used. should be a prefab
var cooldown : float;		//how long of a wait between shots? in seconds
var getParent : boolean = false; 	//should we use the parents transforms?
private var lastShot : float;
private var grabInitialTimeBool : boolean = false;
private var grabInitialTime : float = 1;
var wait : float = 0;		//wait 4 seconds after being activated to shoot, geared towards AI

function Update () {
	transform.LookAt(lookAt.transform.position);
	transform.rotation.x += 90;
	if (!grabInitialTimeBool){
		grabInitialTime = Time.time;
		grabInitialTimeBool = true;
	}
	if (Time.time - lastShot > cooldown && Time.time - grabInitialTime > wait){ //basic forward gun
		var instance : GameObject;
		instance = Instantiate (bullet, transform.position, transform.rotation);
		transform.parent.transform.eulerAngles.y += 90;
	}
	
	Destroy (instance, 5);
	lastShot = Time.time;
}





