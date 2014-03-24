using UnityEngine;
using System.Collections;

public class TriggeredAwaken : MonoBehaviour {
    public GameObject[] toEnable;

    void OnTriggerEnter(Collider other)
    {
        if (other.tag == "Player")
            foreach (GameObject obj in toEnable)
            {
                if (obj != null)
                    obj.SetActive(true);
            }
    }
}
