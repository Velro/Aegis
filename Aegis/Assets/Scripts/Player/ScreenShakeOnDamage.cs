using UnityEngine;
using System.Collections;

public class ScreenShakeOnDamage : MonoBehaviour 
{
    private float currentHealth;
    public float xShakeFrequency  = 0.02f;
    public Vector2 xShakeMagnitude = new Vector2(-1,1);
    public float shakeDuration = 0.2f;
    private float shakeStartTime = 0;
    bool shaking = false;

    void Start () 
    {
        currentHealth = GetComponent<PlayerStats>().Health;
    }

    void Update () 
    {
	    if (GetComponent<PlayerStats>().Health < currentHealth)
        {
		    shaking = true;
		    shakeStartTime = Time.time;
		    currentHealth = GetComponent<PlayerStats>().Health;
	    }
	    if (shaking)
        {
		    StartCoroutine(ScreenShake());
	    }
	    if (shaking && Time.time > shakeStartTime + shakeDuration)
        {
		    shaking = false;
            Camera.main.transform.localPosition = new Vector3(0, Camera.main.transform.localPosition.y, 0);
	    }
    }
    IEnumerator ScreenShake()
    {
        var shakePos = Random.Range(xShakeMagnitude.x, xShakeMagnitude.y);
        Camera.main.transform.localPosition = new Vector3(Camera.main.transform.localPosition.x + shakePos, Camera.main.transform.localPosition.y, Camera.main.transform.localPosition.z);
        yield return new WaitForSeconds(xShakeFrequency);
    }

}
