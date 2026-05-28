import z from "zod";
import { videoValidationSchema } from "./video.validation";

export type TVideoValidationPayload = z.infer<typeof videoValidationSchema>;