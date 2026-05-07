import { Component, type ErrorInfo, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return <ErrorPage onRetry={() => this.setState({ hasError: false })} />;
  }
}

interface ErrorPageProps {
  onRetry?: () => void;
}

export function ErrorPage({ onRetry }: ErrorPageProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-center text-slate-100">
      <div className="max-w-md">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-lg bg-red-500/15 text-red-300">
          !
        </div>
        <h1 className="mt-6 font-heading text-3xl font-bold text-white">Something went wrong</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          The app hit an unexpected error. You can retry without leaving the page.
        </p>
        <button
          type="button"
          onClick={onRetry ?? (() => window.location.reload())}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-teal-400 px-5 text-sm font-bold text-white shadow-glow transition hover:opacity-90"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Retry
        </button>
      </div>
    </main>
  );
}
