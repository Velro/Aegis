using UnityEngine;
using System.Collections;

public class CurvePaths : MonoBehaviour 
{
    float speed;
    public Transform parentPath;
    Transform[] pathPoints;
    public GameObject objectContainsSpeed;
    public Component componentContainsSpeed;
    public bool rotateToPath = false;
    public float t = 0f;
    private Quaternion q;
    bool waitingForParentPathAssignment = false;    

    void Awake ()
    {
        GameObject g;
        if (componentContainsSpeed == null)
        {
            g = objectContainsSpeed;
            if (objectContainsSpeed == null)
                throw new System.NotImplementedException();
        }
        else
        {
            g = gameObject;
        }

        float componentSpeed = 0;
        if (g.GetComponent<CorsairAI>() != null)componentSpeed = g.GetComponent<CorsairAI>().Speed;
        if (g.GetComponent<RammerAI>() != null) componentSpeed = g.GetComponent<CorsairAI>().Speed;
        if (g.GetComponent<SpaceWormMaster>() != null) componentSpeed = g.GetComponent<SpaceWormMaster>().Speed;
        if (g.GetComponent<ArcNadeInstance>() != null) componentSpeed = g.GetComponent<ArcNadeInstance>().Speed;
        speed = componentSpeed;
        if (speed == 0)
            print(gameObject.name + " could not find a speed!");
    }

    void Start () 
    {
	    if (parentPath != null){
		    AssignParentPath();
	    }/*else {
		    waitingForParentPathAssignment = true;
	    }
	    if (gameObject.GetComponent(Stats) != null){
		    speed = gameObject.GetComponent(Stats).speed;
	    } else if (transform.parent != null){
		    speed = transform.parent.gameObject.GetComponent(Stats).speed;
	    } else {
		    Debug.Log("No Stats attached on "+gameObject.name+" or parent");
	    }
	    q = transform.rotation;*/
    }

    void Update () 
    {
        if (transform == null || parentPath == null)
            return;
	    if (!waitingForParentPathAssignment)
        {
		    if (!rotateToPath)
            {
                transform.position = Spline.MoveOnPath(pathPoints, transform.position, ref t,
                    speed);
                //Debug.Log(gameObject.name+": "+speed);
	        }
	        if (rotateToPath)
            {
	    	    transform.position = Spline.MoveOnPath(pathPoints, transform.position, ref t, ref q,
		    	    speed,100f,EasingType.Sine, true, true);
		        q.eulerAngles = new Vector3(q.eulerAngles.x + 90, q.eulerAngles.y, q.eulerAngles.z);
		        transform.rotation = q;
	        }
	    } else if (waitingForParentPathAssignment && parentPath != null)
        {
		    AssignParentPath();
	    }
    }

     void AssignParentPath ()
     {
		    pathPoints = new Transform[parentPath.childCount];
		    for (int i = 0; i < parentPath.childCount; i++)
            {
                pathPoints[i] = parentPath.GetChild(i);
               // Debug.Log(pathPoints[i].position);
                pathPoints[i].position = parentPath.GetChild(i).position;
               // Debug.Log(pathPoints[i].position);
		    }
		    waitingForParentPathAssignment = false;
    }
}
