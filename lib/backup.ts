export function downloadBackup(content: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "estuda-backup.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
