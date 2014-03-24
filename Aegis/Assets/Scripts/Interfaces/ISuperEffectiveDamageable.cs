using UnityEngine;
using System.Collections;

public interface ISuperEffectiveDamageable<GameObject> : IDamageable<float> {

	void TakeDamageProjectile(float damageTaken);
    void TakeDamageExplosive(float damageTaken);
    void TakeDamageEnergy(float damageTaken);
    void SuperEffectiveSystem (GameObject particleSystem);
}