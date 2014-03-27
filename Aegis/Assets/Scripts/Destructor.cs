using UnityEngine;
using System.Collections;

public class Destructor : MonoBehaviour, IDamageable<float> {

	void OnCollisionEnter (Collision other)
    {
        Destroy(other.gameObject);
    }

    public float Health
    {
        get
        {
            return 0;  
        }
        set
        {
            
        }
    }

    public void Damage(float damageTaken)
    {
        
    }

    public void DamageProjectile(float damageTaken)
    {
        
    }

    public void DamageExplosive(float damageTaken)
    {
        
    }

    public void DamageEnergy(float damageTaken)
    {
        
    }

    public void SuperEffectiveSystem()
    {
        
    }
}
