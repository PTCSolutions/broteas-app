import { updateUser } from '$lib/user';


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const firstName = data.get('firstName') as string;
        const lastName = data.get('lastName') as string;
        const uid = data.get('uid') as string;
        if (firstName != null && lastName != null) {
            await updateUser(firstName, lastName, uid);
        }
    },
}