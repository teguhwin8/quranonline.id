import { streamText, convertToModelMessages, createUIMessageStreamResponse } from 'ai';
import { model, systemPrompt } from '@/lib/ai';

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Convert UI messages (with parts) to model messages (with content)
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
        model: model,
        system: systemPrompt,
        messages: modelMessages,
    });

    // Return UI message stream format for @ai-sdk/react useChat hook
    return createUIMessageStreamResponse({
        stream: result.toUIMessageStream(),
    });
}
