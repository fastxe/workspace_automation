# justfile
set dotenv-load
set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]

build:
    pnpm turbo run build

push:
    pnpm turbo run push
    pnpm turbo run init

typecheck:
    pnpm turbo run typecheck