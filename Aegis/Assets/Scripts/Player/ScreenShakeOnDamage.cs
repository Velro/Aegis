using UnityEngine;
using System.Collections;

public class ScreenShakeOnDamage : MonoBehaviour 
{
    Vector3 originalPosition;
    private float currentHealth;
    public float   xShakeFrequency  = 0.02f;
    public Vector2 xShakeMagnitude = new Vector2(-1,1);
    public float   xShakeDuration = 0.2f;
    private float  xShakeStartTime = 0;
    public float   yShakeFrequency = 0.02f;
    public Vector2 yShakeMagnitude = new Vector2(-1, 1);
    public float   yShakeDuration = 0.2f;
    private float  yShakeStartTime = 0;
    bool shakingHorizontal = false;
    bool shakingVertical = false;

    void Start () 
    {
        currentHealth = GetComponent<PlayerStats>().Health;
        originalPosition = Camera.main.transform.localPosition;
    }

    void Update () 
    {
	    if (GetComponent<PlayerStats>().Health < currentHealth)
        {
		    shakingHorizontal = true;
            shakingVertical = true;
		    xShakeStartTime = Time.time;
            yShakeStartTime = Time.time;
		    currentHealth = GetComponent<PlayerStats>().Health;
	    }
	    if (shakingHorizontal)
        {
		    StartCoroutine(ScreenShakeX());
	    }
        if (shakingVertical)
        {
            StartCoroutine(ScreenShakeY());
        }
	    if (shakingHorizontal && Time.time > xShakeStartTime + xShakeDuration)
        {
		    shakingHorizontal = false;
            Camera.main.transform.localPosition = originalPosition;
	    }
        if (shakingVertical && Time.time > xShakeStartTime + xShakeDuration)
        {
            shakingVertical = false;
            Camera.main.transform.localPosition = originalPosition;
        }
    }

    IEnumerator ScreenShakeX()
    {
        var shakePos = Random.Range(xShakeMagnitude.x, xShakeMagnitude.y);
        Camera.main.transform.localPosition = new Vector3( Camera.main.transform.localPosition.x + shakePos, 
                                                           Camera.main.transform.localPosition.y, 
                                                           Camera.main.transform.localPosition.z );
        yield return new WaitForSeconds(xShakeFrequency);
    }

    IEnumerator ScreenShakeY()
    {
        var shakePos = Random.Range(yShakeMagnitude.x, yShakeMagnitude.y);
        Camera.main.transform.localPosition = new Vector3( Camera.main.transform.localPosition.x,
                                                           Camera.main.transform.localPosition.y,
                                                           Camera.main.transform.localPosition.z + shakePos);
        yield return new WaitForSeconds(xShakeFrequency);
    }
}
