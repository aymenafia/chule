import { NextRequest, NextResponse } from "next/server";

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

import saveQuizz from "@/api/quizz/generate/saveToDb";
export const maxDuration = 60; // 5 seconds
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    if (
      !Array.isArray(body) ||
      !body.every((item) => typeof item === "string")
    ) {
      return NextResponse.json(
        { error: "Invalid input, expected an array of strings" },
        { status: 400 }
      );
    }
    const texts = body;

    const selectedDocuments = texts.filter(
      (text) => text !== undefined && text.trim() !== ""
    );
    const prompt =
      "given the text which is a summary of the document, generate a quiz based on the text. Return json only that contains a quizz object with fields: name, description and questions. The questions is an array of objects with fields: questionText, answers. The answers is an array of objects with fields: answerText, isCorrect.";

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not provided" },
        { status: 500 }
      );
    }

    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4-1106-preview",
      timeout: maxDuration * 1000, // 60 seconds timeout
    });

    const parser = new JsonOutputFunctionsParser();
    const extractionFunctionSchema = {
      name: "extractor",
      description: "Extracts fields from the output",
      parameters: {
        type: "object",
        properties: {
          quizz: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    questionText: { type: "string" },
                    answers: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          answerText: { type: "string" },
                          isCorrect: { type: "boolean" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const runnable = model
      .bind({
        functions: [extractionFunctionSchema],
        function_call: { name: "extractor" },
      })
      .pipe(parser);

    const message = new HumanMessage({
      content: [
        {
          type: "text",
          text: prompt + "\n" + texts.join("\n"),
        },
      ],
    });

    const result: any = await runnable.invoke([message]);
    console.log(result);

    const { quizzId } = await saveQuizz(result.quizz);

    return NextResponse.json({ quizzId }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
