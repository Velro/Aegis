using UnityEngine;
using System.Collections;

public class CameraScroll : MonoBehaviour 
{
    public GameObject startPoint;
    public GameObject endPoint;
    public float scrollSpeed;

    private float start = 0;
    private float end = 0;
    private float timeStarted = 0;
    
    void Start () 
    {
	    timeStarted = Time.time;
	    start = startPoint.transform.position.x;
	    end = endPoint.transform.position.x;
    }

    void Update()
    {
        var distanceCovered = (Time.time - timeStarted) * scrollSpeed;
        var fracJourney = distanceCovered / end;
        transform.position = new Vector3(Mathf.Lerp(start, end, fracJourney), transform.position.y, transform.position.z);
    }
}
