import withErrorBoundary from "./withErrorBoundary";
import ErrorPage from "./errorPage";

export const ErrorBoundary = withErrorBoundary(() => null);
export const TopLevelErrorBoundary = withErrorBoundary(ErrorPage);
