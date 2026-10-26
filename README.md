# CI/CD Pipeline: Jenkins + Docker + Ansible

GitHub push → webhook → Jenkins → Docker build → Ansible deploy → app live on :8090

## Run the app locally (no Jenkins)
    docker build -t cicd-app:latest .
    docker run -d --name cicd-app-container -p 8090:80 cicd-app:latest

## Set up Jenkins (Ubuntu)
1. Install: `sudo apt install -y openjdk-17-jdk docker.io ansible curl`
   then install Jenkins from https://www.jenkins.io/doc/book/installing/linux/
2. Let Jenkins use Docker: `sudo usermod -aG docker jenkins && sudo systemctl restart jenkins`
3. Jenkins UI → New Item → Pipeline → "Pipeline script from SCM" → Git → your repo URL, branch `main`, path `Jenkinsfile`.
4. Run **Build Now**, then open http://localhost:8090

## Auto-trigger on push
- Jenkins job → Build Triggers → tick "GitHub hook trigger for GITScm polling".
- GitHub repo → Settings → Webhooks → Payload URL `http://<jenkins-host>:8080/github-webhook/` (content type `application/json`).
- Jenkins on your laptop? Expose it with `ngrok http 8080` and use that URL.
