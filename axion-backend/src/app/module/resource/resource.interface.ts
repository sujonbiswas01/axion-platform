import z from "zod";
import { createResourceValidationSchema } from "./resource.validation";

export type TCreateResourcePayload = z.infer<typeof createResourceValidationSchema>;