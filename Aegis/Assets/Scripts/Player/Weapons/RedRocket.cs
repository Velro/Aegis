using UnityEngine;
using System.Collections;

public class RedRocket : MonoBehaviour 
{
    public Weapon redRocket = new Weapon();
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
        redRocket.Awake();
    }

    void Start () 
    {
	    canister = Resources.Load<GameObject>("Prefabs/redRocket");
	    nozzle = GameObject.Find("nozzle").gameObject;
	
	    //thisPath.transform.parent = nozzle;
    }


    void Update () 
    {
	    if (((Input.GetButtonDown("Fire3") && InputCoordinator.usingMouseAndKeyboard) || (InputCoordinator.usingController &&  Input.GetButtonDown("joystick button 4"))) 
			    && !gameObject.GetComponent<PlayerStats>().overheat //make sure we're not overheating
			    && Time.time - redRocket.currentLevel.ltShot > redRocket.currentLevel.cooldown)
	    {
            if (redRocket.level == 0) lifeTime = lifeTime1;
            if (redRocket.level == 1) lifeTime = lifeTime2;
            if (redRocket.level == 2) lifeTime = lifeTime3;
            if (redRocket.level == 3) lifeTime = lifeTime4;
		    thisCanister = Instantiate(canister, nozzle.transform.position, Quaternion.Euler(new Vector3(0,90,0))) as GameObject;
		    //thisCanister.transform.parent = nozzle;
		    thisCanister.GetComponent<RedRocketInstance>().CollisionDamage = redRocket.currentLevel.damage;
            thisCanister.GetComponent<RedRocketInstance>().lifeTime = lifeTime;
		    redRocket.currentLevel.ltShot = Time.time;
		    gameObject.GetComponent<PlayerStats>().heat += redRocket.currentLevel.heatCost;
		    playerSpeed = gameObject.GetComponent<ShipMovement>().moveDirection.normalized.magnitude + 1;
//  		    thisCanister.GetComponent<ArcNadeInstance>().Speed *= playerSpeed;
		
//		    thisPath = Instantiate(path, nozzle.transform.position, nozzle.transform.rotation) as GameObject;
		    //if (nozzle.transform.eulerAngles.y > 180)thisPath.transform.eulerAngles = new Vector3(180, thisPath.transform.eulerAngles.y, thisPath.transform.eulerAngles.z);
//		    thisCanister.GetComponent<CurvePaths>().parentPath = thisPath.transform;
		
		    Destroy(thisPath,5);
	    }
    }
}
