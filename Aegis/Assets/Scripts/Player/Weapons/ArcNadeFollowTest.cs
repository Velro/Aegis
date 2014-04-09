using UnityEngine;
using System.Collections;

public class ArcNadeFollowTest : MonoBehaviour 
{

    public float speed;
    Vector3 moveDirection;
    CharacterController controller;

    void Awake()
    {
        controller = GetComponent<CharacterController>();
    }

	// Use this for initialization
	void Start () 
    {
	
	}
	
	// Update is called once per frame
	void Update () 
    {
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
        moveDirection = new Vector3(horizontal, 0, vertical) * speed;
        controller.Move(moveDirection * Time.deltaTime);
	}
}
