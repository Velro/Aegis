#pragma strict
/*
* Just drag and drop objects into the array field. Attach this to the trigger, not the object to be activated. 
*/
var hit : boolean = false;
var toEnable : GameObject[];

function OnTriggerEnter (other : Collider){
	if (other.tag == "Player"){
		hit = true;
		Debug.Log("Entered trigger "+gameObject.name);
		for (var object : GameObject in toEnable){
			object.SetActive(true);
		}
	}
}