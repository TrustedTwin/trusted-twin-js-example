export async function handleResponseError(
  e: any,
  setLoading: (value: boolean) => void
) {
  const message = e?.message;
  const body = await e?.response?.json?.();
  alert(`${message}:\n${JSON.stringify(body)}`);
  setLoading(false);
}
