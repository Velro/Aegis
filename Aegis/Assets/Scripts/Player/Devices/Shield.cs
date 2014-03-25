using UnityEngine;
using System.Collections;

public class Shield : MonoBehaviour {
    public Weapon shield = new Weapon();
    public GameObject shieldObj;
    public float distanceFromShip = 13; //alter this directly to change
    private GameObject sight;
    public float heatPerSecond = 0;
    public Vector3 size = Vector3.zero;
    private bool instantiateOnce;
    private GameObject thisShield;
    private float mouseX = 0;
    private float mouseY = 0;
    private float diff = 0;

    void Awake()
    {
        shield.Awake();
    }
    void Start () 
    {
        
	    shieldObj = Resources.Load<GameObject>("Prefabs/Shield");
	    heatPerSecond = shield.currentLevel.heatCost;
	    sight = gameObject.transform.FindChild("gun").gameObject;
	    diff = Camera.main.transform.position.y + sight.transform.position.y;
    }

    void Update () {
	    if (((Input.GetButtonDown("Fire4") && InputCoordinator.usingMouseAndKeyboard) || (InputCoordinator.usingController && (Input.GetAxis("3rd axis") > 0.5 ))) 
		     && !instantiateOnce){ //instantiate shield
		    thisShield = Instantiate(shieldObj, sight.transform.position, Quaternion.Euler(90,0,0)) as GameObject;
		    thisShield.transform.parent = sight.transform;
		    thisShield.transform.localPosition = new Vector3(thisShield.transform.localPosition.x + distanceFromShip, thisShield.transform.localPosition.y, thisShield.transform.localPosition.z);
		    //Debug.Log("Instantiate "+thisShield.name);
		    instantiateOnce = true;
		    GetComponent<PlayerStats>().heat += heatPerSecond * Time.deltaTime;
	    } else if (Input.GetButton("Fire4") && instantiateOnce && thisShield != null){ //tick heat while held
		    //Debug.Log("tick shield");
		    GetComponent<PlayerStats>().heat += heatPerSecond * Time.deltaTime;
	    }
	    if (!Input.GetButton("Fire4") && thisShield != null || GetComponent<PlayerStats>().heat > GetComponent<PlayerStats>().maxHeat){ //destroy if too hot or let go
		    Destroy(thisShield);
		    instantiateOnce = false;
	    }
	    if (thisShield != null)
		    thisShield.transform.localRotation = Quaternion.Euler(270, 0, 0);
    }
}
