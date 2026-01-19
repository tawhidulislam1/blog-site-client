import { authClient } from "@/lib/auth-client";

export default async function Home() {
  const session = await authClient.getSession();
  console.log(session);
  return <h2>Hellow word</h2>;
}
