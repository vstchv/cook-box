import { Message } from "@/components/form-message";
import { SearchParams } from "@/types/search-params";
import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function parseMessage(params?: SearchParams): Message | undefined {
  if (!params) return undefined;

  if (typeof params.success === "string") {
    return { success: params.success };
  }

  if (typeof params.error === "string") {
    return { error: params.error };
  }

  if (typeof params.message === "string") {
    return { message: params.message };
  }

  return undefined;
}
