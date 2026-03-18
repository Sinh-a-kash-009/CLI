import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import chalk from "chalk";
import { config } from "../../config/google.config.js";

export class AIService {
  constructor() {
    if (!config.googleApiKey) {
      throw new Error("Google API key is not configured");
    }

    // ✅ Correct initialization
    this.model = google({
      apiKey: config.googleApiKey,
    });
  }

  /**
   * Send message with streaming
   * @param {Array} messages
   * @param {Function} onChunk
   */
  async sendMessage(messages, onChunk) {
    try {
      const result = streamText({
        model: this.model,
        messages,
      });

      let fullResponse = "";

      // ✅ Read streaming chunks properly
      for await (const chunk of result.textStream) {
        fullResponse += chunk;

        if (onChunk) {
          onChunk(chunk);
        }
      }

      // ✅ Get final metadata
      const finalResult = await result;

      return {
        content: fullResponse,
        finishReason: finalResult.finishReason,
        usage: finalResult.usage,
      };
    } catch (error) {
      console.log(chalk.red("AI service error:"), error.message);
      throw error;
    }
  }

  /**
   * Non-streaming helper
   * @param {Array} messages
   * @returns {Promise<string>}
   */
  async getMessage(messages) {
    let fullResponse = "";

    await this.sendMessage(messages, (chunk) => {
      fullResponse += chunk;
    });

    return fullResponse;
  }
}