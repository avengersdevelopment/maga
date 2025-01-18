"use client";

import { getModelId } from "@/app/chatbot/_components/action";
import { Chat } from "@/app/chatbot/_components/chat-section";
import { generateUUID } from "@/utils/string";
import { useEffect, useState } from "react";

export default function Container() {
  const id = generateUUID();

  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  useEffect(() => {
    const fetchModelId = async () => {
      const modelId = await getModelId();
      setSelectedModelId(modelId);
    };
    fetchModelId();
  }, []);

  if (!selectedModelId) {
    return <></>;
  }

  return (
    <main className="w-full h-screen">
      <div className="grid grid-cols-2">
        <div className="col-span-1 bg-red-500 h-screen text-center content-center">
          LEFT CONTENT
        </div>

        <div className="col-span-1 bg-blue-500 h-screen text-center content-center">
          <Chat
            key={id}
            id={id}
            initialMessages={[]}
            selectedModelId={selectedModelId}
          />
        </div>
      </div>
    </main>
  );
}
