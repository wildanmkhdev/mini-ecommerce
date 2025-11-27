import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "../../lib/prisma";
import { Lucia, Session, User } from "lucia";
import { RoleUser } from "@/generated/prisma";
import { cache } from "react";
import { cookies } from "next/headers";
const adapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},

	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			name: attributes.name,
			email: attributes.email,
			role: attributes.type,
		};
	},
});
export const getUser = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const cookieStore = await cookies(); // ✅ harus di-await
		const sessionId = cookieStore.get(lucia.sessionCookieName)?.value ?? null;

		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const result = await lucia.validateSession(sessionId);

		// Next.js melempar error kalau set cookie saat rendering page → makanya pakai try
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookieStore.set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				); // ✅ pakai cookieStore
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookieStore.set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes
				); // ✅ pakai cookieStore
			}
		} catch {}

		return result;
	}
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		UserId: number;
		DatabaseAttributes: {
			id: number;
			name: string;
			type: RoleUser;
		};
	}
}
