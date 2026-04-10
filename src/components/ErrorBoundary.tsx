import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught by boundary:", error);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-[#111118] border border-red-500/30 rounded-2xl p-8 max-w-md text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <h2 className="font-syne text-xl font-bold mb-2">Something went wrong</h2>
            <p className="text-sm text-[#7a7a90] mb-6">
              We encountered an error. Please refresh the page and try again.
            </p>
            {this.state.error && (
              <details className="text-xs text-left mb-4 p-3 bg-red-500/5 rounded border border-red-500/20">
                <summary className="cursor-pointer font-semibold text-red-400">
                  Error details
                </summary>
                <p className="mt-2 text-red-300 font-mono">{this.state.error.message}</p>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
