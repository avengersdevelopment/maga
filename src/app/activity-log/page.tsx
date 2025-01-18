import React from "react";
import Container from "./_components/container";
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();
  const { data: config } = await supabase.from("configs").select();

  return <Container config={config?.[0] || null} />;
}
