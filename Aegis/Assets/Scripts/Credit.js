#pragma strict
var amount : int = 0;
var speed : float = 1;
var pickupCredits : AudioClip;
private var origin : Vector3;
private var destination : Vector3;
private var distance : float;
private var startTime : float;

function Awake(){
	origin = transform.position;
	destination = Vector3(origin.x - 400, origin.y, origin.z);
	distance = Vector3.Distance(origin, destination);
	startTime = Time.time;
}

function Update(){
	var distanceCovered = (Time.time - startTime) * speed;
	var fracJourney : float = distanceCovered / distance;
	transform.position = Vector3.Lerp(origin, destination, fracJourney);
}

function OnTriggerEnter (other : Collider){
	if (other.tag == "Player"){
		other.GetComponent(PlayerStats).creditsThisLevel += amount;
		other.GetComponent(AudioSource).PlayOneShot(pickupCredits);
		Destroy(gameObject);
	}
}