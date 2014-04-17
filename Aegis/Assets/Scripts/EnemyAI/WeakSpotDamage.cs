using UnityEngine;
using System.Collections;

public class WeakSpotDamage : MonoBehaviour
{
    public void Damage(float damageTaken)
    {
        gameObject.SendMessageUpwards("Damage", damageTaken, SendMessageOptions.DontRequireReceiver);
        gameObject.SendMessageUpwards("DamageCriticalHit", damageTaken, SendMessageOptions.DontRequireReceiver);
    }

    public void DamageProjectile(float damageTaken)
    {
        gameObject.SendMessageUpwards("DamageProjectile", damageTaken, SendMessageOptions.DontRequireReceiver);
        gameObject.SendMessageUpwards("DamageCriticalHit", damageTaken, SendMessageOptions.DontRequireReceiver);
    }

    public void DamageExplosive(float damageTaken)
    {
        gameObject.SendMessageUpwards("DamageExplosive", damageTaken, SendMessageOptions.DontRequireReceiver);
        gameObject.SendMessageUpwards("DamageCriticalHit", damageTaken, SendMessageOptions.DontRequireReceiver);
    }

    public void DamageEnergy(float damageTaken)
    {
        gameObject.SendMessageUpwards("DamageEnergy", damageTaken, SendMessageOptions.DontRequireReceiver);
        gameObject.SendMessageUpwards("DamageCriticalHit", damageTaken, SendMessageOptions.DontRequireReceiver);
    }
}
