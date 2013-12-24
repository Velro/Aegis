#pragma strict
/*
* Collision handler. All objects should have this as well as Stats. This only handles damage to itself. If health gets below 0 an explosion
* effect will occur if provided and the object is destroyed. Bullets are summarily destroyed on any impact. 
*/


var explosion : GameObject; //explosion effect
var destructionTime : float = 4;	//delay on destroying the explosion effect object (cleaning up)
var explosionPosition : Vector3 = Vector3.zero; //explosion position offset if we need it in case the origin isn't centered *cough*
private var damage : float;

function OnCollisionEnter (other : Collision){
	if (explosion != null && other.gameObject.layer != "ScreenBounds" && other.gameObject.name != gameObject.name 
			&& other.gameObject.GetComponent(Stats).damage != null){ //damage isn't dealt to collisions with other objects of the same name. This will prevent tight packs of enemies killing themselves.
		damage = other.gameObject.GetComponent(Stats).damage; //retrieve how much damage "other" does
		gameObject.GetComponent(Stats).health -= damage;     //apply that damage to this objects health

		if (other.gameObject.tag == "Bullet"){
			Destroy (other.gameObject);
		}
	}
	if (gameObject.tag == "Player"){
		Debug.Log(other.gameObject.name);
	}
}

function Update () {
	if (gameObject.GetComponent(Stats).health <= 0){
		var clone : GameObject;
		clone = Instantiate (explosion, transform.position+explosionPosition, Quaternion.identity);
		if (gameObject.GetComponent(CreditsDispenser) != null){
			gameObject.GetComponent(CreditsDispenser).RollToDrop();
		}
		Destroy (clone, destructionTime); //kill explosion effect after delay
		Destroy (gameObject);
	}
}