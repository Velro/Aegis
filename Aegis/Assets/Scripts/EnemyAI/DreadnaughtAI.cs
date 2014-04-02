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
    private float expGiven;
    public float ExpGiven
    {
        get { return expGiven; }
        set { expGiven = value; }
    }

	void Start () 
    {
	    
	}
	
	void Update () 
    {
	    
	}

    public void Damage(float damageTaken)
    {
        throw new System.NotImplementedException();
    }

    public void DamageProjectile(float damageTaken)
    {
        throw new System.NotImplementedException();
    }

    public void DamageExplosive(float damageTaken)
    {
        throw new System.NotImplementedException();
    }

    public void DamageEnergy(float damageTaken)
    {
        throw new System.NotImplementedException();
    }

    public void SuperEffectiveSystem()
    {
        throw new System.NotImplementedException();
    }

    public void Kill()
    {
        throw new System.NotImplementedException();
    }



    public void GiveExp(float expGiven)
    {
        throw new System.NotImplementedException();
    }
}
