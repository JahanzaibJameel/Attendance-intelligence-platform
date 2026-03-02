# For Windows PowerShell, run these commands:

# Remove React imports from files that don't need them
Get-ChildItem -Path src -Recurse -Filter *.tsx | ForEach-Object {
  $content = Get-Content $_.FullName
  # Remove unused React imports
  $content = $content -replace "import React from 'react';[\r\n]+", ""
  $content = $content -replace "import React, \{.*?\} from 'react';", "import { useState } from 'react';"
  Set-Content $_.FullName $content
}