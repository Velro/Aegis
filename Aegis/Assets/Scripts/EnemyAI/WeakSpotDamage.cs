using UnityEngine;
using System.Collections;

public class WeakSpotDamage : MonoBehaviour
{
    public void Damage(float damageTaken)
    {
        gameObject.SendMessageUpwards("Damage", damageTaken);
        gameObject.SendMessageUpwards("DamageCriticalHit", damageTaken);
    }

    public void DamageProjectile(float damageTaken)
    {
        gameObject.SendMessageUpwards("DamageProjectile", damageTaken);
        gameObject.SendMessageUpwards("DamageCriticalHit", damageTaken);
    }

    public void DamageExplosive(float damageTaken)
    {
        gameObject.SendMessageUpwards("DamageExplosive", damageTaken);
        gameObject.SendMessageUpwards("DamageCriticalHit", damageTaken);
    }

    public void DamageEnergy(float damageTaken)
    {
        gameObject.SendMessageUpwards("DamageEnergy", damageTaken);
        gameObject.SendMessageUpwards("DamageCriticalHit", damageTaken);
    }
}
