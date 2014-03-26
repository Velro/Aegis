using UnityEngine;
using System.Collections;

[AddComponentMenu("Editor/PathingLines")]
public class PathingLines : MonoBehaviour {

    public Color color = Color.red;

    void OnDrawGizmos (){
	    Gizmos.color = color;
	    for (int i = 0; i < transform.childCount - 1; i++){
		    Gizmos.DrawLine(transform.GetChild(i).position, transform.GetChild(i+1).position);
	    }
    }
}
