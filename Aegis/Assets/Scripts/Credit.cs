using UnityEngine;
using System.Collections;

public class Credit : MonoBehaviour 
{
    [System.NonSerialized]
    public float amount = 0;
    public float speed = 1;
    public AudioClip pickupCredits;
    private Vector3 origin;
    private Vector3 destination;
    private float distance;
    private float startTime;

    void Awake()
    {
	    origin = transform.position;
	    destination = new Vector3(origin.x - 400, origin.y, origin.z);
	    distance = Vector3.Distance(origin, destination);
	    startTime = Time.time;
    }

    void Update()
    {
	    var distanceCovered = (Time.time - startTime) * speed;
	    float fracJourney = distanceCovered / distance;
	    transform.position = Vector3.Lerp(origin, destination, fracJourney);
    }

    void OnTriggerEnter (Collider other)
    {
	    if (other.tag == "Player")
        {
		    other.GetComponent<PlayerStats>().creditsThisLevel += amount;
		    other.GetComponent<AudioSource>().PlayOneShot(pickupCredits);
		    Destroy(gameObject);
	    }
    }
}
