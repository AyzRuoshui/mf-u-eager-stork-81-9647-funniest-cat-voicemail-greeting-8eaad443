import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

/**
 * 语音信箱问候语配置与门控约束
 */
const MAX_CHARACTERS = 120;

export const CAT_VOICEMAIL_GREETING =
  "You've reached the cat. I watched the phone ring, then pushed it off the desk. Leave a message; I'll scream at 4 a.m.";

/**
 * 校验问候语是否满足赛题单行、1-120 字符、无多余首尾空白的门控要求
 */
export function validateGreeting(text: string): {
  codePoints: number;
  utf16Length: number;
  bytes: number;
} {
  if (text.trim().length === 0) {
    throw new Error("Greeting must not be empty or whitespace-only.");
  }
  if (text !== text.trim()) {
    throw new Error("Greeting must not contain leading or trailing whitespace.");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Greeting must be a single line without line breaks.");
  }

  const codePoints = [...text].length;
  const utf16Length = text.length;
  if (
    codePoints < 1 ||
    codePoints > MAX_CHARACTERS ||
    utf16Length > MAX_CHARACTERS
  ) {
    throw new Error(
      `Greeting length (${codePoints} code points, ${utf16Length} UTF-16 units) exceeds 1..${MAX_CHARACTERS}.`,
    );
  }

  const bytes = Buffer.byteLength(text, "utf8");
  return { codePoints, utf16Length, bytes };
}

/**
 * 解析输出目录路径，优先使用非空 OUTPUT_DIR 环境变量，默认落盘到 /output
 */
export function resolveOutputDir(rawEnv = process.env.OUTPUT_DIR): string {
  const trimmed = rawEnv?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "/output";
}

/**
 * 将最终问候语确定性地写入输出目录的 entry.txt
 */
export function writeEntry(outputDir = resolveOutputDir()): {
  outputPath: string;
  codePoints: number;
  utf16Length: number;
  bytes: number;
} {
  const stats = validateGreeting(CAT_VOICEMAIL_GREETING);
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, CAT_VOICEMAIL_GREETING, { encoding: "utf8" });
  return { outputPath, ...stats };
}

const isMain =
  typeof process.argv[1] === "string" &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isMain) {
  const result = writeEntry();
  console.log(
    `Wrote ${result.outputPath} (${result.codePoints} chars, ${result.bytes} bytes)`,
  );
}
