
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        APP_NAME = 'devops-pipeline'
        DOCKER_IMAGE = 'devops-pipeline'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checkout stage'
                checkout scm
            }
        }

        stage('Verify Tools') {
            steps {
                bat 'git --version'
                bat 'node --version'
                bat 'npm --version'
                bat '"C:\\Users\\Admin\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Automated Tests') {
            steps {
                bat 'npm test -- --runInBand'
            }
        }

        stage('Dependency Audit') {
            steps {
                bat 'npm audit --omit=dev'
            }
        }

        stage('Docker Build') {
            steps {
                bat '"C:\\Users\\Admin\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" build -t %DOCKER_IMAGE%:%BUILD_NUMBER% .'
            }
        }

        stage('Trivy Security Scan') {
    steps {
        bat '"C:\\Users\\Admin\\AppData\\Local\\Microsoft\\WinGet\\Links\\trivy.exe" image --exit-code 1 --severity CRITICAL %DOCKER_IMAGE%:%BUILD_NUMBER%'
    }
}
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
