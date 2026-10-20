
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        APP_NAME = 'devops-pipeline'
        DOCKER_IMAGE = 'devops-pipeline'
        DOCKERHUB_USER = 'shahnawaz241428'
        DOCKER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
        TRIVY_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Microsoft\\WinGet\\Links\\trivy.exe'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Tools') {
            steps {
                bat 'git --version'
                bat 'node --version'
                bat 'npm --version'
                bat '"%DOCKER_EXE%" --version'
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
                bat '"%DOCKER_EXE%" build -t %DOCKER_IMAGE%:%BUILD_NUMBER% .'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                bat '"%TRIVY_EXE%" image --exit-code 1 --severity CRITICAL %DOCKER_IMAGE%:%BUILD_NUMBER%'
            }
        }

        stage('Docker Hub Login and Push') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DH_USER',
                    passwordVariable: 'DH_TOKEN'
                )]) {
                  bat '''
    powershell -NoProfile -NonInteractive -ExecutionPolicy Bypass -Command "$env:DH_TOKEN | & $env:DOCKER_EXE login -u $env:DH_USER --password-stdin"
    if errorlevel 1 exit /b 1
'''
                    bat '''
                        "%DOCKER_EXE%" tag %DOCKER_IMAGE%:%BUILD_NUMBER% %DOCKERHUB_USER%/%DOCKER_IMAGE%:%BUILD_NUMBER%
                        "%DOCKER_EXE%" tag %DOCKER_IMAGE%:%BUILD_NUMBER% %DOCKERHUB_USER%/%DOCKER_IMAGE%:latest
                        "%DOCKER_EXE%" push %DOCKERHUB_USER%/%DOCKER_IMAGE%:%BUILD_NUMBER%
                        "%DOCKER_EXE%" push %DOCKERHUB_USER%/%DOCKER_IMAGE%:latest
                    '''
                }
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
