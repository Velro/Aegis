#pragma strict
//TODO inherit damage from fusion beam levelling

var damage : float;
var player : GameObject;
private var nozzle : Transform;

function Awake () {
	player = GameObject.FindWithTag("Player");
}

function Start () {
	nozzle = player.transform.FindChild("nozzle");
}
function Update (){
	CheckStats();
	transform.position = nozzle.position;
}	
function OnTriggerStay (other : Collider){
	other.GetComponent(Stats).health -= damage * Time.deltaTime;
	Debug.Log("dealing fusion beam damage");
}	


function CheckStats () {
	damage = gameObject.GetComponent(Stats).damage;
}
