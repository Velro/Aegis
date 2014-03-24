using UnityEngine;
using System.Collections;

public class ParallaxSpeed : MonoBehaviour {
    public float speed1 = 1;
    public float speed2 = 1;
    public float speed3 = 1;
    public float texSizeX = 200; //largely arbitrary. Adjust until it looks right
    public float texSizeY = 150;
    public bool parallaxing = true;
    private float screenSpeed = 0;
    public Vector2 screenSize;
    public Vector2 tileSize;
    void Start () {
	    screenSize = new Vector2(Camera.main.pixelWidth, Camera.main.pixelHeight);
	    screenSpeed = transform.parent.GetComponent<CameraScroll>().scrollSpeed;
	    transform.localScale = new Vector2(screenSize.x, screenSize.y);
	    tileSize.x = screenSize.x / texSizeX;
	    tileSize.y = screenSize.x / texSizeY;
	    Material[] materials = gameObject.renderer.materials;
	    foreach (Material mat in materials)
		    mat.SetTextureScale("_MainTex",tileSize);
    }

    void Update () {
	    if (parallaxing){
		    gameObject.renderer.materials[0].mainTextureOffset = new Vector2(gameObject.renderer.materials[0].mainTextureOffset.x + speed1 * Time.deltaTime, 0);
            gameObject.renderer.materials[1].mainTextureOffset = new Vector2(gameObject.renderer.materials[0].mainTextureOffset.x + speed2 * Time.deltaTime, 0);
            gameObject.renderer.materials[2].mainTextureOffset = new Vector2(gameObject.renderer.materials[0].mainTextureOffset.x + speed3 * Time.deltaTime, 0);
	    }
    }
}
