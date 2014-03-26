using UnityEngine;
using System.Collections;

public interface IDamageable<T> {
    float Health
    {
        get;
        set;
    }
    void Damage(T damageTaken);
    void DamageProjectile(T damageTaken);
    void DamageExplosive(T damageTaken);
    void DamageEnergy(T damageTaken);
    void SuperEffectiveSystem();
}
