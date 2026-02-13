import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center p-4">
      <h1 className="text-9xl font-display font-bold text-primary/10 select-none">404</h1>
      <h2 className="text-3xl font-display font-bold -mt-12 mb-4 bg-background px-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        We couldn't find the page you were looking for. It might have been removed or the link might be broken.
      </p>
      <Link to="/">
        <Button size="lg" className="rounded-full px-8">Return to Home</Button>
      </Link>
    </div>
  );
}
