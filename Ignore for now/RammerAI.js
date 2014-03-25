#pragma strict
@script AddComponentMenu("EnemyAI/Rammer AI")
private var player : GameObject;
private var speed : float;

function Start () {
	speed = gameObject.GetComponent(Stats).speed;
	player = GameObject.FindGameObjectWithTag("Player");
}

function Update () {
	if (player != null){
		transform.LookAt(player.transform.position);
		transform.position += transform.forward * (speed) * Time.deltaTime;
	}
}