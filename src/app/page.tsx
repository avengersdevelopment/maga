import { createClient } from "@/utils/supabase/server";
import Container from "./_components/container";

export default async function Page() {
  const supabase = await createClient();
  const { data: configs } = await supabase.from("configs").select();
  const { data: chats } = await supabase
    .from("chats")
    .select()
    .order("created_at", { ascending: false })
    .limit(20);

  const { count: totalChats } = await supabase
    .from("chats")
    .select("*", { count: "exact" });

  return (
    <Container
      config={configs?.[0] ?? null}
      chats={chats ?? []}
      totalChats={totalChats ?? 0}
    />
  );
}
