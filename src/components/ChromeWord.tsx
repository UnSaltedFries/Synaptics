import React, { memo } from "react";

const ChromeWord = memo(({ children }: { children: React.ReactNode }) => (
  <span className="chrome-word">{children}</span>
));

ChromeWord.displayName = "ChromeWord";

export default ChromeWord;
