using UnityEngine;
using System.Collections;

public class ShipMovement : MonoBehaviour 
{

    public Vector3 moveDirection = Vector3.zero;
    CharacterController controller;
    float rotateUp = 0;
    float rotateDown = 0;
    float rotateBack = 0;
    float rotateRight = 0;
    float rotateLeft = 0;
    float rotateReturn = 0;
    public float verticalSpeedOfRotation = 1;
    public float verticalDistanceRotate = 35;
    public float horizontalSpeedOfRotation = 1;
    public float horizontalDistanceRotate = 35;

    void Awake () 
    {
	    controller = GetComponent <CharacterController>();
    }

    void Update () {
    /**** Move Ship Input ****/
	    float horizontal = 0;
	    float vertical = 0;
	    if (InputCoordinator.usingController == true)
        {
		    horizontal = Input.GetAxis("X axis");
		    vertical = Input.GetAxis("Y axis");
	    }
	    if (InputCoordinator.usingMouseAndKeyboard == true)
        {
		    horizontal = Input.GetAxis("MoveHorizontalKey");
		    vertical = Input.GetAxis("MoveVerticalKey");	
	    }	
	    moveDirection = new Vector3(horizontal, 0, vertical) * GetComponent<PlayerStats>().Speed;
	    controller.Move(moveDirection * Time.deltaTime);
	
    /**** Physics ****/
	    transform.position = new Vector3(transform.position.x, 0, transform.position.z); //dont let collisions knock it out of XZ plane
	
    /**** Tilting ****/
	    if (vertical > 0)
        {
		    rotateUp += Time.deltaTime * verticalSpeedOfRotation;
		    rotateDown = 0;
		    rotateBack = 0;
		    transform.eulerAngles = new Vector3 (Mathf.LerpAngle(transform.eulerAngles.x,verticalDistanceRotate, rotateUp), transform.eulerAngles.y, transform.eulerAngles.z);
	    } 
        else if (vertical < 0)
        {
		    rotateUp = 0;
		    rotateDown += Time.deltaTime * verticalSpeedOfRotation;
		    rotateBack = 0;
		    transform.eulerAngles = new Vector3 (Mathf.LerpAngle(transform.eulerAngles.x,-verticalDistanceRotate, rotateDown), transform.eulerAngles.y, transform.eulerAngles.z);
	    } 
        else if (transform.eulerAngles.x != 0)
        {
		    rotateUp = 0;
		    rotateDown = 0;
		    rotateBack += Time.deltaTime * verticalSpeedOfRotation;
		    transform.eulerAngles = new Vector3 (Mathf.LerpAngle(transform.eulerAngles.x, 0, rotateBack), transform.eulerAngles.y, transform.eulerAngles.z);
	    }
	
	    if (horizontal > 0)
        {
		    rotateRight += Time.deltaTime * horizontalSpeedOfRotation;
		    rotateLeft = 0;
		    rotateReturn = 0;
		    transform.eulerAngles = new Vector3(transform.eulerAngles.x, transform.eulerAngles.y, Mathf.LerpAngle(transform.eulerAngles.z,horizontalDistanceRotate, rotateRight));
	    } 
        else if (horizontal < 0)
        {
		    rotateRight = 0;
		    rotateLeft += Time.deltaTime * horizontalSpeedOfRotation;
		    rotateReturn = 0;
            transform.eulerAngles = new Vector3(transform.eulerAngles.x, transform.eulerAngles.y, Mathf.LerpAngle(transform.eulerAngles.z, -horizontalDistanceRotate, rotateLeft));
	    } 
        else 
        {
		    rotateRight = 0;
		    rotateLeft = 0;
		    rotateReturn += Time.deltaTime * horizontalSpeedOfRotation;
		    transform.eulerAngles = new Vector3(transform.eulerAngles.x, transform.eulerAngles.y, Mathf.LerpAngle(transform.eulerAngles.z, 0, rotateReturn));
	    }
    }
}
