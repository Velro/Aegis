using UnityEngine;
using System.Collections;

public class SpaceWormMasterAI : MonoBehaviour, ISpeed, ICollisionDamage, IDamageable<float>, IKillable, IGivesExp<float>
{
    [SerializeField]
    private float expGiven = 40;
    public float ExpGiven
    {
        get { return expGiven; }
        set { expGiven = value; }
    }
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
    public float superEffectiveCoef = 2;
    public GameObject superEffectiveSystem;

	// Use this for initialization
	void Start () 
    {
	
	}
	
	// Update is called once per frame
	void Update () 
    {
	    if (health <= 0)
        {
            GiveExp(expGiven);
            Kill();
            if (transform.childCount == 0)
                Destroy(gameObject);
        }
	}

    public void Damage(float damageTaken)
    {
        health -= damageTaken;
    }

    public void DamageProjectile(float damageTaken)
    {
        Damage(damageTaken);
    }

    public void DamageExplosive(float damageTaken)
    {
        Damage(damageTaken * superEffectiveCoef);
    }

    public void DamageEnergy(float damageTaken)
    {
        Damage(damageTaken);
    }

    public void SuperEffectiveSystem()
    {
        
    }

    public void Kill()
    {
        for (int i = 0; i < transform.childCount; i++)
        {
            transform.GetChild(i).SendMessage("Kill", SendMessageOptions.DontRequireReceiver);
        }
    }

    public void GiveExp(float expGiven)
    {
        GameObject.FindGameObjectWithTag("Player").SendMessage("GiveExp", expGiven);
    }
}
