using UnityEngine;
using System.Collections;

public interface IDamageable<T> {
    float Health
    {
        get;
        set;
    }
    void Damage(T damageTaken);
}
