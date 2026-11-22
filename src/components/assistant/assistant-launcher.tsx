import { Link, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { AtlasMark } from "./atlas-mark";
export function AssistantLauncher() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  if (pathname.startsWith("/assistant")) return null;
  return <Button asChild variant="outline" className="fixed bottom-5 right-4 z-40 h-12 gap-2 border-academic/20 bg-background px-3 shadow-lg sm:right-6"><Link to="/assistant" aria-label="Chat with Atlas AI"><AtlasMark className="size-7" /><span className="font-semibold">Ask Atlas</span></Link></Button>;
}
