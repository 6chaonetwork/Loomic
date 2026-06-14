import OpenAI from "openai";

import type {
  GeneratedImage,
  ImageGenerateParams,
  ImageProvider,
  ModelInfo,
} from "../types.js";
import { aspectRatioToDimensions, GenerationError } from "../utils.js";

const ICON_OPENAI =
  "https://avatars.githubusercontent.com/u/14957082?s=200&v=4";

const OPENAI_IMAGE_MODELS: readonly ModelInfo[] = [
  {
    id: "openai/gpt-image-2",
    displayName: "GPT Image 2",
    description:
      "OpenAI-compatible image generation model for high-quality image creation.",
    iconUrl: ICON_OPENAI,
  },
];

const MODEL_MAP: Record<string, string> = {
  "openai/gpt-image-2": "gpt-image-2",
};

export class OpenAIImageProvider implements ImageProvider {
  readonly name = "openai";
  readonly models = OPENAI_IMAGE_MODELS;
  private client: OpenAI;

  constructor(apiKey: string, baseURL?: string) {
    this.client = new OpenAI({ apiKey, ...(baseURL ? { baseURL } : {}) });
  }

  async generate(params: ImageGenerateParams): Promise<GeneratedImage> {
    const { width, height } = aspectRatioToDimensions(params.aspectRatio ?? "1:1");
    const size = `${width}x${height}`;
    const model = MODEL_MAP[params.model] ?? params.model;

    try {
      const response = await this.client.images.generate({
        model,
        prompt: params.prompt,
        size: size as "1024x1024",
        n: 1,
      });

      const image = response.data?.[0];
      const url = image?.url;
      const b64Json = image?.b64_json;

      console.info("[image-gen:openai] Image generation response received", {
        model,
        size,
        promptLength: params.prompt.length,
        outputType: url ? "url" : b64Json ? "b64_json" : "none",
      });

      if (url) {
        return { url, mimeType: "image/png", width, height };
      }

      if (b64Json) {
        // GPT image models return base64 by default; keep the provider contract as URL-like data URI
        // so the existing persistence pipeline can upload the generated asset.
        // TODO(image-gen): expose output_format once users can choose png/webp/jpeg per provider.
        return {
          url: `data:image/png;base64,${b64Json}`,
          mimeType: "image/png",
          width,
          height,
        };
      }

      throw new GenerationError(
        "openai",
        "no_output",
        "OpenAI returned no image URL or base64 image data",
      );
    } catch (error) {
      if (error instanceof GenerationError) throw error;
      throw new GenerationError(
        "openai",
        "api_error",
        error instanceof Error ? error.message : "Unknown OpenAI error",
      );
    }
  }
}
