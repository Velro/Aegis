using UnityEngine;
using System.Collections;

public class Shield : MonoBehaviour 
{
    public Weapon shield = new Weapon();
    public GameObject shieldObj;
    public float distanceFromShip = 13; //alter this directly to change
    public GameObject sight;
    public float heatPerSecond = 0;

    public Vector3 size0 = Vector3.zero;
    public Vector3 size1 = Vector3.zero;
    public Vector3 size2 = Vector3.zero;
    public Vector3 size3 = Vector3.zero;
    private bool instantiateOnce;
    private GameObject thisShield;

    void Awake()
    {
        shield.Awake();
    }

    void Start () 
    {      
	    shieldObj = Resources.Load<GameObject>("Prefabs/Shield");
	    heatPerSecond = shield.currentLevel.heatCost;
	    //sight = gameObject.transform.FindChild("gun").gameObject;
    }

    void Update () 
    {
	    if (((Input.GetButtonDown("Fire4") && InputCoordinator.usingMouseAndKeyboard) || 
            (InputCoordinator.usingController && (Mathf.Abs(Input.GetAxis("5th axis")) > 0.3 || Mathf.Abs(Input.GetAxis("4th axis")) > 0.3))) 
		     && !instantiateOnce)
        {   //instantiate shield
		    thisShield = Instantiate(shieldObj, sight.transform.position, Quaternion.Euler(90,0,0)) as GameObject;
		    thisShield.transform.parent = sight.transform;
		    thisShield.transform.localPosition = new Vector3(thisShield.transform.localPosition.x + distanceFromShip, thisShield.transform.localPosition.y, thisShield.transform.localPosition.z);
		    //Debug.Log("Instantiate "+thisShield.name);
            if (shield.level == 0)
                thisShield.transform.localScale = size0;
		    instantiateOnce = true;
		    GetComponent<PlayerStats>().heat += heatPerSecond * Time.deltaTime;
	    }
        else if ((Input.GetButton("Fire4") || (Mathf.Abs(Input.GetAxis("5th axis")) > 0.3 || Mathf.Abs(Input.GetAxis("4th axis")) > 0.3)) && instantiateOnce && thisShield != null)
        {   //tick heat while held
		    //Debug.Log("tick shield");
		    GetComponent<PlayerStats>().heat += heatPerSecond * Time.deltaTime;
	    }
        if (!(Input.GetButton("Fire4") || (Mathf.Abs(Input.GetAxis("5th axis")) > 0.3 || Mathf.Abs(Input.GetAxis("4th axis")) > 0.3)) && thisShield != null || GetComponent<PlayerStats>().heat > GetComponent<PlayerStats>().maxHeat)
        {   //destroy if too hot or let go
		    Destroy(thisShield);
		    instantiateOnce = false;
	    }
	    if (thisShield != null)
		    thisShield.transform.localRotation = Quaternion.Euler(270, 0, 0);
    }

    void OnCollisionEnter (Collision other)
    {
        print(other.gameObject.name);
        //shield.GiveExp(1);
    }
}
