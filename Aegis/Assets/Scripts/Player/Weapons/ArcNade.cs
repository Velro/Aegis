using UnityEngine;
using System.Collections;

public class ArcNade : MonoBehaviour 
{
    public Weapon arcNade = new Weapon();
    public GameObject canister;
    public GameObject path;
    public AudioClip fire; 
    public GameObject nozzle;
    float playerSpeed;
    private GameObject thisCanister;
    private GameObject thisPath;

    public float lifeTime1 = 2;
    public float lifeTime2 = 3;
    public float lifeTime3 = 4;
    public float lifeTime4 = 5;
    private float lifeTime;

    void Awake()
    {
        arcNade.Awake();
    }

    void Start () 
    {
	    canister = Resources.Load<GameObject>("Prefabs/nadeCanister");
        path = Resources.Load<GameObject>("Prefabs/nadePath");
	    nozzle = GameObject.Find("nozzle").gameObject;
	
	    //thisPath.transform.parent = nozzle;
    }


    void Update () 
    {
	    if (((Input.GetButtonDown("Fire3") && InputCoordinator.usingMouseAndKeyboard) || (InputCoordinator.usingController &&  Input.GetButtonDown("joystick button 4"))) 
			    && !gameObject.GetComponent<PlayerStats>().overheat //make sure we're not overheating
			    && Time.time - arcNade.currentLevel.ltShot > arcNade.currentLevel.cooldown)
	    {
            if (arcNade.level == 0) lifeTime = lifeTime1;
            if (arcNade.level == 1) lifeTime = lifeTime2;
            if (arcNade.level == 2) lifeTime = lifeTime3;
            if (arcNade.level == 3) lifeTime = lifeTime4;
		    thisCanister = Instantiate(canister, nozzle.transform.position, nozzle.transform.rotation) as GameObject;
		    //thisCanister.transform.parent = nozzle;
		    thisCanister.GetComponent<ArcNadeInstance>().CollisionDamage = arcNade.currentLevel.damage;
            thisCanister.GetComponent<ArcNadeInstance>().lifeTime = lifeTime;
		    arcNade.currentLevel.ltShot = Time.time;
		    gameObject.GetComponent<PlayerStats>().heat += arcNade.currentLevel.heatCost;
		    playerSpeed = gameObject.GetComponent<ShipMovement>().moveDirection.normalized.magnitude + 1;
//  		    thisCanister.GetComponent<ArcNadeInstance>().Speed *= playerSpeed;
		
//		    thisPath = Instantiate(path, nozzle.transform.position, nozzle.transform.rotation) as GameObject;
		    //if (nozzle.transform.eulerAngles.y > 180)thisPath.transform.eulerAngles = new Vector3(180, thisPath.transform.eulerAngles.y, thisPath.transform.eulerAngles.z);
//		    thisCanister.GetComponent<CurvePaths>().parentPath = thisPath.transform;
		
		    Destroy(thisPath,5);
	    }
    }
}
