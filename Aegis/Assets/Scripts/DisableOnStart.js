#pragma strict
/*
* attach this to objects that will have a delayed activation. We do this instead of disabling them in the editor so that we can still see them
* while editing the Scene. It'd be a pain in the ass to active/deactive them all the time.
*/
function Start () {
	gameObject.SetActive(false);
}
