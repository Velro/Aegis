	#pragma strict
var explosion : GameObject; //explosion effect
var destructionTime : float = 4;	//delay on destroying the explosion effect object (cleaning up)
var explosionPosition : Vector3 = Vector3.zero;
private var damage : float;

function OnCollisionEnter (other : Collision){
	if (explosion != null && other.gameObject.layer != "ScreenBounds" && other.gameObject.name != gameObject.name){//can't collide with its own clones
		damage = other.gameObject.GetComponent(Stats).damage; //retrieve how much damage "other" does
		gameObject.GetComponent(Stats).health -= damage;     //apply that damage to this objects health
		if (gameObject.GetComponent(Stats).health <= 0){
			var clone : GameObject;
			clone = Instantiate (explosion, transform.position+explosionPosition, Quaternion.identity);
			Destroy (clone, destructionTime); //kill explosion effect after delay
			Destroy (gameObject);
		}
		if (other.gameObject.tag == "Bullet"){
			Destroy (other.gameObject); //bullet
		}
	}
}
