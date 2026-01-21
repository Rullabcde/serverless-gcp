const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const os = require("os");

app.get("/", (req, res) => {
  const serverInfo = {
    platform: os.platform(),
    release: os.release(),
    host: os.hostname(),
    time: new Date().toISOString(),
  };

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GCP DevSecOps Demo</title>
        <style>
            body {
                background-color: #0d1117;
                color: #c9d1d9;
                font-family: 'Courier New', Courier, monospace;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
            }
            .container {
                border: 1px solid #30363d;
                padding: 2rem;
                border-radius: 8px;
                background-color: #161b22;
                box-shadow: 0 4px 20px rgba(0,0,0,0.5);
                max-width: 600px;
                width: 90%;
            }
            h1 { color: #58a6ff; border-bottom: 1px solid #30363d; padding-bottom: 10px; }
            .badge {
                display: inline-block;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 0.8rem;
                font-weight: bold;
                margin-right: 5px;
            }
            .badge-green { background-color: #238636; color: white; }
            .badge-blue { background-color: #1f6feb; color: white; }
            .log-box {
                background-color: #0d1117;
                border: 1px solid #30363d;
                padding: 15px;
                border-radius: 6px;
                margin-top: 20px;
                font-size: 0.9rem;
            }
            .log-line { margin: 5px 0; }
            .key { color: #79c0ff; }
            .value { color: #a5d6ff; }
            .blink { animation: blinker 1s linear infinite; }
            @keyframes blinker { 50% { opacity: 0; } }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>DevSecOps Pipeline Status #1</h1>
            <div>
                <span class="badge badge-green">BUILD PASS</span>
                <span class="badge badge-green">SECURE</span>
                <span class="badge badge-blue">CLOUD RUN</span>
            </div>
            
            <p>Deployment has been successfully automated via Google Cloud Build.</p>

            <div class="log-box">
                <div class="log-line"> root@gcp-cloud-run:~# ./check-status.sh</div>
                <div class="log-line"> > Verifying container integrity... <span style="color:#3fb950">OK</span></div>
                <div class="log-line"> > Checking vulnerability scan... <span style="color:#3fb950">PASSED (Trivy)</span></div>
                <br>
                <div class="log-line"> --- SYSTEM INFORMATION --- </div>
                <div class="log-line"> <span class="key">Time:</span> <span class="value">${serverInfo.time}</span></div>
                <div class="log-line"> <span class="key">Container ID:</span> <span class="value">${serverInfo.host}</span></div>
                <div class="log-line"> <span class="key">OS Platform:</span> <span class="value">${serverInfo.platform} (${serverInfo.release})</span></div>
                <br>
                <div class="log-line"> <span class="blink">_</span></div>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
