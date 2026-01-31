import { execSync } from "child_process";

execSync("clasp push -f", { stdio: "inherit" });
// execSync("clasp run __init", { stdio: "inherit" });
