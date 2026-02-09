Need to uncomment the line:

# signing_keys_path = "./signing_keys.json"

within config.toml when working with local Supabase CLI. DB reset will not work without those keys.

Add the comment back to that line before pushing changes as GitHub actions workflow will fail if those keys are referenced.