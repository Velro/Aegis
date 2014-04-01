using UnityEngine;
using System.Collections;

public class CreditsDispenser : MonoBehaviour {

    public GameObject smallCredit;
    public GameObject mediumCredit;
    public GameObject largeCredit;

    public float customAmount;
    float small = 10;
    float medium = 20;
    float large = 30;

    bool isQuitting = false;

    void OnApplicationQuit ()
    {
        isQuitting = true;
    }
    void OnDestroy ()
    {
        if (!isQuitting)
            RollToDrop();
    }

    void RollToDrop ()
    {
	    if (customAmount == 0)
        {
		    float rollToDrop = Random.value;
            if (rollToDrop >= 0.95)
            {
			    Drop(large);
                return;
		    }
            if (rollToDrop >= 0.85)
            {
                Drop(medium);
                return;
		    }
		    if (rollToDrop >= 0.7)
            {
                Drop(small);
		    }
	    } else {
            Drop(customAmount);
        }
    }

    void Drop (float amount){
        GameObject instance;
	    if (amount > 0 && amount < 20){
		    instance = Instantiate (smallCredit, new Vector3(transform.position.x, 0, transform.position.z), Quaternion.identity) as GameObject;
		    instance.GetComponent<Credit>().amount = amount;
	    }
	    if (amount >= 20 && amount < 30){
            instance = Instantiate(mediumCredit, new Vector3(transform.position.x, 0, transform.position.z), Quaternion.identity) as GameObject;
		    instance.GetComponent<Credit>().amount = amount;
	    }
	    if (amount >= 30){
            instance = Instantiate(largeCredit, new Vector3(transform.position.x, 0, transform.position.z), Quaternion.identity) as GameObject;
		    instance.GetComponent<Credit>().amount = amount;
	    }
    }
}
