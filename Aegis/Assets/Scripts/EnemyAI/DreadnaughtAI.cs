using UnityEngine;
using System.Collections;

[AddComponentMenu("EnemyAI/Dreadnaught")]
public class DreadnaughtAI : MonoBehaviour, ISpeed, ICollisionDamage, IDamageable<float>, IGivesExp<float>, IKillable
{
    [SerializeField]
    private float speed;
    public float Speed
    {
        get { return speed; }
        set { speed = value; }
    }
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
    private float exp;
    public float ExpGiven
    {
        get { return exp; }
        set { exp = value; }
    }
    public float superEffectiveCoef = 2;
    public GameObject bullet;
    public float bulletSpeed;
    public float bulletDamage;
    GameObject player;
    public GameObject topGun;
    public GameObject bottomGun;
    public GameObject superEffectiveSystem;

    public float fireRate = 0.2f;
    private float lastShot = 0;

	void Start () 
    {
        player = GameObject.FindGameObjectWithTag("Player");
	}
	
	void Update () 
    {
	    if (Time.time > lastShot + fireRate)
        {
            GameObject topBullet = Instantiate(bullet, topGun.transform.position, Quaternion.Euler(-90, 0, 0)) as GameObject;
            topBullet.GetComponent<MoveBullet>().Speed = bulletSpeed;
            topBullet.GetComponent<MoveBullet>().CollisionDamage = bulletDamage;
            Destroy(topBullet, 4);
            GameObject bottomBullet = Instantiate(bullet, bottomGun.transform.position, Quaternion.Euler(90, 0, 0)) as GameObject;
            bottomBullet.GetComponent<MoveBullet>().Speed = bulletSpeed;
            bottomBullet.GetComponent<MoveBullet>().CollisionDamage = bulletDamage;
            Destroy(bottomBullet, 4);
            lastShot = Time.time;
            GetComponent<Animator>().SetTrigger("machineGunFire");
        }

        if (health < 0)
        {
            GiveExp(exp);
            Kill();
        }
	}

    public void Damage(float damageTaken)
    {
        Health -= damageTaken;
    }

    public void DamageProjectile(float damageTaken)
    {
        Damage(damageTaken);
    }

    public void DamageExplosive(float damageTaken)
    {
        Damage(damageTaken);
    }

    public void DamageEnergy(float damageTaken)
    {
        Health += damageTaken;
    }

    public void DamageCriticalHit (float damageTaken)
    {
        Health -= damageTaken;
        SuperEffectiveSystem();
    }

    public void SuperEffectiveSystem()
    {
        Instantiate(superEffectiveSystem, transform.position, transform.rotation);
    }

    public void Kill()
    {
        Destroy(gameObject);
    }



    public void GiveExp(float expGiven)
    {
        player.SendMessage("GiveExp", exp);
    }
}
