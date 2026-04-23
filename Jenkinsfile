pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        IMAGE_NAME     = "jorgenotader/exercise4:latest"
        CONTAINER_NAME = "exercise4"
        HOST_PORT      = "80"
        CONTAINER_PORT = "80"
    }

    options {
        timestamps()
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/jorgenotader/exercise4.git', branch: 'main'
            }
        }

        stage('Verify Project Files') {
            steps {
                sh '''
                    set -e
                    echo "Checking required project files..."

                    test -f Dockerfile
                    test -f nginx.conf
                    test -f index.html
                    test -f sgustyle.css
                    test -f sguscript.js

                    echo "Required files found."
                    ls -la
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    set -e
                    docker build --pull -t "$IMAGE_NAME" .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                    set +e
                    docker stop "$CONTAINER_NAME" || true
                    docker rm -f "$CONTAINER_NAME" || true
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    set -e
                    docker run -d \
                      --name "$CONTAINER_NAME" \
                      --restart unless-stopped \
                      -p "$HOST_PORT:$CONTAINER_PORT" \
                      "$IMAGE_NAME"
                '''
            }
        }

        stage('Test Website Locally') {
            steps {
                sh '''
                    set -e
                    sleep 5
                    curl -I http://localhost:$HOST_PORT/
                '''
            }
        }

        stage('Show Running Container') {
            steps {
                sh '''
                    docker ps
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful.'
            echo 'Open: http://54.85.64.57/'
        }
        failure {
            echo 'Deployment failed. Check the Jenkins console output.'
        }
    }
}
