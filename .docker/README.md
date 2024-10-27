# Symfony CMS

## Start in VSCode and Docker Compose

Create copy of `.env.local` file from `.envv.local.dist` and fill it up.

Add configurations and launch.

`launch.json`

```
{
    "name": "Launch Chrome",
    "request": "launch",
    "type": "chrome",
    "url": "http://localhost:9080",
    "webRoot": "${workspaceFolder}",
    "preLaunchTask": "dev:run",
    "runtimeArgs": [
        "--remote-debugging-port=9222",
        "--disable-web-security",
        "--ignore-certificate-errors",
        "--ignore-urlfetcher-cert-requests",
        "--auto-open-devtools-for-tabs ",
    ],
    "env": {
        "NODE_ENV": "production"
    }
}
```

`tasks.josn`

```
"tasks": [
    {
        "label": "dev:run",
        "type": "shell",
        "command": "bash start.sh",
        "isBackground": true,
        "options": {
            "env": {
                "NODE_ENV": "development"
            }
        },
        "problemMatcher": [
            {
                "pattern": [
                    {
                        "regexp": ".",
                        "file": 1,
                        "location": 2,
                        "message": 3
                    }
                ],
                "background": {
                    "activeOnStart": true,
                    "beginsPattern": ".",
                    "endsPattern": "."
                }
            }
        ]
    }
]
```
