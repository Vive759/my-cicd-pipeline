pipeline {
    agent any

    environment {
        APP_NAME       = "cicd-app"
        CONTAINER_NAME = "cicd-app-container"
        APP_PORT       = "8090"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Verify Tools') {
            steps {
                sh 'docker --version'
                sh 'ansible --version'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Stamp build info into the app so the page shows what deployed it
                sh 'sh scripts/stamp-version.sh'
                sh 'docker build -t ${APP_NAME}:latest .'
            }
        }

        stage('Deploy with Ansible') {
            steps {
                sh 'ansible-playbook ansible/deploy.yml -i ansible/inventory.ini'
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'docker ps | grep ${CONTAINER_NAME}'
                sh 'curl -sf -o /dev/null -w "HTTP %{http_code}\\n" http://localhost:${APP_PORT}'
            }
        }
    }

    post {
        success { echo "Live at http://localhost:${APP_PORT}" }
        failure { echo 'Pipeline failed - check the logs above' }
    }
}
