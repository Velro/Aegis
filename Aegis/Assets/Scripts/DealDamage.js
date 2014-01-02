#pragma strict
/*
* Collision handler. All objects should have this as well as Stats. This only handles damage to itself. If health gets below 0 an explosion
* effect will occur if provided and the object is destroyed. Bullets are summarily destroyed on any impact. 
*/


var explosion : GameObject; //explosion effect
var destructionTime : float = 4;	//delay on destroying the explosion effect object (cleaning up)
var explosionPosition : Vector3 = Vector3.zero; //explosion position offset if we need it in case the origin isn't centered *cough*
private var damage : float;
private var player : GameObject;

function Start () {
	player = GameObject.FindWithTag("Player");
}

function OnCollisionEnter (other : Collision){
	if (explosion != null && other.gameObject.name != gameObject.name 
			&& other.gameObject.GetComponent(Stats) != null){ //damage isn't dealt to collisions with other objects of the same name. This will prevent tight packs of enemies killing themselves.
		damage = other.gameObject.GetComponent(Stats).damage; //retrieve how much damage "other" does
		if (gameObject.GetComponent(Stats) != null){
			gameObject.GetComponent(Stats).health -= damage;
		} else if (transform.parent.gameObject.GetComponent(Stats) != null){
			transform.parent.gameObject.GetComponent(Stats).health -= damage;
			Debug.Log(transform.parent.gameObject.name);	
		}
		if (other.gameObject.tag == "Bullet"){
			Destroy (other.gameObject);
		}
	} else {
	
	}
	if (gameObject.tag == "Player"){
		Debug.Log(other.gameObject.name);
	}
}

function Update () {

	if (FindHealth() <= 0){
		var clone : GameObject;
		clone = Instantiate (explosion, transform.position+explosionPosition, Quaternion.identity);
		if (gameObject.GetComponent(CreditsDispenser) != null){
			gameObject.GetComponent(CreditsDispenser).RollToDrop();
		}
		if (player!= null)player.GetComponent(PlayerStats).GiveExp(gameObject.GetComponent(Stats).exp, Time.time);
		Destroy (clone, destructionTime); //kill explosion effect after delay
		Destroy (gameObject);
	}
}

function FindHealth () {
	var health : float;
	if (gameObject.GetComponent(Stats) != null){
		health = gameObject.GetComponent(Stats).health;
	} else if (transform.parent.gameObject.GetComponent(Stats) != null){
		health = transform.parent.gameObject.GetComponent(Stats).health;
	} else {
		Debug.Log("No stats found");
	}
	return health;
}