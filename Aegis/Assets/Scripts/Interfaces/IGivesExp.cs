using UnityEngine;
using System.Collections;

public interface IGivesExp<T> {
    float ExpGiven
    {
        get;
        set;
    }

    void GiveExp(T expGiven);
}
