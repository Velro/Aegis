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
    GameObject player;

	void Start () 
    {
        player = GameObject.FindGameObjectWithTag("Player");
	}
	
	void Update () 
    {
	    
	}

    public void Damage(float damageTaken)
    {
        Health -= damageTaken;
    }

    public void DamageProjectile(float damageTaken)
    {
        Health -= damageTaken * superEffectiveCoef;
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
        throw new System.NotImplementedException();
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
