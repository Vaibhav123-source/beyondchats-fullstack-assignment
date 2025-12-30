

export default function updateArticleWithMockLLM(
  originalContent,
  references
) {
  let rewritten = `### Updated Article\n\n`;

  rewritten += `This article is an improved version of the original content,
enhanced using insights from top-ranking articles on Google.\n\n`;

  rewritten += `---\n\n`;
  rewritten += originalContent.slice(0, 800);
  rewritten += `\n\n---\n\n`;

  rewritten += `### Key Improvements Based on Research\n\n`;

  references.forEach((ref, index) => {
    rewritten += `**Insight ${index + 1}:**\n`;
    rewritten += ref.content.slice(0, 400);
    rewritten += `\n\n`;
  });

  rewritten += `---\n\n`;
  rewritten += `### References\n`;

  references.forEach((ref, index) => {
    rewritten += `${index + 1}. ${ref.link}\n`;
  });

  return rewritten;
}




