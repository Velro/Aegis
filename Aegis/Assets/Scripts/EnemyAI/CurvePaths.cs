using UnityEngine;
using System.Collections;

public class CurvePaths : MonoBehaviour 
{
    public enum PathingTypes
    {
        zigzagTop,
        zigzagBottom,
        archTop,
        archBottom,
        left,
        up,
        spiral,
        count
    }
    public PathingTypes pathingType = PathingTypes.zigzagTop;
    public Transform[] pathReferences = new Transform[(int)PathingTypes.count];

    public bool recievingPathElsewhere;
    public GameObject[] sharePathWith;

    float speed;

    Transform parentPath;

    [HideInInspector]
    public Vector3[] pathPoints;
    public GameObject objectContainsSpeed;
    public bool rotateToPath = false;
    public float t = 0f;
    private Quaternion q;
    bool waitingForParentPathAssignment = false;

    //ping pong
    public bool pingpong = false;
    bool returning = false;
    Vector3[] backwardsPathPoints;

    void Awake ()
    {

        GameObject g;
        if (objectContainsSpeed != null)
        {
            g = objectContainsSpeed;
        }
        else
        {
            g = gameObject;
        }

        float componentSpeed = 0;
        if (g.GetComponent<CorsairAI>() != null) componentSpeed = g.GetComponent<CorsairAI>().Speed;
        if (g.GetComponent<ViperAI>() != null) componentSpeed = g.GetComponent<ViperAI>().Speed;
        if (g.GetComponent<RammerAI>() != null) componentSpeed = g.GetComponent<RammerAI>().Speed;
        if (g.GetComponent<DreadnaughtAI>() != null) componentSpeed = g.GetComponent<DreadnaughtAI>().Speed;
        if (g.GetComponent<SpaceWormMasterAI>() != null) componentSpeed = g.GetComponent<SpaceWormMasterAI>().Speed;
        speed = componentSpeed;
        if (speed == 0)
        {
            print(gameObject.name + " could not find a speed!");
        }
        parentPath = pathReferences[(int)pathingType];
    }

    void Start () 
    {
        if (!recievingPathElsewhere)
        {
	        if (parentPath != null){
		        AssignParentPath();
	        }

            if (pingpong)
            {
                backwardsPathPoints = GenerateBackwardsPath(pathPoints);
            }
        }
        if (sharePathWith != null)
        {
            foreach (GameObject g in sharePathWith)
            {
                if (g.GetComponent<CurvePaths>() != null)
                    g.GetComponent<CurvePaths>().pathPoints = pathPoints;
            }
        }
    }

    void Update () 
    {
        if (transform == null || parentPath == null)
            return;

	    if (!waitingForParentPathAssignment && !pingpong)
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
	    }
        else if (!waitingForParentPathAssignment && pingpong) 
        {
            if (t == 1)
            {
                returning = !returning;
                t = 0;
            }                
            if (returning)
            {
                transform.position = Spline.MoveOnPath(backwardsPathPoints, transform.position, ref t, speed);
            }
            else
            {
                transform.position = Spline.MoveOnPath(pathPoints, transform.position, ref t, speed);
            }
        }
        else if (waitingForParentPathAssignment && parentPath != null)
        {
            AssignParentPath();
        }
    }

     void AssignParentPath ()
     {
		    pathPoints = new Vector3[parentPath.childCount];
		    for (int i = 0; i < parentPath.childCount; i++)
            {
                pathPoints[i] = new Vector3(transform.position.x + parentPath.GetChild(i).position.x, 0, transform.position.z + parentPath.GetChild(i).position.z);
                Debug.Log(pathPoints[i]);
		    }
		    waitingForParentPathAssignment = false;
    }

    Vector3[] GenerateBackwardsPath (Vector3[] incoming)
     {
         Vector3[] backwardsPath = new Vector3[incoming.Length];
         for (int i = 0; i < incoming.Length; i++ )
         {
             backwardsPath[i] = incoming[incoming.Length - 1 - i];
         }

         return backwardsPath;
     }
}
