pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = 'dockerhub-creds'  // Make sure this is created in Jenkins
    IMAGE_NAME = 'suryasuraj/devnotex-backend'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/suryadwd/DEVOPS_PROJ.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh '''
          docker system prune -af || true
          docker build -t $IMAGE_NAME ./backend
        '''
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: "$DOCKERHUB_CREDENTIALS", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_NAME
          '''
        }
      }
    }
  }
}
