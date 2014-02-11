#pragma strict
@script AddComponentMenu("EnemyAI/Moray AI")

private var player : GameObject;
private var speed : float;
private var damage : float;
var damageDistanceThreshold : float = 10;
var pursuitAddition : float = 2;

function Start () {
	player = GameObject.FindWithTag("Player");
	speed = GetComponent(Stats).speed;
	damage = GetComponent(Stats).damage;
}

function Update () {
	if (player != null){
		if (Vector3.Distance(transform.position, player.transform.position) > damageDistanceThreshold - pursuitAddition){
			transform.LookAt(player.transform.position);
			transform.position += transform.forward * (speed) * Time.deltaTime;
		} else {
			player.GetComponent(Stats).health -= damage * Time.deltaTime;
		}
	}
}