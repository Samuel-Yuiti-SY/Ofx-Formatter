const SIMPLE_TAGS = [
  "CODE",
  "SEVERITY",
  "DTSERVER",
  "LANGUAGE",
  "TRNUID",
  "CURDEF",
  "BANKID",
  "BRANCHID",
  "ACCTID",
  "ACCTTYPE",
  "DTSTART",
  "DTEND",
  "TRNTYPE",
  "DTPOSTED",
  "DTAVAIL",
  "TRNAMT",
  "FITID",
  "CHECKNUM",
  "NAME",
  "MEMO",
  "BALAMT",
  "DTASOF",
  "MKTGINFO"
] as const;

function closeSimpleTagsWithoutDuplication(text: string): string {
  return SIMPLE_TAGS.reduce((currentText, tag) => {
    const pattern = new RegExp(`<${tag}>([^<\\r\\n]+)(?=<(?!/${tag}>))`, "g");

    return currentText.replace(
      pattern,
      (_, value: string) => `<${tag}>${value.trim()}</${tag}>`
    );
  }, text);
}

function addTimezoneIfMissing(text: string, tag: string, timezone = "[-3:BRT]"): string {
  const pattern = new RegExp(`<${tag}>(\\d{14})(?!\\[)(</${tag}>)`, "g");

  return text.replace(pattern, (_, date: string, closingTag: string) => {
    return `<${tag}>${date}${timezone}${closingTag}`;
  });
}

export function formatOfxContent(input: string): string {
  const content = input.replace(/\uFEFF/g, "").trim();
  const ofxIndex = content.indexOf("<OFX>");

  if (ofxIndex === -1) {
    throw new Error("Arquivo inválido: tag <OFX> não encontrada.");
  }

  const header = content.slice(0, ofxIndex).trim();
  let body = content.slice(ofxIndex).trim();

  body = body.replace(/>\s+</g, "><");
  body = body.replace(/[ \t]+/g, " ");
  body = closeSimpleTagsWithoutDuplication(body);
  body = body.replace(/(\d{14})\.\d+/g, "$1");
  body = body.replace(/<DTSTART>(\d{8})\d*<\/DTSTART>/g, "<DTSTART>$1</DTSTART>");
  body = body.replace(/<DTEND>(\d{8})\d*<\/DTEND>/g, "<DTEND>$1</DTEND>");
  body = addTimezoneIfMissing(body, "DTPOSTED");
  body = addTimezoneIfMissing(body, "DTAVAIL");
  body = addTimezoneIfMissing(body, "DTASOF");
  body = body.replace(/></g, ">\n<");
  body = body.replace(/\n{2,}/g, "\n").trim();

  return header ? `${header}\n\n${body}` : body;
}
