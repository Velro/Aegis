using UnityEngine;
using System.Collections;

public class NozzleAdjustment : MonoBehaviour {
    public GameObject ship;
    public float distance;
	
	// Update is called once per frame
	void Update () 
    {
        float dis = ship.transform.position.x + distance;
		//transform.position = ship.transform.position;
	    transform.position = new Vector3(dis, 0, ship.transform.position.z);
	}
}
