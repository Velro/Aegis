#pragma strict

var hit : boolean = false;

function OnTriggerEnter (other : Collider){
	if (other.tag == "Player"){
		hit = true;
		Debug.Log("Entered trigger "+gameObject.name);
	}
}