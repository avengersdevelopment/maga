import { createClient } from "@/utils/supabase/server";
import Container from "./_components/container";

export default async function Page() {
  const supabase = await createClient();
  const { data: configs } = await supabase.from("configs").select();

  return <Container config={configs?.[0] || null} />;
}
