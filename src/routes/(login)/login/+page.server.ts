import { auth } from '$lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


/** @type {import('./$types').Actions} */
export const actions = {
    login: async ({request}) => {
        const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
        if (email != null && password != null) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                
            })
            .catch(() => {
            });
        }
    },
    logout: async ({request}) => {
        const data = await request.formData();
		const email = data.get('email') as string;
		const password = data.get('password') as string;
        if (email != null && password != null) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                
            })
            .catch(() => {
            });
        }
    }
};