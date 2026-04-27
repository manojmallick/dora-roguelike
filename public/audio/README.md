# Audio Assets

Generated ElevenLabs files live in this directory and are served by Vite from `/audio/<file>.mp3`.

Run the local generator from the repo root:

```bash
npm run generate:audio -- --kind=all
```

Useful safer variants:

```bash
npm run generate:audio -- --dry-run
npm run generate:audio -- --kind=tts
npm run generate:audio -- --kind=sfx
npm run generate:audio -- --kind=music
```

By default, existing files are skipped. Add `--force` to regenerate them.
