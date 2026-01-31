import { execSync } from "child_process";

execSync("clasp version \"prod\"", { stdio: "inherit" });
