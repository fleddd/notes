import * as z from "zod";

export const schema = z
	.object({
		email: z.string(),
		password: z
			.string()
			.min(5, { message: "Password must be at least 5 characters" }),
		username: z
			.string()
			.min(3, { message: "Username must be at least 3 characters" })
			.max(15, { message: "Username must be at most 15 characters" }),
	})
	.required()
	.partial({ email: true });

export const newNoteSchema = z
	.object({
		title: z
			.string()
			.min(3, { message: "Title must be at least 5 characters" }),
		description: z.string(),
		tag: z
			.string()
			.refine(
				(x: string) =>
					x.toLowerCase() == "home" ||
					x.toLowerCase() == "personal" ||
					x.toLowerCase() == "business",
				"Tag must be either Home or Personal or Business",
			),
	})
	.required()
	.partial({
		description: true,
	});
