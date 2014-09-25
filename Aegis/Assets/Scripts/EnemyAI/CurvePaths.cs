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

    float speed;

    Transform parentPath;
    Transform[] pathPoints;
    public GameObject objectContainsSpeed;
    public Component componentContainsSpeed;
    public bool rotateToPath = false;
    public float t = 0f;
    private Quaternion q;
    bool waitingForParentPathAssignment = false;

    //ping pong
    public bool pingpong = false;
    bool returning = false;
    Transform[] backwardsPathPoints;

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
	    if (parentPath != null){
		    AssignParentPath();
	    }

        if (pingpong)
        {
            backwardsPathPoints = GenerateBackwardsPath(pathPoints);
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
		    pathPoints = new Transform[parentPath.childCount];
		    for (int i = 0; i < parentPath.childCount; i++)
            {
                pathPoints[i] = parentPath.GetChild(i);
               // Debug.Log(pathPoints[i].position);
                pathPoints[i].position = new Vector3(transform.position.x - parentPath.GetChild(i).position.x, parentPath.GetChild(i).position.y, parentPath.GetChild(i).position.z);
               // Debug.Log(pathPoints[i].position);
		    }
		    waitingForParentPathAssignment = false;
    }

    Transform[] GenerateBackwardsPath (Transform[] incoming)
     {
         Transform[] backwardsPath = new Transform[incoming.Length];
         for (int i = 0; i < incoming.Length; i++ )
         {
             backwardsPath[i] = incoming[incoming.Length - 1 - i];
         }

         return backwardsPath;
     }
}
