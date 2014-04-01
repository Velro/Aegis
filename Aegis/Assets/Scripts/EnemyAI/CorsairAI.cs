using UnityEngine;
using System.Collections;

[AddComponentMenu("EnemyAI/Corsair")]
public class CorsairAI : MonoBehaviour, ICollisionDamage, IKillable, IDamageable<float>, IGivesExp<float>, ISpeed
{
    [SerializeField]
    private float speed;
    public float Speed
    {
        get { return speed; }
        set { speed = value; }
    }
    public float bulletDamage;
    [SerializeField]
    private float collisionDamage;
    public float CollisionDamage 
    {
        get { return collisionDamage; }
        set { collisionDamage = value; }
    }

    [SerializeField]
    private float health;
    public float Health
    {
        get { return health; }
        set { health = value; }
    }
    [SerializeField]
    private float expGiven;
    public float ExpGiven
    {
        get { return expGiven; }
        set { expGiven = value; }
    }
    public float superEffectiveMod = 2;
    GameObject player;
    public GameObject bullet;	//gameObject to be used. should be a prefab
    public GameObject superEffectiveParticleSystem;
    public float cooldown;		//how long of a wait between shots? in seconds
    public AudioClip blasterSound;
    private float lastShot = 0;
    private bool grabInitialTimeBool = false;
    private float grabInitialTime = 0;
    public float wait = 0;		//wait after being activated to shoot, geared towards AI

    void Start ()
    {
        player = GameObject.FindGameObjectWithTag("Player");
    }

    void Update () 
    {
        if (player != null)
        {
            transform.LookAt(player.transform, Vector3.up);
        }
	    if (!grabInitialTimeBool)
        {
		    grabInitialTime = Time.time;
		    grabInitialTimeBool = true;
	    }
	
	    if (Time.time - lastShot > cooldown && Time.time - grabInitialTime > wait)
        { //basic forward gun
		    GameObject instance;
		    //var scrollAdjust : float = Camera.main.transform.parent.GetComponent(CameraScroll).scrollSpeed;
            Quaternion rotation = Quaternion.Euler(90, transform.eulerAngles.y + 90, 0);
		    //Debug.Log("corsairshoot");
			
		    instance = Instantiate (bullet, transform.position, rotation) as GameObject; //  * Quaternion.Euler(0, scrollAdjust, 0)
            instance.GetComponent<MoveBullet>().CollisionDamage = bulletDamage;
            instance.GetComponent<MoveBullet>().right = false;
            instance.GetComponent<MoveBullet>().left = true;
            audio.Play();
		   // Destroy (instance, 5);
		    lastShot = Time.time;
		
	    }

        if (health <= 0)
        {
            GiveExp(ExpGiven);
            Kill();
        }
    }
    public void DamageProjectile(float damageTaken)
    {
        health -= damageTaken * superEffectiveMod;
        SuperEffectiveSystem();
    }

    public void DamageExplosive(float damageTaken)
    {
        Damage(damageTaken);
    }

    public void DamageEnergy(float damageTaken)
    {
        Damage(damageTaken);
    }

    public void SuperEffectiveSystem()
    {
        GameObject inst = Instantiate(superEffectiveParticleSystem, transform.position, transform.rotation) as GameObject;
        Destroy(inst, 5);
        
    }

    public void Damage(float damageTaken)
    {
        health -= damageTaken;
    }

    void OnCollisionEnter(Collision other)
    {
        other.gameObject.SendMessage("Damage", CollisionDamage);
        //print("HIT");
    }

    public void GiveExp (float exp)
    {
        player.SendMessage("GiveExp", exp);
    }

    public void Kill()
    {
        Destroy(gameObject);
    }


}
