#pragma strict

var damage : float;
var player : GameObject;
private var nozzle : Transform;
var weaponType : WeaponType = WeaponType.Energy;
var strongAgainst : EnemyType = EnemyType.Voltaic;

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
var bool : boolean = false;
function OnTriggerStay (other : Collider){
	if (other.gameObject.GetComponent(Stats) != null){
		if (other.gameObject.GetComponent(Stats).enemyType == strongAgainst){
			Debug.Log("SUPER EFFECTIVE");
			other.gameObject.GetComponent(Stats).health -= (damage*2) * Time.deltaTime;
			if (bool == false){
				other.gameObject.GetComponent(DealDamage).beginFlashingRed = true;
				bool = true;	
			}
		} else {
			other.gameObject.GetComponent(Stats).health -= damage * Time.deltaTime;
		}
	} else if (other.transform.parent.gameObject.GetComponent(Stats) != null){
		other.transform.parent.gameObject.GetComponent(Stats).health -= damage * Time.deltaTime;
	} else {
		Debug.Log("Fusion beam found no health to remove");
	}
}


function CheckStats () {
	damage = gameObject.GetComponent(Stats).damage;
}
