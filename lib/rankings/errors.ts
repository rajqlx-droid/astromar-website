/** An error whose message is safe to show in the admin UI (never contains keys or URLs with keys). */
export class RankError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "RankError";
    this.status = status;
  }
}

/** Message and status for a response. Unknown errors are not echoed back. */
export function describeError(err: unknown): { status: number; message: string } {
  if (err instanceof RankError) return { status: err.status, message: err.message };
  return { status: 500, message: "Unexpected error. Check the server log." };
}
