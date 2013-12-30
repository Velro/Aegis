#pragma strict
var damage : float;
var player : GameObject;
function Awake () {
	player = GameObject.FindWithTag("Player");
}

function Update (){
	CheckStats();
	transform.position = player.transform.position;
}	
function OnTriggerStay (other : Collider){
	other.GetComponent(Stats).health -= damage * Time.deltaTime;
	Debug.Log("dealing fusion beam damage");
}	


function CheckStats () {
	damage = gameObject.GetComponent(Stats).damage;
}