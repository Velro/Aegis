#pragma strict
/*
* Script for pushing our linear bullets. 
*/
private var speed : float;
private var damage : float;
var left : boolean = false;
var right : boolean = false;

function Update () {
	CheckStats();
	if (right){
		//transform.rotation.x += 90;
		//transform.rotation.z = 0;
		transform.position += transform.right * speed * Time.deltaTime;
		transform.position.y = 0;

	}
	if (left){
		//transform.rotation.x += 90;
		//transform.rotation.z = 0;
		transform.position -= transform.right * speed * Time.deltaTime;
		transform.position.y = 0;
	}
}

function OnTriggerEnter (other : Collider) {
	if (other.gameObject.GetComponent(Stats) != null){
		other.gameObject.GetComponent(Stats).health -= damage;
	} else if (other.transform.parent != null){
		if (other.transform.parent.gameObject.GetComponent(Stats) != null){
			other.transform.parent.gameObject.GetComponent(Stats).health -= damage;
		}
	} else {
		Debug.Log("other and its parents has no stats");
	}
	if (gameObject != null)Destroy (gameObject);
}

function CheckStats () {
	speed = gameObject.GetComponent(Stats).speed;
	damage = gameObject.GetComponent(Stats).damage;
}