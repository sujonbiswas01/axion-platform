import z from "zod";
import { UpdateValidationSchema, videoValidationSchema } from "./video.validation";

export type TVideoValidationPayload = z.infer<typeof videoValidationSchema>;

export type TUpdateValidationSchema = z.infer<typeof UpdateValidationSchema>;