#pragma strict
/*
* I like having the asteroids as physics objects. Just pick somewhere you want them to head and a force. Note that the distance of the destination
* to the asteroid will affect the force. IE a farther destination will result in a faster asteroid
*/

var destination : GameObject;
var force : float = 1;


function Awake () {
	rigidbody.AddForce(destination.transform.position.x*force, 0, destination.transform.position.z*force);
	//rigidbody.AddRelativeTorque(Vector3(Random.value*5, Random.value*5, Random.value*5)); //add some random spin to the asteroids eventually
}
