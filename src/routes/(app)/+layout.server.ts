// Load in the uid of the current user from cookies
/** @type {import('./$types').LayoutServerLoad} */
export function load({cookies}) {
    // Get uid from cookies
    let uid = cookies.get('uid');
    // If its undefined, because it hasnt been set yet, then set it to the empty string
    // This matches the value we set to, when the user logs out
    if (uid == undefined) {
        uid = "";
    }
	return {
		uid : uid
	};
}