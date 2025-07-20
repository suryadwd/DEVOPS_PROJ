pipeline {
  agent any

  environment {
    IMAGE_NAME = 'suryasuraj/devnotex-backend'
    DOCKERHUB_CREDENTIALS = 'dockerhub-cred'
  }

  stages {
    stage('Build Docker Image') {
      steps {
        echo '🛠️ Building Docker Image'
        sh '''
          docker build -t $IMAGE_NAME ./backend
        '''
      }
    }

    stage("Push to DockerHub") {
      steps {
        echo '🚀 Pushing image to Docker Hub'

        withCredentials([usernamePassword(
          credentialsId: "${DOCKERHUB_CREDENTIALS}",
          usernameVariable: 'dockerHubUser',
          passwordVariable: 'dockerHubPass'
        )]) {
          sh '''
            docker login -u $dockerHubUser -p $dockerHubPass
            docker push $IMAGE_NAME
          '''
        }
      }
    }
  }
}
