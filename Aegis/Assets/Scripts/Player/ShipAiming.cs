using UnityEngine;
using System.Collections;

public class ShipAiming : MonoBehaviour {

    public GameObject sight;
    private float mouseX = 0;
    private float mouseY = 0;
    private float diff;
    
    void Start () {
	    diff = Camera.main.transform.position.y + sight.transform.position.y;
    }

    void Update () {
	
	    /**** Mouse Input ***/
	    if (InputCoordinator.usingMouseAndKeyboard && Camera.main.GetComponent<GameOverlayGUI>().paused == false){
		    mouseX = Input.mousePosition.x;
		    mouseY = Input.mousePosition.y;
		    var worldPos = Camera.main.ScreenToWorldPoint(new Vector3(mouseX, mouseY, diff));
		    sight.transform.LookAt(worldPos, Vector3.up);
		   // sight.transform.rotation *= Quaternion.Euler(0,-90,0);
            sight.transform.eulerAngles = new Vector3(sight.transform.eulerAngles.x, sight.transform.eulerAngles.y - 90, sight.transform.eulerAngles.z);
	    }
	
	    /**** Controller Input ****/
	    if (InputCoordinator.usingController){
		    var xAxis = Input.GetAxis("4th axis");
		    var yAxis = Input.GetAxis("3rd axis");
		    if (xAxis != 0 || yAxis != 0){
			    var relativePos = (transform.position+new Vector3(yAxis,0, xAxis)) - transform.position;
			    var rotation = Quaternion.LookRotation(relativePos, Vector3.up);
			    sight.transform.rotation = rotation;
		    } else {
			    sight.transform.localRotation = Quaternion.identity;
		    }
	    }
    }
}
