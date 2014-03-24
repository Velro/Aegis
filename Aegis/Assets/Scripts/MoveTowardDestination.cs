using UnityEngine;
using System.Collections;

public class MoveTowardDestination : MonoBehaviour 
{
    public GameObject destination;
    float speed;

    public bool patrol;
    bool returning;

    Vector3 start;
    Vector3 end;
    float journeyLength;
    float startTime;
	
	void Start () 
    {
        speed = GetComponent<Stats>().speed;
        start = transform.position;
        end = destination.transform.position;
        journeyLength = Vector3.Distance(start, end);
	}
	
	// Update is called once per frame
	void Update () 
    {   
        float distanceCovered = (Time.time - startTime) * speed;
        float fracJourney = distanceCovered / journeyLength;
        transform.position = Vector3.Lerp(start, end, fracJourney);
	    if (!patrol)
        {
            if (transform.position == end)
                Destroy(gameObject);
        }
        else if (patrol)
        {
            if (transform.position == end && returning)
            {
                returning = false;
            }
            else if (transform.position == end && !returning)
            {
                returning = true;
                FlipBeginningEnd();
            }
        }
	}

    void FlipBeginningEnd()
    {
        Vector3 interim = end;
        end = start;
        start = interim;
        startTime = Time.time;
    }
}
