using UnityEngine;
using System.Collections;

public class BlunderBuster : MonoBehaviour {

    public GameObject nozzle;
    public GameObject bullet;
    public Weapon blunderBuster = new Weapon();
    public AudioClip fired;

    private string input = "Fire1";

    GameObject instance1;
    GameObject instance2;
    GameObject instance3;
    GameObject instance4;

    void Awake()
    {
        blunderBuster.Awake();
    }
    void Start () {
	    bullet = Resources.Load<GameObject>("Prefabs/BlunderBusterBullet");
	    nozzle = GameObject.Find("nozzle");
    }


    void Update () {
        //Debug.Log(nozzle.transform.position);
        blunderBuster.CheckForLevelUp(0.2f);
        if (((Input.GetButtonDown(input) && InputCoordinator.usingMouseAndKeyboard) || (InputCoordinator.usingController && (Input.GetAxis(input) < -0.5)))
                && !GetComponent<PlayerStats>().overheat //make sure we're not overheating
                && Time.time - blunderBuster.currentLevel.ltShot > blunderBuster.currentLevel.cooldown)
        {
            GetComponent<PlayerStats>().heat += blunderBuster.currentLevel.heatCost; //up the heat
            Quaternion nozzleRotation = nozzle.transform.rotation;
            Quaternion instance1rotation = nozzleRotation;
            Quaternion instance2rotation = nozzleRotation;
            Quaternion instance3rotation = nozzleRotation;
            Quaternion instance4rotation = nozzleRotation;
            if (blunderBuster.level == 0)
            {
                instance1rotation.eulerAngles = new Vector3(instance1rotation.eulerAngles.x + 90, instance1rotation.eulerAngles.y - 15, instance1rotation.eulerAngles.z);
                instance2rotation.eulerAngles = new Vector3(instance2rotation.eulerAngles.x + 90, instance2rotation.eulerAngles.y + 15, instance2rotation.eulerAngles.z);
                instance1 = Instantiate(bullet, nozzle.transform.position, instance1rotation) as GameObject;
                instance2 = Instantiate(bullet, nozzle.transform.position, instance2rotation) as GameObject;
                instance1.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                instance2.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                Destroy(instance1, 1); //after 5 seconds the bullet is way off the screen. This is for clean up
                Destroy(instance2, 1);
            }
            if (blunderBuster.level == 1)
            {
                instance1rotation.eulerAngles = new Vector3(instance1rotation.eulerAngles.x + 90, instance1rotation.eulerAngles.y - 15, instance1rotation.eulerAngles.z);
                instance2rotation.eulerAngles = new Vector3(instance2rotation.eulerAngles.x + 90, instance2rotation.eulerAngles.y - 15, instance2rotation.eulerAngles.z);
                instance3rotation.eulerAngles = new Vector3(instance3rotation.eulerAngles.x + 90, instance3rotation.eulerAngles.y - 15, instance3rotation.eulerAngles.z);
                instance1 = Instantiate(bullet, nozzle.transform.position, instance1rotation) as GameObject;
                instance2 = Instantiate(bullet, nozzle.transform.position, instance2rotation) as GameObject;
                instance3 = Instantiate(bullet, nozzle.transform.position, instance3rotation) as GameObject;
                instance1.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                instance2.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                instance3.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                Destroy(instance1, 1);
                Destroy(instance2, 1);
                Destroy(instance3, 1);
            }

            if (blunderBuster.level == 2)
            {
                instance1rotation.eulerAngles = new Vector3(instance1rotation.eulerAngles.x + 90, instance1rotation.eulerAngles.y - 15, instance1rotation.eulerAngles.z);
                instance2rotation.eulerAngles = new Vector3(instance2rotation.eulerAngles.x + 90, instance2rotation.eulerAngles.y - 15, instance2rotation.eulerAngles.z);
                instance3rotation.eulerAngles = new Vector3(instance3rotation.eulerAngles.x + 90, instance3rotation.eulerAngles.y - 15, instance3rotation.eulerAngles.z);
                instance4rotation.eulerAngles = new Vector3(instance4rotation.eulerAngles.x + 90, instance4rotation.eulerAngles.y - 15, instance4rotation.eulerAngles.z);
                instance1 = Instantiate(bullet, nozzle.transform.position, instance1rotation) as GameObject;
                instance2 = Instantiate(bullet, nozzle.transform.position, instance2rotation) as GameObject;
                instance3 = Instantiate(bullet, nozzle.transform.position, instance3rotation) as GameObject;
                instance4 = Instantiate(bullet, nozzle.transform.position, instance4rotation) as GameObject;
                instance1.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                instance2.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                instance3.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                instance4.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                Destroy(instance1, 1);
                Destroy(instance2, 1);
                Destroy(instance3, 1);
                Destroy(instance4, 1);
            }
            if (blunderBuster.level == 3)
            {
                instance1rotation.eulerAngles = new Vector3(instance1rotation.eulerAngles.x + 90, instance1rotation.eulerAngles.y - 15, instance1rotation.eulerAngles.z);
                instance2rotation.eulerAngles = new Vector3(instance2rotation.eulerAngles.x + 90, instance2rotation.eulerAngles.y - 15, instance2rotation.eulerAngles.z);
                instance3rotation.eulerAngles = new Vector3(instance3rotation.eulerAngles.x + 90, instance3rotation.eulerAngles.y - 15, instance3rotation.eulerAngles.z);
                instance4rotation.eulerAngles = new Vector3(instance4rotation.eulerAngles.x + 90, instance4rotation.eulerAngles.y - 15, instance4rotation.eulerAngles.z);
                instance1 = Instantiate(bullet, nozzle.transform.position, instance1rotation) as GameObject;
                instance2 = Instantiate(bullet, nozzle.transform.position, instance2rotation) as GameObject;
                instance3 = Instantiate(bullet, nozzle.transform.position, instance3rotation) as GameObject;
                instance4 = Instantiate(bullet, nozzle.transform.position, instance4rotation) as GameObject;
                instance1.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                instance2.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                instance3.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                instance4.GetComponent<MoveBullet>().CollisionDamage = blunderBuster.currentLevel.damage;
                Destroy(instance1, 1.5f);
                Destroy(instance2, 1.5f);
                Destroy(instance3, 1.5f);
                Destroy(instance4, 1.5f);
            }
            audio.PlayOneShot(fired);

            blunderBuster.currentLevel.ltShot = Time.time;
        }
    }
}
