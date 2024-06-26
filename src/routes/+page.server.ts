import type { PageServerLoad } from "./$types";
// superforms
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema, signupSchema } from "$lib/validation/auth-zod-schema";
import { redirect } from "@sveltejs/kit";

export const load = (async (event) => {
	const user = await event.locals.user;

	// Redirect unauthenticated users only for specific routes
	if (!user && event.url.pathname !== "/" && event.url.pathname !== "/") {
		return redirect(302, "/"); // Or a more appropriate route based on context
	}

	const loginForm = await superValidate(zod(loginSchema));
	const signupForm = await superValidate(zod(signupSchema));

	return { loginForm, signupForm, user };
}) satisfies PageServerLoad;
